# Language System Documentation

## Overview

This directory contains a complete internationalization (i18n) system for the auto parts e-commerce application supporting Uzbek, Russian, and English languages.

## Supported Languages

- **uz** - Uzbek (O'zbek)
- **ru** - Russian (Русский)
- **en** - English

## File Structure

```
src/lang/
├── index.ts         # Main translation utilities and hooks
├── uz.json          # Uzbek translations
├── ru.json          # Russian translations
├── en.json          # English translations
└── examples.tsx     # Usage examples
```

## Usage Examples

### 1. Basic Translation Hook

```tsx
import { useSelector } from "react-redux";
import { useTranslation } from "lang";
import { RootState } from "store/store";

function MyComponent() {
  const { languages } = useSelector((state: RootState) => state.ui);
  const { t } = useTranslation(languages);

  return (
    <div>
      <h1>{t("navigation.home")}</h1>
      <p>{t("common.loading")}</p>
    </div>
  );
}
```

### 2. Translation with Parameters

```tsx
function SearchResults({ count }: { count: number }) {
  const { languages } = useSelector((state: RootState) => state.ui);
  const { t } = useTranslation(languages);

  return <p>{t("search.results_found", { count })}</p>;
}
```

### 3. Direct Translation Function

```tsx
import { t } from "lang";

// Use directly with language parameter
const message = t("uz", "common.error");
const messageWithParams = t("ru", "cart.items_count", { count: 5 });
```

## Translation Keys Structure

### Common UI Elements

- `common.*` - General UI text (loading, error, buttons)
- `navigation.*` - Navigation menu items
- `header.*` - Header information (phone, address, schedule)

### Features

- `search.*` - Search functionality
- `filters.*` - Product filtering
- `products.*` - Product listings and details
- `cart.*` - Shopping cart and checkout
- `pagination.*` - Page navigation

### Forms & Validation

- `validation.*` - Form validation messages
- `cart.checkout_form.*` - Checkout form labels and placeholders

### Categories

- `categories.*` - Product category names

## Adding New Translations

1. **Add to all language files** (uz.json, ru.json, en.json):

```json
{
  "new_section": {
    "new_key": "Translation text"
  }
}
```

2. **Update TypeScript interface** in `index.ts`:

```typescript
export interface TranslationKeys {
  // ...existing keys...
  new_section: {
    new_key: string;
  };
}
```

3. **Use in components**:

```tsx
const text = t("new_section.new_key");
```

## Language Switching

Language is managed through Redux state:

```tsx
import { Store } from "store";
import { UIActions } from "store/slices";

// Switch language
Store.dispatch(UIActions.setLanguage("ru"));
```

## Current Translations Coverage

### ✅ Completed Sections

- Navigation and header
- Search functionality
- Product filters and listings
- Shopping cart and checkout
- Common UI elements
- Form validation
- Pagination
- Footer information

### 🔄 Partially Implemented

- Filter components (in progress)
- Product detail pages
- Error messages

### 📝 TODO

- Admin panel text
- Email templates
- SEO meta descriptions
- Help/FAQ content

## Best Practices

1. **Use nested keys** for organization:

   ```json
   {
     "cart": {
       "checkout_form": {
         "customer_name": "Customer Name"
       }
     }
   }
   ```

2. **Include context** in key names:

   ```json
   {
     "button_save": "Save",
     "button_cancel": "Cancel"
   }
   ```

3. **Use parameters** for dynamic content:

   ```json
   {
     "items_count": "{count} items"
   }
   ```

4. **Keep fallbacks** - system falls back to Uzbek if translation missing

## Integration Status

- ✅ Redux integration complete
- ✅ Translation utilities implemented
- ✅ All language files populated
- ✅ TypeScript interfaces defined
- 🔄 Component integration (in progress)
- 📝 Testing and validation pending

## Testing Translations

Use the browser console to test translations:

```javascript
// Test translation function
window.testTranslations = {
  uz: (key) => window.t("uz", key),
  ru: (key) => window.t("ru", key),
  en: (key) => window.t("en", key),
};

// Example usage
console.log(window.testTranslations.uz("cart.title")); // "Savat"
console.log(window.testTranslations.ru("cart.title")); // "Корзина"
console.log(window.testTranslations.en("cart.title")); // "Shopping Cart"
```
