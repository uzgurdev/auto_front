import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "../lang";
import { RootState } from "../store/store";

const LanguageTest = () => {
  const { languages } = useSelector((state: RootState) => state.ui);
  const { t } = useTranslation(languages);

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Language System Test
      </h2>

      <div className="space-y-3">
        <div className="border-b pb-2">
          <strong>Current Language:</strong> {languages.toUpperCase()}
        </div>

        <div className="space-y-2">
          <div>
            <strong>Navigation Home:</strong> {t("navigation.home")}
          </div>
          <div>
            <strong>Navigation Products:</strong> {t("navigation.products")}
          </div>
          <div>
            <strong>Navigation Cart:</strong> {t("navigation.cart")}
          </div>
          <div>
            <strong>Search Placeholder:</strong> {t("search.placeholder")}
          </div>
          <div>
            <strong>More Button:</strong> {t("more")}
          </div>
          <div>
            <strong>Banner Title:</strong> {t("banner_1_title")}
          </div>
          <div>
            <strong>Footer Follow Us:</strong> {t("footer.follow_us")}
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="text-sm text-gray-600">
            Try changing the language using the dropdown in the navbar to see
            the translations update!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageTest;
