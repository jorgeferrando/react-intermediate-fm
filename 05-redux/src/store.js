import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "./AdoptedPetSlice";
import searchParams from "./SearchParamsSlice";
const store = configureStore({
    reducer: {
        adoptedPet,
        searchParams,
    },
});

export default store;
