## File: `src/app/home/page.tsx`
- **Purpose:** Renders the home page for the Panda Express Manager application, providing quick access to key management sections like inventory, employee, and reports.

- **Key Features:**
  - **Navbar Integration:**
    - Includes the `Navbar` component for navigation across the application.
  - **Hero Section:**
    - Displays a welcoming `HeroCard` component to introduce the manager's dashboard.
  - **Quick Access Menu:**
    - Provides interactive cards for navigation to key sections: Inventory, Employee, and Reports.
    - Uses descriptive titles and icons to represent each section visually.

- **Components Used:**
  - **`Navbar`:** Provides navigation links to other sections of the management system.
  - **`HeroCard`:** Welcomes the user with a brief introduction to the manager dashboard.
  - **`Button`:** Used in each menu card for navigation actions.
  - **`Card`:** Styled containers for displaying each section's access point.

- **Menu Items:**
  - **Inventory:**
    - **Path:** `/inventory`
    - **Icon:** `InventoryIcon`
    - **Description:** Access and manage inventory.
  - **Employee:**
    - **Path:** `/employee`
    - **Icon:** `BadgeIcon`
    - **Description:** Access and manage employees.
  - **Reports:**
    - **Path:** `/reports`
    - **Icon:** `AssessmentIcon`
    - **Description:** Access and view reports.

- **Styling:**
  - **Page Layout:**
    - Applies padding (`p-12`) for consistent spacing.
    - Uses a grid layout (`grid grid-cols-1 md:grid-cols-3 gap-6`) to organize menu items responsively.
  - **Typography:**
    - Welcoming message (`text-3xl font-semibold`) and section headings (`text-2xl font-bold`) provide clear structure.
    - Menu titles (`text-xl font-semibold`) ensure readability.

- **Structure:**
  - Organized into a navbar, hero section, and quick access menu.
  - Modular design using reusable components like `HeroCard`, `Card`, and `Button`.
  - Each menu card includes an icon, title, description, and navigation button.
