import uzTranslations from "./uz.json";
import ruTranslations from "./ru.json";
import enTranslations from "./en.json";

export type Language = "uz" | "ru" | "en";

export interface TranslationKeys {
  banner_1_sub_title: string;
  banner_1_title: string;
  more: string;
  header: {
    phone: string;
    address: string;
    schedule: string;
    languages: {
      uz: string;
      ru: string;
      en: string;
    };
  };
  navigation: {
    home: string;
    products: string;
    cart: string;
    about: string;
    contact: string;
  };
  search: {
    placeholder: string;
    results_found: string;
    total_found: string;
    no_results: string;
    view_more: string;
    loading: string;
  };
  filters: {
    title: string;
    producers: string;
    brands: string;
    models: string;
    price: string;
    price_range: string;
    position: string;
    color: string;
    reset: string;
    apply: string;
    price_for: string;
    positions: {
      front: string;
      rear: string;
      front_left: string;
      front_right: string;
      rear_left: string;
      rear_right: string;
    };
  };
  products: {
    loading: string;
    no_products: string;
    add_to_cart: string;
    // in_stock: string; // Commented out to disable stock functionality
    // out_of_stock: string; // Commented out to disable stock functionality
    more_than_10: string;
    price: string;
    brand: string;
    model: string;
    position: string;
    description: string;
    specifications: string;
    id: string;
  };
  cart: {
    title: string;
    empty_message: string;
    total: string;
    items_count: string;
    checkout: string;
    continue_shopping: string;
    remove: string;
    quantity: string;
    item_total: string;
    order_success: string;
    processing: string;
    checkout_form: {
      customer_name: string;
      customer_name_placeholder: string;
      phone: string;
      phone_placeholder: string;
      telegram: string;
      telegram_placeholder: string;
      address: string;
      address_placeholder: string;
    };
  };
  pagination: {
    previous: string;
    next: string;
    page: string;
    of: string;
    showing: string;
    to: string;
    results: string;
  };
  footer: {
    follow_us: string;
    contact_info: string;
    working_hours: string;
    address: string;
    about_text: string;
  };
  common: {
    loading: string;
    error: string;
    try_again: string;
    cancel: string;
    confirm: string;
    save: string;
    edit: string;
    delete: string;
    close: string;
    open: string;
    yes: string;
    no: string;
    all: string;
    none: string;
    select: string;
    search: string;
    filter: string;
    sort: string;
    view: string;
    download: string;
    upload: string;
    submit: string;
    reset: string;
    clear: string;
    refresh: string;
  };
  validation: {
    required: string;
    email: string;
    phone: string;
    min_length: string;
    max_length: string;
    numeric: string;
  };
  categories: {
    brake: string;
    oil: string;
    lights: string;
    exhaust: string;
    filter: string;
    stereo: string;
    damper: string;
  };
}

const translations: Record<Language, TranslationKeys> = {
  uz: uzTranslations as TranslationKeys,
  ru: ruTranslations as TranslationKeys,
  en: enTranslations as TranslationKeys,
};

// Get translation with key path
export function getTranslation(language: Language, keyPath: string): string {
  const keys = keyPath.split(".");
  let value: any = translations[language];

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      // Fallback to Uzbek if key not found
      value = translations.uz;
      for (const fallbackKey of keys) {
        if (value && typeof value === "object" && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return keyPath; // Return key path if not found
        }
      }
      break;
    }
  }

  return typeof value === "string" ? value : keyPath;
}

// Get translation with interpolation
export function t(
  language: Language,
  keyPath: string,
  params?: Record<string, string | number>
): string {
  let translation = getTranslation(language, keyPath);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      translation = translation.replace(
        new RegExp(`{${key}}`, "g"),
        String(value)
      );
    });
  }

  return translation;
}

// Hook for React components
export function useTranslation(language: Language) {
  return {
    t: (keyPath: string, params?: Record<string, string | number>) =>
      t(language, keyPath, params),
    translations: translations[language],
  };
}

export { uzTranslations, ruTranslations, enTranslations };
export default translations;
