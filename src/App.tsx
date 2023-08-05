import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios, { AxiosRequestConfig } from "axios";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CategoryList, CategoryCreate } from "./pages/categories";
import {
  RestaurantCreate,
  RestaurantEdit,
  RestaurantShow,
} from "./pages/restaurants";
import { CategoryShow } from "./pages/categories/show";
import { MenuItemEdit } from "./pages/menu-items/edit";
import { MenuItemCreate } from "./pages/menu-items/create";
import { CategoryEdit } from "./pages/categories/edit";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider("http://localhost:8080/api/v1")}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              resources={[
                {
                  name: "categories",
                  list: "/",
                  show: "/categories/show/:id",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                },
                {
                  name: "restaurants",
                  show: "/restaurants/show/:id",
                  edit: "/restaurants/edit/:id",
                  create: "/restaurants/create/:categoryId",
                },
                {
                  name: "menu-items",
                  edit: "/menu-items/edit/:id",
                  create: "/menu-items/create/:restaurantId",
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <ThemedLayoutV2
                      Header={() => <Header sticky />}
                      Title={({ collapsed }) => (
                        <ThemedTitleV2
                          // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
                          collapsed={collapsed}
                          text="Resto Finder"
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  <Route path="/">
                    <Route index element={<CategoryList />} />
                    <Route
                      path="categories/create"
                      element={<CategoryCreate />}
                    />
                    <Route
                      path="categories/edit/:id"
                      element={<CategoryEdit />}
                    />
                    <Route
                      path="categories/show/:id"
                      element={<CategoryShow />}
                    />
                  </Route>
                  <Route path="/restaurants">
                    <Route
                      path="create/:categoryId"
                      element={<RestaurantCreate />}
                    />
                    <Route path="edit/:id" element={<RestaurantEdit />} />
                    <Route path="show/:id" element={<RestaurantShow />} />
                  </Route>
                  <Route path="/menu-items">
                    <Route
                      path="create/:restaurantId"
                      element={<MenuItemCreate />}
                    />
                    <Route path="edit/:id" element={<MenuItemEdit />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
