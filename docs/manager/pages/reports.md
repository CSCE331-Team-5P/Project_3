## File: `src/app/reports/page.tsx`
- **Purpose:** Renders the franchise reports page for the Panda Express Management System, providing insights into transactions, product usage, and sales summaries.
- **Key Features:**
  - **Navbar Integration:**
    - Includes the `Navbar` component for navigation across the application.
  - **Reports Display:**
    - Integrates `XReport`, `ZReport`, and `ProductUsage` components to provide detailed franchise reports.
  - **Page Headings:**
    - Displays a main heading (`Franchise Reports`) to guide users.

- **Components Used:**
  - **`Navbar`:** Provides navigation links to other sections of the management system.
  - **`XReport`:** Displays daily transaction summaries for a selected date.
  - **`ZReport`:** Presents hourly transaction reports for a selected date.
  - **`ProductUsage`:** Summarizes product usage within a specified date range.

- **Styling:**
  - **Page Layout:**
    - Applies padding (`p-12`) for consistent spacing around the content.
    - Uses a flexbox layout (`flex flex-row mb-10`) to align the `XReport` and `ProductUsage` components side by side.
  - **Typography:**
    - Uses large and bold text (`text-4xl font-medium`) for the main heading.

- **Structure:**
  - Organized into sections for navigation, reports, and headings.
  - Modularized by using reusable components like `Navbar`, `XReport`, `ZReport`, and `ProductUsage`.
