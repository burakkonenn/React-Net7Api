import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

//Get all products action
export const getAllProduct = createAsyncThunk(
  "getProducts",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://localhost:7096/api/Product/getall"
      );
      const result = await response.json();
      return result;
    } catch (err) {
      return rejectWithValue("Opps found an error", err.response.data);
    }
  }
);
//get single user
export const getSingleProduct = createAsyncThunk(
  "getSingleProduct",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://localhost:7096/api/Product/${id}`,
      {
        method: "GET",
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//create action
export const createProduct = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://localhost:7096/api/Product/addasync",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    
    const result = await response.json();
    console.log(result);

    return result;
  }
);
//delete single user
export const deleteProduct = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://localhost:7096/api/Product/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);
//update user
export const updateProduct = createAsyncThunk(
  "updateUser",
  async ({ id, ProductName, ProductPrice, UnitStock }, { rejectWithValue }) => {

    try {
      const response = await fetch(
        `https://localhost:7096/api/Product/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ProductName, ProductPrice, UnitStock}),
        }
      );
      const result = await response.json();
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const gitProduct = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
    searchData: [],
  },
  reducers: {
    searchProduct: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: {
    [getAllProduct.pending]: (state) => {
      state.loading = true;
    },
    [getAllProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [getAllProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
      console.log(state);
    },
    [deleteProduct.pending]: (state) => {
      state.loading = false;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.products = state.products.filter((post) => post.id !== id);
      }
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getSingleProduct.pending]: (state) => {
      state.loading = true;
    },
    [getSingleProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.singleUser = [action.payload];
    },
    [getSingleProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateProduct.pending]: (state) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      console.log("updated user fulfilled", action.payload);
      state.loading = false;
      state.products = state.products.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { searchProduct } = gitProduct.actions;
export default gitProduct.reducer;