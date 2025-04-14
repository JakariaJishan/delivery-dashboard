import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Delivery {
  id: number;
  date: string;
  recipient: string;
  address: string;
  status: 'Pending' | 'In Transit' | 'Delivered' | 'Not Delivered';
}

export const deliveriesApi = createApi({
  reducerPath: 'deliveriesApi', 
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),
  tagTypes: ['Delivery'],
  endpoints: (builder) => ({
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
    updateDelivery: builder.mutation<Delivery, Partial<Delivery> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `/deliveries/${id}`,
        method: "PUT",
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
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
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Delivery", id }],
    }),

    deleteDelivery: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/deliveries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Delivery", id }],
    }),
  }),
});

export const {
  useGetDeliveriesQuery,
  useCreateDeliveryMutation,
  useUpdateDeliveryMutation,
  useDeleteDeliveryMutation,
} = deliveriesApi;
