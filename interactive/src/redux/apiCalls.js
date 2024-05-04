import { publicRequest } from "../requestMethod";

import {
  updateMessagesFailure,
  updateMessagesStart,
  updateMessagesSuccess,
  deleteMessagesFailure,
  deleteMessagesStart,
  deleteMessagesSuccess,
  addMessagesFailure,
  addMessagesStart,
  addMessagesSuccess
} from "./messagesRedux";

export const deleteMessages = async (id, dispatch) => {
  dispatch(deleteMessagesStart());
  try {
    await publicRequest.delete(`/${id}`);
    dispatch(deleteMessagesSuccess(id));
  } catch (err) {
    dispatch(deleteMessagesFailure());
  }
};

export const updateMessages = async (id, messages, dispatch) => {
  dispatch(updateMessagesStart());
  try {
    const res = await publicRequest.put(`/${id}`, messages);
    console.log(res)
    dispatch(updateMessagesSuccess(res.data));
  } catch (err) {
    dispatch(updateMessagesFailure());
  }
};

export const addMessages = async (messages, dispatch) => {
  dispatch(addMessagesStart());
  try {
    const res = await publicRequest.post(`/`, messages);
    dispatch(addMessagesSuccess(res.data));
  } catch (err) {
    dispatch(addMessagesFailure());
  }
};