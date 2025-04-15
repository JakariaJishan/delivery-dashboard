# Delivery App Dashboard

The **Delivery App Dashboard** is a web application designed to manage and track deliveries efficiently. It provides features such as delivery status tracking, adding new deliveries, editing existing ones, and deleting deliveries. The application is built using modern web technologies and follows best practices for scalability and maintainability.
![image](https://github.com/user-attachments/assets/fb6dfb67-0ce4-46a8-b2ee-7db1b30feabd)
![image](https://github.com/user-attachments/assets/99bf778c-d23e-468c-804f-a1ed032b14ab)


---

## 🚀 Features

### Dashboard Overview
- **Displays Delivery Statistics:**  
  View counts of deliveries by status (Pending, In Transit, Delivered, Not Delivered).
- **Responsive Design:**  
  Optimized for both desktop and mobile views.

### Delivery Management
- **Add New Deliveries:**  
  Includes validation (e.g., ensuring the delivery date is in the future).
- **Edit Existing Deliveries**
- **Delete Deliveries:**  
  Delete with a confirmation prompt.

### Search and Filter
- **Search Deliveries:**  
  Filter deliveries by recipient or address.
- **Pagination:**  
  Paginated delivery list for improved performance.

### Responsive Sidebar
- **Permanent Sidebar:**  
  Visible on larger screens.
- **Collapsible Sidebar:**  
  Optimized navigation for mobile devices.

### Error Handling
- **Graceful Error Messages:**  
  Displays error notifications for failed API calls.
- **Loading Indicators:**  
  Shown during asynchronous operations.

---

## 🛠️ Technologies Used

### Frontend
- **React:** Component-based UI development.
- **TypeScript:** Strongly typed JavaScript for improved code quality.
- **Material-UI (MUI):**  
  - `@mui/material`: Core UI components.
  - `@mui/icons-material`: Icon set for UI elements.
  - `@mui/x-date-pickers`: Date picker components.
- **Dayjs:** Lightweight date manipulation library.
- **Redux Toolkit:**  
  Simplified Redux state management and RTK Query for API calls.
- **redux-persist:** Persist Redux state across sessions.
- **React Router:** Client-side routing for navigation.

### Backend (API)
- **Mock API:**  
  - `GET /deliveries`: Fetch all deliveries.
  - `POST /deliveries`: Add a new delivery.
  - `PUT /deliveries/:id`: Update an existing delivery.
  - `DELETE /deliveries/:id`: Delete a delivery.

### Development Tools
- **Vite:** Fast development build tool.
- **ESLint:** Linting for code quality.
- **Prettier:** Code formatting.
- **Git:** Version control for collaboration.

---
## 🖥️ Setup and Installation
Prerequisites
Node.js (v16 or higher)
npm or yarn
Steps
Clone the repository:
```bash
  https://github.com/JakariaJishan/delivery-dashboard.git
    cd delivery-dashboard
```
      
Install dependencies:
```bash 
npm install
or
yarn install
```

Start the development server:
```bash
npm run dev
```

Open the app in your browser:

---

### 📱 Responsive Design
 - Desktop: Full-width layout with a permanent sidebar.
 - Mobile: Collapsible sidebar with a toggle button.
