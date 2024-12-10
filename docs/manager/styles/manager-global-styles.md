## File: `src/app/global.css`
- **Purpose:** Defines global styles, base configurations, and theme variables for consistent appearance across the Panda Manager application.
- **Key Features:**
  - **Font Configuration:**
    - Imports the `Inter` font from Google Fonts and applies it globally to the `body` tag.
  - **Tailwind Integration:**
    - Includes Tailwind's base, components, and utilities layers for streamlined CSS management.
  - **Custom CSS Variables:**
    - Defines a set of CSS variables under `:root` for light and dark themes, covering colors for:
      - Background, foreground, and card elements.
      - Accents, muted tones, and destructives.
      - Borders, inputs, and chart colors.
    - Supports dynamic theming using the `.dark` class for dark mode.
  - **Base Styles:**
    - Sets the default background and text colors for the `body` tag.
    - Applies consistent border styles using Tailwind's utility classes.

- **Dynamic Theming:**
  - **Light Theme (`:root`):**
    - Bright and neutral colors for a clean interface.
    - Optimized for readability in well-lit environments.
  - **Dark Theme (`.dark`):**
    - Darker tones for reduced eye strain.
    - Includes complementary foreground and accent colors for clarity.

- **Utility Classes:**
  - Applies reusable styles for elements like `*` and `body` using Tailwind's `@apply` directive.
