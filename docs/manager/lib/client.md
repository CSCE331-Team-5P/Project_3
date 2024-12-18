## File: `src/app/lib/db/client.ts`
- **Purpose:** Establishes a connection to the PostgreSQL database and provides utilities for executing database queries.
- **Functions:**
  - **`query`:**
    - **Purpose:** Executes SQL queries using the database connection pool.
    - **Parameters:**
      - `text`: SQL query string.
      - `params`: Optional parameters for the SQL query.
    - **Features:**
      - Centralized error handling for database operations.
      - Re-throws errors for debugging in calling functions.
  - **Default Export:**
    - **Purpose:** Exports the `pool` for direct use if needed.