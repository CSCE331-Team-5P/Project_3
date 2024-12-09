# Technical Wiki

## File: `src/app/api/chat/route.js`
- **Purpose:** Handles API requests to OpenAI’s GPT-4 for generating responses as a Panda Express order assistant.
- **Functions:**
  - **System Prompt:**
    - **Purpose:** Sets the chatbot's behavior and menu details for Panda Express orders.
  - **POST:**
    - **Purpose:** Processes user input, sends it to OpenAI’s API, and streams the response back.

---

## File: `src/app/api/connectDB/route.js`
- **Purpose:** Manages database interactions for processing transactions and fetching menu items.
- **Functions:**
  - **POST:**
    - **Purpose:** Processes transaction data, updates inventory quantities, inserts transaction and order records, and returns success or failure status.
  - **GET:**
    - **Purpose:** Fetches active inventory items from the database and returns them as formatted menu items.

---

## File: `src/app/api/weather/route.js`
- **Purpose:** Fetches the current weather data for a specified location using WeatherAPI.com.
- **Functions:**
  - **GET:**
    - **Purpose:** Retrieves the current weather data for "College Station" from WeatherAPI.com and returns it as a JSON response.

---

## File: `src/app/checkout/page.js`
- **Purpose:** Manages the checkout page functionality, including displaying the current order, handling user input for employee ID and payment method, and processing the checkout.
- **Functions:**
  - **Checkout Component:**
    - **Purpose:** Core component for the checkout page. Handles state management for the order, employee ID, payment method, magnifier tool, and checkout logic.
  - **captureScreenshot:**
    - **Purpose:** Captures a screenshot of the current page for the magnifier tool.
  - **handleCheckout:**
    - **Purpose:** Validates inputs and sends the checkout data to the backend for processing.
  - **Magnifier Feature:**
    - **Purpose:** Toggles a zoom-in magnifier tool for the screen, enabling accessibility.

---

## File: `src/app/drink/page.js`
- **Purpose:** Displays available drinks, manages drink selection, and provides a magnifier feature for accessibility.
- **Functions:**
  - **Drink Component:**
    - **Purpose:** Main component for the drink selection page, handling state and interactions.
  - **captureScreenshot:**
    - **Purpose:** Captures a screenshot of the current view for the magnifier tool.
  - **handleMouseMove:**
    - **Purpose:** Updates the magnifier’s position based on mouse movements.
  - **handleCategoryClick:**
    - **Purpose:** Redirects users to appropriate pages based on the selected category.
  - **Magnifier Feature:**
    - **Purpose:** Toggles and manages the magnifier tool for zooming in on the screen.

---

## File: `src/app/employeeLogin/page.js`
- **Purpose:** Provides an employee login page where employees can log in using a PIN to access cashier functionality.
- **Functions:**
  - **EmployeeLoginPage Component:**
    - **Purpose:** Main component for the employee login page, handling PIN input and login logic.
  - **handleLogin:**
    - **Purpose:** Validates the entered PIN and redirects the user to the menu items page if the PIN is correct; otherwise, displays an error.

---

## File: `src/app/extras/page.js`
- **Purpose:** Provides functionality for selecting and managing extras and desserts, with a magnifier feature for accessibility.
- **Functions:**
  - **ExtrasPage Component:**
    - **Purpose:** Main component for the extras page, handling state and rendering extras and desserts.
  - **captureScreenshot:**
    - **Purpose:** Captures a screenshot of the current view for the magnifier tool.
  - **incrementQuantity:**
    - **Purpose:** Increases the quantity of a selected extra or dessert and updates the state.
  - **decrementQuantity:**
    - **Purpose:** Decreases the quantity of a selected extra or dessert and updates the state.
  - **handleMouseMove:**
    - **Purpose:** Updates the magnifier's position based on mouse movements.
  - **handleScroll:**
    - **Purpose:** Updates the magnifier's view when scrolling through extras or desserts.
  - **Magnifier Feature:**
    - **Purpose:** Toggles and manages the magnifier tool for zooming in on the screen.

---

## File: `src/app/menuItems/page.js`
- **Purpose:** Provides functionality for selecting sides and entrees, managing selections, and including a magnifier tool and chatbot for enhanced user interaction.
- **Functions:**
  - **Home Component:**
    - **Purpose:** Main component for the home page, managing user interaction and rendering sides and entrees selection.
  - **captureScreenshot:**
    - **Purpose:** Captures a screenshot of the current view for the magnifier tool.
  - **incrementQuantity:**
    - **Purpose:** Increases the quantity of a selected side or entree, updating the state and ensuring meal constraints are adhered to.
  - **decrementQuantity:**
    - **Purpose:** Decreases the quantity of a selected side or entree, updating the state and ensuring minimum limits are respected.
  - **calculateTotalCount:**
    - **Purpose:** Calculates the total selected quantity from item quantities.
  - **handleMouseMove:**
    - **Purpose:** Updates the magnifier’s position based on mouse movements.
  - **handleScroll:**
    - **Purpose:** Updates the magnifier view during scrolling through sides or entrees.
  - **Magnifier Feature:**
    - **Purpose:** Toggles and manages the magnifier tool for zooming in on the screen.

---

---

## File: `src/app/global.css`
- **Purpose:** Defines global styles, base configurations, and theme variables for consistent appearance across the application.
- **Key Styles:**
  - **Typography:**
    - Sets the default font family to 'Inter', sans-serif for the entire application.
  - **Tailwind Integration:**
    - Includes Tailwind CSS layers for base styles, components, and utilities.
  - **Theme Variables:**
    - Defines CSS variables under `:root` for light and dark themes, including colors for backgrounds, text, borders, and specific chart colors.
    - Supports dynamic theming with `.dark` class for dark mode.
  - **Global Element Styles:**
    - Applies border, background, and text styles consistently using Tailwind utility classes.

---

## File: `src/app/layout.js`
- **Purpose:** Defines the root layout for the application, wrapping all pages with global state and context providers.
- **Key Features:**
  - **Global CSS:**
    - Imports `globals.css` to apply global styles across the application.
  - **Metadata:**
    - Sets page metadata, including the title, description, and favicon.
  - **Context Providers:**
    - Wraps the application in `GlobalStateProvider` and `MagnifierProvider` to manage global state and magnifier functionality.
  - **Structure:**
    - Renders the application within an HTML `<html>` and `<body>` structure with accessibility features like `lang="en"` and `antialiased` class.

---

## File: `src/app/page.js`
- **Purpose:** Implements the landing page of the Panda Kiosk application, featuring navigation, weather information, Google Translate integration, and a magnifier tool.
- **Functions:**
  - **Home Component:**
    - **Purpose:** Main component for the landing page, rendering the "Order & Pay Here" interface and handling user interactions.
  - **fetchWeather:**
    - **Purpose:** Fetches and displays the current weather for College Station.
  - **captureScreenshot:**
    - **Purpose:** Captures a screenshot of the page for use with the magnifier tool.
  - **handleMouseMove:**
    - **Purpose:** Updates the position of the magnifier tool based on mouse movement.
  - **handleClick:**
    - **Purpose:** Navigates to the menu items page unless the click is on the Google Translate widget.
  - **Magnifier Feature:**
    - **Purpose:** Toggles and displays a magnifier tool for accessibility.
  - **Google Translate Integration:**
    - **Purpose:** Adds language translation support using the Google Translate widget.
  - **Cashier Login Button:**
    - **Purpose:** Redirects to the employee login page for cashier access.

---

## File: `src/components/context/MagnifierContext.js`
- **Purpose:** Provides a context for managing the state and position of the magnifier tool across the application.
- **Functions:**
  - **useMagnifier:**
    - **Purpose:** Custom hook to access magnifier-related state and functions from the context.
  - **MagnifierProvider:**
    - **Purpose:** Context provider that manages the state of the magnifier tool, including enabling/disabling it and its position.
- **Features:**
  - Persists the `isMagnifierEnabled` state using `localStorage`.
  - Updates the magnifier position dynamically.

---

## File: `src/components/Chatbot.jsx`
- **Purpose:** Provides a chat interface for users to interact with an AI assistant, designed for use in the Panda Kiosk application.
- **Functions:**
  - **Chatbot Component:**
    - **Purpose:** Main component managing the chat interface, message handling, and UI interactions.
  - **handleSubmit:**
    - **Purpose:** Sends the user's message to the AI API and displays the AI's response in the chat.
  - **handleRegenerate:**
    - **Purpose:** Re-submits the last user message to the AI API for a new response.
  - **toggleExpand:**
    - **Purpose:** Toggles between expanded and minimized views of the chatbot.
- **Features:**
  - **Expandable UI:**
    - Supports switching between a compact button and a fully expanded chat window.
  - **Scroll Area:**
    - Maintains scrollable chat history for better user experience.
  - **Buttons:**
    - Includes a submit button for sending messages and a regenerate button for retrying a query.

---

## File: `src/components/DrinkCard.jsx`
- **Purpose:** Renders a card UI component for displaying drink details, with functionality for managing quantity adjustments.
- **Props:**
  - **title:** The name of the drink displayed on the card.
  - **image:** The image of the drink to be displayed.
  - **quantity:** The current quantity of the drink selected.
  - **onIncrement:** Callback function to increment the drink's quantity.
  - **onDecrement:** Callback function to decrement the drink's quantity.
- **Features:**
  - **Interactive Buttons:**
    - Includes "+" and "-" buttons to modify the drink quantity.
  - **Responsive Styling:**
    - Applies hover effects and transforms for improved visual feedback.
  - **Optimized Layout:**
    - Ensures proper text wrapping and consistent card dimensions.

---

## File: `src/components/DrinkSelection.jsx`
- **Purpose:** Displays a grid of drink options with quantity controls for each drink.
- **Props:**
  - **onButtonClick:** Callback function triggered when a drink's quantity is adjusted.
- **Functions:**
  - **incrementQuantity:**
    - **Purpose:** Increases the quantity of a selected drink and updates the global state.
  - **decrementQuantity:**
    - **Purpose:** Decreases the quantity of a selected drink and updates the global state.
- **Features:**
  - **Dynamic Drink List:**
    - Renders a grid of `DrinkCard` components based on available drinks from the global state.
  - **Responsive Design:**
    - Adapts the grid layout for various screen sizes (1–4 columns).
  - **Interactive Controls:**
    - Provides "+" and "-" buttons to modify drink quantities.

---

---

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

---

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

---

## File: `src/components/KioskFooter.jsx`
- **Purpose:** Displays a footer with the current order summary and a button to navigate to the checkout page.
- **Props:**
  - **sideQuantities:** Object tracking quantities of selected sides.
  - **entreeQuantities:** Object tracking quantities of selected entrees.
  - **drinkQuantities:** Object tracking quantities of selected drinks.
- **Functions:**
  - **handleClick:**
    - **Purpose:** Navigates to the `/checkout` page when the "Checkout" button is clicked.
- **Features:**
  - **Order Summary:**
    - Dynamically lists selected items and their quantities in the order pane.
  - **Responsive Design:**
    - Provides a compact and functional layout for the footer.
  - **Interactive Checkout Button:**
    - Styled button with hover effects for navigation to the checkout page.

---

## File: `src/components/MenuItemCard.jsx`
- **Purpose:** Renders a card UI component for displaying menu item details and managing item quantities.
- **Props:**
  - **title:** The name of the menu item (e.g., "Chow Mein").
  - **imageUrl:** The image URL of the menu item.
  - **calories:** The calorie count of the menu item.
  - **quantity:** The current quantity of the menu item selected.
  - **incrementQuantity:** Callback function to increase the item's quantity.
  - **decrementQuantity:** Callback function to decrease the item's quantity.
- **Features:**
  - **Interactive Controls:**
    - Includes "+" and "-" buttons to adjust item quantities.
  - **Dynamic Layout:**
    - Displays item image, title, calorie information, and quantity in a visually consistent layout.
  - **Responsive Styling:**
    - Includes hover effects and maintains a fixed card size.

---

## File: `src/components/Navbar.jsx`
- **Purpose:** Displays a navigation bar with interactive menu categories and routes to corresponding pages.
- **Functions:**
  - **handleCategoryClick:**
    - **Purpose:** Updates the active category, adjusts meal options, and navigates to the appropriate page based on the selected category.
- **Features:**
  - **Dynamic Menu Items:**
    - Includes clickable menu categories such as "A la carte," "Bowl," "Plate," "Bigger Plate," "Drink," and "Extras," each with an icon.
  - **Interactive Design:**
    - Highlights the active category with bold text, underline, and color changes.
  - **Order Section:**
    - Integrates the `OrderPopover` component for managing the current order.
  - **Styling:**
    - Responsive and visually appealing navigation bar with hover effects and transitions.

---

## File: `src/components/OrderPopover.jsx`
- **Purpose:** Displays a popover with the current order details, allowing users to view items and navigate to the checkout page.
- **Functions:**
  - **updateQuantity:**
    - **Purpose:** Adjusts the quantity of a specific item in the order while ensuring it doesn’t drop below zero.
  - **useEffect for Order Mapping:**
    - **Purpose:** Maps selected item IDs to a structured list of items with names, IDs, and quantities.
- **Features:**
  - **Dynamic Order Summary:**
    - Displays a list of items in the current order with their quantities.
  - **Responsive Design:**
    - Provides a scrollable order list and a fixed "Checkout" button for smaller screens.
  - **Interactive Checkout Button:**
    - Navigates to the `/checkout` page when clicked.

---




