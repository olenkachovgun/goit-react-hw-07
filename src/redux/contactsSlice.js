import { createSlice } from "@reduxjs/toolkit";
import {
  addContact,
  deleteContact,
  fetchContacts,
  editContact,
  updateLikeStatus,
} from "./contactsOps";
import toast from "react-hot-toast";
// Початковий стан редюсера слайсу:
const initialState = {
  items: [
    // { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    // { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    // { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    // { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ],
  isLoading: false,
  isError: false,
};

const slice = createSlice({
  name: "contacts",
  initialState,
  // reducers: {
  //   // deleteContact: (state, action) => {
  //   //   state.items = state.items.filter((item) => item.id !== action.payload);
  //   // },
  //   // addContact: (state, action) => {
  //   //   state.items.push(action.payload);
  //   // },
  //   // editContact: (state, action) => {
  //   //   const item = state.items.find((item) => item.id === action.payload.id);
  //   //   item.name = action.payload.name;
  //   //   item.number = action.payload.number;
  //   // },
  //   // generateContacts: () => {
  //   //   return initialState;
  //   // },
  //   // like: (state, action) => {
  //   //   const item = state.items.find((item) => item.id === action.payload.id);
  //   //   item.liked = !item.liked;
  //   // },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchContacts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editContact.fulfilled, (state, action) => {
        const item = state.items.find((item) => item.id === action.payload.id);
        item.name = action.payload.name;
        item.number = action.payload.number;
        item.like = action.payload.like;
      })
      .addCase(updateLikeStatus.fulfilled, (state, action) => {
        const item = state.items.find((item) => item.id === action.payload.id);
        item.like = !item.like;
      });
  },
});

export const contactsReducer = slice.reducer;
// export const { generateContacts, like } = slice.actions;
