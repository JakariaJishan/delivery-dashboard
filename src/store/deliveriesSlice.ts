import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DeliveryStatus = "Pending" | "In Transit" | "Delivered" | "Not Delivered";

export interface Delivery {
  id: number;
  date: string;
  recipient: string;
  address: string;
  status: DeliveryStatus;
}

interface DeliveriesState {
  deliveries: Delivery[];
}

const initialState: DeliveriesState = {
  deliveries: [],
};

const deliveriesSlice = createSlice({
  name: "deliveries",
  initialState,
  reducers: {
    setDeliveries(state, action: PayloadAction<Delivery[]>) {
      state.deliveries = action.payload;
    },
    addDelivery(state, action: PayloadAction<Delivery>) {
      state.deliveries.push(action.payload);
    },
    updateDelivery(state, action: PayloadAction<Delivery>) {
      const index = state.deliveries.findIndex((d) => d.id === action.payload.id);
      console.log(action.payload);
      
      if (index !== -1) {
        state.deliveries[index] = action.payload;
      }
    },
    deleteDelivery(state, action: PayloadAction<number>) {
      state.deliveries = state.deliveries.filter((d) => d.id !== action.payload);
    },
  },
});

export const { setDeliveries, addDelivery, updateDelivery, deleteDelivery } = deliveriesSlice.actions;

export default deliveriesSlice.reducer;