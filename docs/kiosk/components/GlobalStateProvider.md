## File: `src/components/GlobalStateProvider.jsx`
- **Purpose:** Provides a global state for managing menu items, user selections, meal options, and cashier status across the application.
- **Functions:**
  - **GlobalStateProvider Component:**
    - **Purpose:** Wraps the application and provides context values for managing global state.
  - **useGlobalState:**
    - **Purpose:** Custom hook to access the global state.
- **Key Context Values:**
  - **mealOptions:**
    - **Purpose:** Configures meal restrictions (e.g., number of entrees and sides, meal type).
    - **Update Function:** `updateMealOptions`
  - **selectedItemIds:**
    - **Purpose:** Tracks user-selected items.
    - **Modification Functions:**
      - `addItemToSelection`
      - `removeItemToSelection`
      - `clearSelectedItems`
  - **menuItems, sides, entrees, drinks, desserts, extras:**
    - **Purpose:** Stores categorized menu items and updates based on fetched data.
  - **isCashier:**
    - **Purpose:** Tracks whether the user is logged in as a cashier.
    - **Update Function:** `setIsCashier`
  - **clearSidesAndEntrees:**
    - **Purpose:** Clears sides and entrees from the global state.
- **Features:**
  - **Dynamic Menu Categorization:**
    - Categorizes menu items into sides, entrees, drinks, desserts, and extras based on their category.
  - **Image and ID Mapping:**
    - Maps menu items to corresponding image URLs and IDs.
