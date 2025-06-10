import App from "App";
import { Navigate, Route, Routes as Switch } from "react-router-dom";

import { Cart, HomePage, Products } from "pages";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const Routes = () => {
  const { languages } = useSelector((state: RootState) => state.ui);

  return (
    <Switch>
      <Route path="/:lang" element={<App />}>
        <Route index element={<HomePage.Home />} />
        <Route path="/:lang/products/" element={<Products.Products />} />
        <Route path="/:lang/products/:productId" element={<span>Hello</span>} />
        <Route path="/:lang/cart" element={<Cart />} />
        <Route path="*" element={<Navigate to={`/${languages}`} />} />
      </Route>

      <Route path="*" element={<Navigate to={`/${languages}`} replace />} />
    </Switch>
  );
};

export default Routes;
