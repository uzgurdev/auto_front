import App from "App";
import { Navigate, Route, Routes as Switch } from "react-router-dom";

import { Cart, Home, Products } from "pages";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Route>
    </Switch>
  );
};

export default Routes;
