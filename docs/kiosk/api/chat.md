## File: `src/app/api/chat/route.js`
- **Purpose:** Handles API requests to OpenAI’s GPT-4 for generating responses as a Panda Express order assistant.
- **Functions:**
  - **System Prompt:**
    - **Purpose:** Sets the chatbot's behavior and menu details for Panda Express orders.
  - **POST:**
    - **Purpose:** Processes user input, sends it to OpenAI’s API, and streams the response back.
