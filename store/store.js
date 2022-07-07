import { configureStore } from "@reduxjs/toolkit";
import paseReducer from "../slices/paseData";

export const store = configureStore({
    reducer:{
        pase: paseReducer
    }
});