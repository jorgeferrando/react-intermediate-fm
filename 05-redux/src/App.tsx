import { createElement, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchParams from "./SearchParams";
import Details from "./Details";
import AdoptedPetContext from "./AdoptedPetContext";
import { Pet } from "./APIResponsesTypes";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity, // 1000 * 60 * 10 -> 10 minutes
            cacheTime: Infinity,
        },
    },
});

const App = () => {
    const adoptedPetHook = useState(null as Pet | null);
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AdoptedPetContext.Provider value={adoptedPetHook}>
                    <header>
                        <Link to="/">Adopt ME!</Link>
                    </header>
                    <div>
                        <Routes>
                            <Route path="/details/:id" element={<Details />} />
                            <Route path="/" element={<SearchParams />} />
                        </Routes>
                    </div>
                </AdoptedPetContext.Provider>
            </QueryClientProvider>
        </BrowserRouter>
    );
};
const container = document.getElementById("root");

if (!container) {
    throw new Error("No container for render");
}

const root = createRoot(container);
root.render(createElement(App));
