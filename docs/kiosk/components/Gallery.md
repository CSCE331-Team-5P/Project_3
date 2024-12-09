## File: `src/components/Gallery.jsx`
- **Purpose:** Displays a scrollable carousel of menu items with quantity controls for each item.
- **Props:**
  - **items:** Array of menu items to be displayed in the carousel.
  - **sideQuantities:** Tracks the quantities of each menu item.
  - **incrementQuantity:** Callback function to increase the quantity of a specific menu item.
  - **decrementQuantity:** Callback function to decrease the quantity of a specific menu item.
  - **onButtonClick:** Callback function triggered on user interaction with the carousel.
- **Features:**
  - **Carousel Integration:**
    - Utilizes a responsive carousel to display menu items in a scrollable format.
  - **Interactive Controls:**
    - Includes "+" and "-" buttons for quantity adjustments on each `MenuItemCard`.
  - **Navigation Buttons:**
    - Provides previous and next buttons styled for easy navigation through the carousel.