// deliveriesApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a Delivery interface
export interface Delivery {
  id: number;
  date: string;
  recipient: string;
  address: string;
  status: 'Pending' | 'In Transit' | 'Delivered' | 'Not Delivered';
}

// Create an API slice with endpoints for CRUD operations
export const deliveriesApi = createApi({
  reducerPath: 'deliveriesApi', // unique key to attach reducer
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001', // Adjust base URL as needed
  }),
  // Used for cache invalidation
  tagTypes: ['Delivery'],
  endpoints: (builder) => ({
    // GET /deliveries – Fetch all deliveries
    getDeliveries: builder.query<Delivery[], void>({
      query: () => '/deliveries',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Delivery' as const, id })),
              { type: 'Delivery', id: 'LIST' },
            ]
          : [{ type: 'Delivery', id: 'LIST' }],
    }),
    createDelivery: builder.mutation<Delivery, Partial<Delivery>>({
      query: (newDelivery) => ({
        url: "/deliveries",
        method: "POST",
        body: newDelivery,
      }),
      
      invalidatesTags: [{ type: "Delivery", id: "LIST" }],
    }),
    // PUT /deliveries/:id – Update a delivery
    updateDelivery: builder.mutation<Delivery, Partial<Delivery> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `/deliveries/${id}`,
        method: "PUT",
        body: patch,
      }),
      // Optimistic update: immediately update the cached delivery.
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        // Update the cached list of deliveries optimistically.
        const patchResult = dispatch(
          deliveriesApi.util.updateQueryData("getDeliveries", undefined, (draft: Delivery[]) => {
            const delivery = draft.find((item) => item.id === id);
            if (delivery) {
              Object.assign(delivery, patch);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          // If the request fails, undo the optimistic update.
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Delivery", id }],
    }),
    // DELETE /deliveries/:id – Delete a delivery
    deleteDelivery: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/deliveries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Delivery", id }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetDeliveriesQuery,
  useCreateDeliveryMutation,
  useUpdateDeliveryMutation,
  useDeleteDeliveryMutation,
} = deliveriesApi;
