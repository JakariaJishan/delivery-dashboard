import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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

interface DeliveryModalProps {
  open: boolean;
  isEditing: boolean;
  delivery: Delivery;
  statusOptions: DeliveryStatus[];
  onClose: () => void;
  onSave: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (date: any) => void;
}

const DeliveryModal: React.FC<DeliveryModalProps> = ({
  open,
  isEditing,
  delivery,
  statusOptions,
  onClose,
  onSave,
  onInputChange,
  onDateChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEditing ? "Edit Delivery" : "Add Delivery"}</DialogTitle>
      <DialogContent
        sx={{
          width: 400,
        }}
      >
        <Stack spacing={2}>
          <TextField
            fullWidth
            name="recipient"
            label="Recipient"
            value={delivery.recipient}
            onChange={onInputChange}
          />
          <TextField
            fullWidth
            name="address"
            label="Address"
            value={delivery.address}
            onChange={onInputChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={delivery.date ? dayjs(delivery.date) : null}
              onChange={onDateChange}
              slotProps={{
                textField: {
                  fullWidth: true, // Make the DatePicker full width
                  size: "small",
                },
              }}
            />
          </LocalizationProvider>
          {isEditing && (
            <TextField
              select
              fullWidth
              name="status"
              label="Status"
              value={delivery.status}
              onChange={onInputChange}
              SelectProps={{ native: true }}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained" color="primary">
          {isEditing ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeliveryModal;
