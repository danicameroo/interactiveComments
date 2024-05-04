import { createSlice } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //DELETE
    deleteMessagesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteMessagesSuccess: (state, action) => {
      state.isFetching = false;
      state.inmuebles.splice(
        state.inmuebles.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteMessagesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateMessagesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateMessagesSuccess: (state, action) => {
      state.isFetching = false;
      state.inmuebles[
        state.inmuebles.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.inmueble;
    },
    updateMessagesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addMessagesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addMessagesSuccess: (state, action) => {
      state.isFetching = false;
      state.inmuebles.push(action.payload);
    },
    addMessagesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  updateMessagesFailure,
  updateMessagesStart,
  updateMessagesSuccess,
  deleteMessagesFailure,
  deleteMessagesStart,
  deleteMessagesSuccess,
  addMessagesFailure,
  addMessagesStart,
  addMessagesSuccess

} = messagesSlice.actions;

export default messagesSlice.reducer;