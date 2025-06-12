// Example usage of the language system in your components

import { useSelector } from "react-redux";
import { useTranslation } from "lang";
import { RootState } from "store/store";

// Example 1: Using the useTranslation hook
function ProductCard() {
  const { languages } = useSelector((state: RootState) => state.ui);
  const { t } = useTranslation(languages);

  return (
    <div className="product-card">
      <h3>{t("products.add_to_cart")}</h3>
      {/* <p>{t("products.in_stock")}</p> */}
      <span>{t("products.price")}: $99.99</span>
    </div>
  );
}

// Example 2: Using translation with parameters
function SearchResults({ count }: { count: number }) {
  const { languages } = useSelector((state: RootState) => state.ui);
  const { t } = useTranslation(languages);

  return (
    <div>
      <p>{t("search.results_found", { count })}</p>
    </div>
  );
}

// Example 3: Using translations in filter components
function PriceFilter() {
  const { languages } = useSelector((state: RootState) => state.ui);
  const { t } = useTranslation(languages);

  return (
    <div className="price-filter">
      <h4>{t("filters.price")}</h4>
      <div className="price-range">
        <label>{t("filters.price_range")}</label>
        {/* Your price range slider component */}
      </div>
    </div>
  );
}

// Example 4: Cart component with dynamic item count
function CartSummary({
  itemCount,
  total,
}: {
  itemCount: number;
  total: number;
}) {
  const { languages } = useSelector((state: RootState) => state.ui);
  const { t } = useTranslation(languages);

  return (
    <div className="cart-summary">
      <h3>{t("cart.title")}</h3>
      <p>{t("cart.items_count", { count: itemCount })}</p>
      <p>
        {t("cart.total")}: ${total.toFixed(2)}
      </p>
      <button>{t("cart.checkout")}</button>
    </div>
  );
}

// Example 5: Form validation with translations
function CheckoutForm() {
  const { languages } = useSelector((state: RootState) => state.ui);
  const { t } = useTranslation(languages);

  const validateForm = (data: any) => {
    const errors: Record<string, string> = {};

    if (!data.name) {
      errors.name = t("validation.required");
    }

    if (!data.phone) {
      errors.phone = t("validation.required");
    } else if (!/^\+?\d{10,}$/.test(data.phone)) {
      errors.phone = t("validation.phone");
    }

    return errors;
  };

  return (
    <form>
      <div>
        <label>{t("cart.checkout_form.customer_name")}</label>
        <input
          type="text"
          placeholder={t("cart.checkout_form.customer_name_placeholder")}
        />
      </div>

      <div>
        <label>{t("cart.checkout_form.phone")}</label>
        <input
          type="tel"
          placeholder={t("cart.checkout_form.phone_placeholder")}
        />
      </div>

      <button type="submit">{t("common.submit")}</button>
    </form>
  );
}

export { ProductCard, SearchResults, PriceFilter, CartSummary, CheckoutForm };
