# ✅ Taskify — A Modern To-Do App

A sleek, full-featured task management app built with **React 19**, **Vite**, and **Tailwind CSS v4**, featuring user authentication, dark mode, and smooth animations powered by Framer Motion.

---

## 🚀 Features

- 📝 **Task Dashboard** — Create, manage, and track your tasks in one place
- 🔐 **User Authentication** — Register & log in with persistent sessions via `localStorage`
- 🌗 **Dark / Light Mode** — Toggle themes with preference saved across sessions
- 🎞️ **Smooth Animations** — Page transitions and UI effects via Framer Motion
- 📱 **Responsive Design** — Mobile-friendly layout with a glassmorphism aesthetic
- 🛡️ **Auth Guard** — Protected routes redirect unauthenticated users to login
- 📄 **Multi-page Routing** — Home, Dashboard, Login, Register, Contact, Security

---

## 🧱 Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [Vite 8](https://vitejs.dev/) | Build tool & dev server |
| [React Router v7](https://reactrouter.com/) | Client-side routing |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations & transitions |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library |

---

## 📁 Project Structure

```
TO-DO/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and media
│   ├── components/
│   │   ├── Navbar.jsx      # Top navigation bar with theme toggle
│   │   └── Footer.jsx      # Site footer
│   ├── context/
│   │   └── AuthContext.jsx # Global auth state (login, logout, isAuthenticated)
│   ├── pages/
│   │   ├── Home.jsx        # Landing page
│   │   ├── Dashboard.jsx   # Main task management interface
│   │   ├── Login.jsx       # Login form
│   │   ├── Register.jsx    # Registration form
│   │   ├── Contact.jsx     # Contact page
│   │   └── Security.jsx    # Security/privacy page
│   ├── App.jsx             # Root component with routing & theme logic
│   ├── main.jsx            # React entry point
│   ├── App.css             # Global component styles
│   └── index.css           # Base styles & CSS variables
├── index.html
├── vite.config.js
├── package.json
└── eslint.config.js
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/taskify.git
cd taskify

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check for code issues |

---

## 🔒 Authentication

Authentication is handled client-side using **React Context** (`AuthContext`) and **localStorage**:

- User data is stored under the key `taskify_user`
- Theme preference is stored under `taskify_dark_mode`
- The `useAuth()` hook provides `user`, `login`, `logout`, and `isAuthenticated` to any component
- Unauthenticated users attempting to access the Dashboard are redirected to `/login`

> **Note:** This is a frontend-only auth implementation. For production use, integrate a backend API and secure token-based authentication.

---

## 🌐 Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page with app overview |
| `/app` | Dashboard | Task management (auth required) |
| `/login` | Login | User sign-in |
| `/register` | Register | New user sign-up |
| `/contact` | Contact | Contact / feedback form |
| `/security` | Security | Privacy & security information |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
