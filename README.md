# legal-case-management-system-using-react
# Legal Case Management System (React + Redux)

**Legal Case Management System** is a scalable, responsive **React.js frontend application** designed to help law firms and corporate legal departments manage legal cases, court dates, assigned lawyers, and case statuses efficiently.

This project demonstrates **frontend engineering best practices**, **state management with Redux Toolkit**, **CRUD operations**, and **modern React architecture**.


##  Project Summary
- Built a **single-page application (SPA)** using React functional components
- Implemented **global state management** using Redux Toolkit
- Designed **modular, reusable components**
- Implemented **client-side routing** using React Router v6
- Applied **form validation** and controlled components
- Implemented **Light/Dark mode** using React Context API
- Ensured **responsive design** across mobile, tablet, and desktop devices

---

##  Core Features

### Case Management (CRUD)
- Create, Read, Update, and Delete legal cases
- Fields include:
  - Case Number
  - Case Type
  - Assigned Lawyer
  - Case Status (Open, Ongoing, Closed)
  - Court Date

### Case Tracking
- Track upcoming court dates
- Update and close cases upon resolution
- Filter cases by status

### State Management
- Centralized state using **Redux Toolkit**
- Predictable state updates via slices and reducers
- Efficient UI updates without prop drilling

### Routing & Navigation
- Multi-page navigation using **React Router v6**
- Dedicated pages for:
  - Home
  - Add Case
  - Edit Case
  - Case Details
  - Login (Optional)

### UI & Accessibility
- Light/Dark theme toggle using **React Context**
- Responsive and accessible UI
- Clean and user-friendly layout for non-technical users

---

##  Technology Stack

| Category | Tools |
|-------|------|
| Frontend | React.js (Functional Components) |
| State Management | Redux Toolkit |
| Routing | React Router v6 |
| Styling | Tailwind CSS / Material UI |
| Language | JavaScript (ES6+) |
| Runtime | Node.js 16.x |
| Data Handling | Fetch API / Axios |

---

##  Project Structure
src/
├── components/
│ ├── CaseList.jsx
│ ├── CaseForm.jsx
│ ├── CaseDetails.jsx
│ ├── Navbar.jsx
│ ├── LoginPage.jsx
│ ├── ThemeToggle.jsx
│ ├── redux/
│ │ ├── store.js
│ │ ├── caseSlice.js
│ │ ├── authSlice.js
├── App.js
├── index.js




