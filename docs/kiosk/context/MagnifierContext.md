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