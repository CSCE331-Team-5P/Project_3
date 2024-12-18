## File: `src/components/update-employee.tsx`
- **Purpose:** Provides an interface for updating employee information, such as name, job title, wage, and status.
- **Functions:**
  - **EmployeeUpdateForm Component:**
    - **Purpose:** Allows users to input an employee ID and update a specific field with a new value.
    - **Features:**
      - **Field Selection:**
        - Dropdown menu for selecting the field to update (e.g., name, wage, status).
      - **Input Validation:**
        - Ensures all fields are filled before sending the update request.
      - **API Integration:**
        - Sends PATCH requests to the `/api/employee` endpoint to update employee information.
      - **Error Handling:**
        - Displays error messages for failed updates.
      - **Reusable Components:**
        - Uses components like `Input`, `Label`, and `Select` for a consistent form design.