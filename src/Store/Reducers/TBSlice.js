import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CONFIG from "../../Config/index.js";
import Service from "../../Service/Service.jsx";

//LoginApi Api
export const LoginApi = createAsyncThunk(
  "LoginApi",
  async (userdata, thunkAPI) => {
    try {
      let result = await axios({
        method: "POST",
        baseURL: CONFIG.BASE_URL_LOGIN,
        headers: { "Content-Type": "application/json" },
        url: `api/login`,
        data: { ...userdata },
      });
      if (result.data.success) {
        await Service.setUserdata(result.data.token);
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ error: result.data.errorMessage });
      }
    } catch (error) {
      console.error("try catch [ LoginApi ] error.message >>", error.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const TBSlice = createSlice({
  name: "TBSlice",
  initialState: {
    //LoginApi handling
    isLoginApi: false,
    isLoginApiFetching: false,
    LoginApiData: {},

    //Success handling
    isSuccess: false,
    successMessage: "",

    //Error handling
    isError: false,
    errorMessage: "",
  },
  reducers: {
    updateState: (state, { payload }) => {
      // Login handling
      state.isLoginApi =
        payload.isLoginApi !== undefined
          ? payload.isLoginApi
          : state.isLoginApi;

      //Success handling
      state.isSuccess =
        payload.isSuccess !== undefined ? payload.isSuccess : state.isSuccess;
      state.successMessage =
        payload.successMessage !== undefined
          ? payload.successMessage
          : state.successMessage;

      // Error handling
      state.isError =
        payload.isError !== undefined ? payload.isError : state.isError;
      state.errorMessage =
        payload.errorMessage !== undefined
          ? payload.errorMessage
          : state.errorMessage;

      return state;
    },
  },
  extraReducers: (builder) => {
    //========= GetIECDetailsBySelectedDate
    builder.addCase(LoginApi.fulfilled, (state, { payload }) => {
      try {
        state.isLoginApi = true;
        state.LoginApiData = payload;
        state.isLoginApiFetching = false;
        // Success handling
        state.isSuccess = true;
        state.successMessage = "Login Successfully";
        // Error handling
        state.isError = false;
        state.errorMessage = "";
        return state;
      } catch (error) {
        console.error("Error: LoginApi.fulfilled try catch error >>", error);
      }
    });
    builder.addCase(LoginApi.rejected, (state, { payload }) => {
      try {
        state.LoginApiData = {};
        state.isLoginApi = false;
        state.isLoginApiFetching = false;
        // Success handling
        state.isSuccess = false;
        state.successMessage = "";
        // Error handling
        state.isError = true;
        payload
          ? (state.errorMessage = payload.error
              ? payload.error
              : "Please try again (There was some network issue).")
          : (state.errorMessage = "API Response Invalid. Please Check API");
      } catch (error) {
        console.error("Error: [LoginApi.rejected] try catch error >>", error);
      }
    });
    builder.addCase(LoginApi.pending, (state) => {
      state.isLoginApiFetching = true;
    });
  },
});

export const { updateState } = TBSlice.actions;
export const TBSelector = (state) => state.main.TB;
