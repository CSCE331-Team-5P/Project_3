## File: `src/app/page.tsx`
- **Purpose:** Implements the landing page for the Panda Express Management System, featuring a login form and company branding.
- **Key Features:**
  - **Logo Display:**
    - Uses `next/image` to display the Panda Express logo prominently on the left side of the screen.
  - **Login Form:**
    - Integrates the `LoginForm` component to allow users to log in to the management system.
  - **Routing:**
    - Utilizes the `useRouter` hook from Next.js to redirect users to the home page (`/home`) upon successful login.

- **Components Used:**
  - **`Image`:** Displays the Panda Express logo using the Next.js `Image` component for optimized image loading.
  - **`LoginForm`:** Renders the login form with a callback for handling successful logins.

- **Styling:**
  - **Responsive Layout:**
    - Divides the screen into two sections: logo display and login form, using a flexbox layout.
  - **Theming:**
    - Background color set to red (`bg-red-700`) for branding, with white background for the login card.
  - **Typography:**
    - Bold and large text styles for headings to enhance visibility and brand recognition.

- **Routing Logic:**
  - Redirects the user to the `/home` page after a successful login via the `handleSuccessfulLogin` function.
