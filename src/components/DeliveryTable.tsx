import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

type DeliveryStatus = "Pending" | "In Transit" | "Delivered" | "Not Delivered";

// Define an interface for a Delivery
interface Delivery {
  id: number;
  date: string;
  recipient: string;
  address: string;
  status: DeliveryStatus;
}

interface DeliveryTableProps {
  deliveries: Delivery[];
  onEdit: (delivery: Delivery) => void;
  onDelete: (id: number) => void;
}

const DeliveryTable: React.FC<DeliveryTableProps> = ({
  deliveries,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 800 }} aria-label="deliveries table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Recipient</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deliveries.length > 0 ? (
            deliveries.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell>{delivery.id}</TableCell>
                <TableCell>{delivery.date}</TableCell>
                <TableCell>{delivery.recipient}</TableCell>
                <TableCell>{delivery.address}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color:
                        delivery.status === "Delivered"
                          ? "success.main"
                          : delivery.status === "Pending"
                          ? "warning.main"
                          : delivery.status === "In Transit"
                          ? "info.main"
                          : "error.main",
                    }}
                  >
                    {delivery.status}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => onEdit(delivery)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => onDelete(delivery.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography color="text.secondary">
                  No deliveries found.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeliveryTable;