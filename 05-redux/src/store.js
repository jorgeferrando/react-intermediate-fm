import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "./AdoptedPetSlice";
import { petApi } from "./PetApiService";
import searchParams from "./SearchParamsSlice";
const store = configureStore({
    reducer: {
        adoptedPet,
        searchParams,
        [petApi.reducerPath]: petApi.reducer,
    },
    middleware: (
        getDefaultMiddlewere // allows redux to cache
    ) => getDefaultMiddlewere().concat(petApi.middleware),
});

export default store;
