/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const BASE_URL = "/api/notes";

export default {
  createNote: async (note) => {
    const response = await axios.post(`${BASE_URL}/create/`, {
      note,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  updateNote: async (note) => {
    const { id } = note;
    const response = await axios.put(`${BASE_URL}/${id}/update/`, {
      note,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  deleteNote: async (note) => {
    const { id } = note;
    const response = await axios.delete(`${BASE_URL}/${id}/delete/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};
