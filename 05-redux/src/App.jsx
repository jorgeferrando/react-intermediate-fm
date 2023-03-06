import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux';
import store from './store';
import SearchParams from "./SearchParams";
import Details from "./Details";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity, // 1000 * 60 * 10 -> 10 minutes
            cacheTime: Infinity,
        },
    },
});

const App = () => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <header>
                        <Link to="/">Adopt ME!</Link>
                    </header>
                    <div>
                        <Routes>
                            <Route path="/details/:id" element={<Details />} />
                            <Route path="/" element={<SearchParams />} />
                        </Routes>
                    </div>
                </Provider>
            </QueryClientProvider>
        </BrowserRouter>
    );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(createElement(App));
