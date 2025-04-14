import { Search } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  InputAdornment,
  Pagination,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  useCreateDeliveryMutation,
  useDeleteDeliveryMutation,
  useGetDeliveriesQuery,
  useUpdateDeliveryMutation,
} from "../store/deliveryapi.tsx";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts"; // Adjust the path to your store file
import {
  addDelivery,
  setDeliveries,
  deleteDelivery as deleteDeliveryAction,
} from "../store/deliveriesSlice.ts";
import DeliveryTable from "./DeliveryTable";
import DeliveryModal from "./DeliveryModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import usePagination from "../hooks/usePagination";
import dayjs from "dayjs";

type DeliveryStatus = "Pending" | "In Transit" | "Delivered" | "Not Delivered";

// Define an interface for a Delivery
interface Delivery {
  id: number;
  date: string;
  recipient: string;
  address: string;
  status: DeliveryStatus;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#2C80FF",
    },
  },
});

const statusOptions: DeliveryStatus[] = [
  "Pending",
  "In Transit",
  "Delivered",
  "Not Delivered",
];

const Delivery: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentDelivery, setCurrentDelivery] = useState<Delivery>({
    id: 0,
    date: "",
    recipient: "",
    address: "",
    status: "Pending",
  });
  const [confirmDeleteModal, setConfirmDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, error, isLoading } = useGetDeliveriesQuery();

  const [deleteDelivery] = useDeleteDeliveryMutation();
  const [createDelivery] = useCreateDeliveryMutation();
  const [updateDelivery] = useUpdateDeliveryMutation();

  const dispatch = useDispatch();
  const deliveries = useSelector(
    (state: RootState) => state.deliveries.deliveries
  );

  useEffect(() => {
    if (data) {
      const sortedData = [...data].sort((a, b) => b.id - a.id);
      dispatch(setDeliveries(sortedData));
    }
  }, [dispatch, data]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const filteredDeliveries =
    deliveries?.filter((delivery: Delivery) => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      return (
        delivery.recipient.toLowerCase().includes(lowerSearchTerm) ||
        delivery.address.toLowerCase().includes(lowerSearchTerm)
      );
    }) || [];

  const rowsPerPage = 10;
  const {
    paginatedData: paginatedDeliveries,
    page,
    pageCount,
    setPage,
  } = usePagination({
    data: filteredDeliveries,
    rowsPerPage,
  });

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (error)
    return <Typography color="error">Error fetching deliveries.</Typography>;

  // Handle opening the modal for adding a new delivery
  const handleAddDelivery = () => {
    setIsEditing(false);
    setCurrentDelivery({
      id: Date.now(),
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      recipient: "",
      address: "",
      status: "Pending",
    });
    setOpenModal(true);
  };

  // Handle opening the modal for editing an existing delivery
  const handleEditDelivery = (delivery: Delivery) => {
    setIsEditing(true);
    setCurrentDelivery({ ...delivery });
    setOpenModal(true);
  };

  // Handle input changes in the modal
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentDelivery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date: any) => {
    if (date) {
      setCurrentDelivery((prevState) => ({
        ...prevState,
        date: date.format("YYYY-MM-DD"),
      }));
    }
  };

  const handleSaveDelivery = async () => {
    try {
      const selectedDate = currentDelivery.date;
      const today = dayjs(new Date()).format("YYYY-MM-DD");

      if (selectedDate < today) {
        alert("The delivery date cannot be in the past.");
        return;
      }

      if (isEditing) {
        await updateDelivery(currentDelivery).unwrap();
      } else {
        await createDelivery(currentDelivery).unwrap();
        dispatch(addDelivery(currentDelivery));
      }
      setOpenModal(false);
    } catch (err) {
      console.error("Failed to add delivery:", err);
    }
  };

  // Handle deleting a delivery
  const handleDeleteDelivery = (id: number) => {
    setConfirmDeleteModal(true);
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteDelivery(deleteId).unwrap();
      dispatch(deleteDeliveryAction(deleteId));
      setConfirmDeleteModal(false);
    } catch (err) {
      console.error("Failed to delete delivery:", err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", gap: "16rem", height: "100vh" }}>
        {/* Responsive Sidebar */}
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ position: "absolute", top: 16, left: 16 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile
              }}
              sx={{
                "& .MuiDrawer-paper": {
                  width: 240,
                },
              }}
            >
              <Sidebar />
            </Drawer>
          </>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              "& .MuiDrawer-paper": {
                width: 240,
                boxSizing: "border-box",
              },
            }}
            open
          >
            <Sidebar />
          </Drawer>
        )}

        {/* Main content */}
        <Box
          sx={{
            py: 3,
            flexGrow: 1,
            pt: 8,
            height: "100%",
            bgcolor: "#f5f5f5",
          }}
        >
          <Container maxWidth={false}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: "100%",
                border: "1px solid #e0e0e0",
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h5"
                  component="h1"
                  sx={{ fontWeight: "bold" }}
                >
                  Deliveries
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: "none" }}
                  onClick={handleAddDelivery}
                >
                  ADD DELIVERY
                </Button>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <TextField
                  placeholder="Search by recipient or address."
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ width: 250 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <DeliveryTable
                deliveries={paginatedDeliveries}
                onEdit={handleEditDelivery}
                onDelete={handleDeleteDelivery}
              />

              {pageCount > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Pagination
                    count={pageCount}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                  />
                </Box>
              )}
            </Paper>
          </Container>
        </Box>
      </Box>
      {/* Add/Edit Delivery Modal */}
      <DeliveryModal
        statusOptions={statusOptions}
        open={openModal}
        onClose={() => setOpenModal(false)}
        delivery={currentDelivery}
        isEditing={isEditing}
        onInputChange={handleInputChange}
        onDateChange={handleDateChange}
        onSave={handleSaveDelivery}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        open={confirmDeleteModal}
        onClose={() => setConfirmDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </ThemeProvider>
  );
};

export default Delivery;
