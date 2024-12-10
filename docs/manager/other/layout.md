## File: `src/app/layout.tsx`
- **Purpose:** Defines the root layout for the Panda Manager application, wrapping all pages with global styles and metadata.
- **Features:**
  - **Metadata:**
    - **`title`:** Sets the title of the application to "Panda Manager."
    - **`description`:** Describes the application as "Panda Express management application."
    - **`icons`:** Specifies a favicon (`/panda.svg`) for the application.
  - **Global Styles:**
    - Imports `globals.css` to apply consistent styles across all pages.
  - **Structure:**
    - Defines an HTML layout with:
      - `lang="en"` for accessibility and SEO.
      - `body` tag styled with `antialiased` for smoother font rendering.
    - Renders the child components passed to the layout.