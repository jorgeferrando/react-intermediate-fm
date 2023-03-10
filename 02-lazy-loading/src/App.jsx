import { createElement, useState, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // 1000 * 60 * 10 -> 10 minutes
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPetHook = useState(null);
  return (
    <div className="m-0 p-0">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AdoptedPetContext.Provider value={adoptedPetHook}>
            <Suspense
              fallback={
                <div className="loading-pane">
                  <h2 className="loader">🎃</h2>
                </div>
              }
            >
              <header className="mb-10 w-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7 text-center">
                <Link
                  className="text-6xl text-white hover:text-gray-200"
                  to="/"
                >
                  Adopt ME!
                </Link>
              </header>
              <div>
                <Routes>
                  <Route path="/details/:id" element={<Details />} />
                  <Route path="/" element={<SearchParams />} />
                </Routes>
              </div>
            </Suspense>
          </AdoptedPetContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(createElement(App));
