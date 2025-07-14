# 🧳 TapNTrip — Your Personalized Travel Companion 🚀
A full-stack travel booking platform for all age groups, with a special focus on elderly users. Accessibility, safety, and seamless booking experiences are at the core. Built with modern tech, role-based access, and a clean, responsive UI.

---

## 🔥 Why TapNTrip?
TapNTrip is a mission-driven platform to simplify travel planning with personalized features, rewards, real-time assistance, and robust admin control. Designed for scalability, accessibility, and real-world usability.

---

## 🌟 Core Features

### 🧑‍💼 Multi-Role System
- **Customer Panel** – Book Flights, Hotels, Trains, Buses, and Packages (now includes packages from both hotel and package providers).
- **Service Provider Panel** – Register/manage listings. Includes hotel, transport, guide, and **package provider** roles (with custom fields and dashboards).
- **Admin Panel** – Full backend control over users, services, bookings, and content.

### ✨ Rewards System
- Tier-based loyalty points (Silver, Gold).
- Discounts, free cancellations, and premium benefits.

### 📒 My Journal
- Upload photos and write notes about your trip.

### 🧠 Assistant & SOS
- Voice-optimized AI assistant.
- Emergency SOS for elderly travelers.
- Reminder system for trip-related events.
- Real-time family tracking and location safety alerts.

---

## 💻 Tech Stack
| Category            | Technology / Library                     |
|---------------------|-------------------------------------------|
| **Frontend**        | React.js, TypeScript                      |
| **Styling/UI**      | Tailwind CSS, ShadCN UI, Lucide-react, CSS |
| **Routing**         | React Router                              |
| **Auth & Backend**  | Firebase (Auth, Firestore, Storage)       |
| **State Management**| React Context API                         |
| **i18n**            | i18next (multi-language support)          |
| **Testing**         | Jest                                      |
| **Build Tools**     | PostCSS, Babel                            |
| **API Layer**       | Custom API Services (`/services`)         |
| **Assets**          | Static assets in `public/` folder         |

---

## 🛠️ Folder Structure
```bash
TapNTrip/
├── public/               # Static files
├── src/
│   ├── assets/           # Icons and images
│   ├── components/       # Reusable UI components
│   ├── contexts/         # Auth, Theme, Firebase contexts
│   ├── pages/            # Page-level components (Customer, Admin, etc.)
│   ├── services/         # API & Firestore logic
│   ├── styles/           # Custom CSS themes
│   ├── utils/            # Helper functions
│   └── App.tsx
├── .env
├── tailwind.config.js
├── firebase-config.js
├── README.md
└── package.json
```

---


## 🚧 Current Progress
- ✅ Multi-role support (customer, admin, hotel/transport/guide/package provider)
- ✅ Modern, role-based dashboards and registration flows
- ✅ Packages from all providers visible to customers
- ✅ Clean, accessible, and responsive UI (dark mode supported)
- ✅ Codebase cleaned of deprecated files and unused code
- ✅ Accessibility and elderly-friendly optimizations

---

## 🧠 Future Scope
- 🔄 Backend migration to **NestJS** with PostgreSQL + Prisma
- 🤖 AI-based personalized recommendations
- 🗣️ Full voice command integration
- 🔒 Multi-factor authentication and OTP login
- 🌐 PWA support for offline access
- 📊 Analytics for Admin panel (Graphs, Usage, etc.)

---

## ✍️ Authors
**Bharat Pratap Singh**  
Final Year B.Tech IT-IoT, MITS Gwalior  
**Suhani Mehra**  
Final Year B.Tech CSE, MITS Gwalior

[GitHub](https://github.com/Bharatpratap392) | [LinkedIn](https://www.linkedin.com/in/bharatpratapsingh01/)  
[GitHub](https://github.com/Suhanimehra) | [LinkedIn](https://www.linkedin.com/in/suhani-mehra-991618365/)

---

## 📦 How to Run Locally
```bash
# Clone the repo
git clone https://github.com/Suhanimehra/TapNTrip.git
cd TapNTrip

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start # or npm start
```

---

## 🛠️ Troubleshooting & Known Issues
- If you see ESLint or compilation errors, ensure all dependencies are installed and your Node version matches the `.nvmrc` or project requirements.
- If you see "not a git repository" errors, run `git init` before pushing.
- For merge conflicts, use `git fetch origin && git rebase origin/main` before pushing.
- For Firebase setup, ensure your `firebase-config.js` is correctly configured.

---

## 🤝 Contributions
Contributions, suggestions, and collaboration ideas are welcome!

---

