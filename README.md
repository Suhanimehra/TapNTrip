<<<<<<< HEAD
## 🧳 TapNTrip — Your Personalized Travel Companion 🚀
A full-stack travel booking platform designed for all age groups with a special focus on elderly users, ensuring accessibility, safety, and seamless booking experiences. Built with modern tech, role-based access, and a clean, responsive UI.

## 🔥 Why TapNTrip?
TapNTrip isn’t just another travel app — it's a mission-driven platform created to simplify travel planning with personalized features, rewards, real-time assistance, and robust admin control. Designed with scalability, accessibility, and real-world usability in mind.

## 📌 About the Project

**TapNTrip** is a full-featured, responsive travel booking platform tailored for **users of all ages**, with special care for **elderly travelers**. It integrates real-time travel booking, journaling, rewards, emergency features, and a powerful admin panel — all wrapped in a rich and accessible UI.

---
## 🌟 Core Features

### 🧑‍💼 Multi-Role System
- **Customer Panel** – Book Flights, Hotels, Trains, Buses, and Packages.
- **Service Provider Panel** – Register services and manage listings.
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

Here’s a breakdown of the tools and libraries that power TapNTrip:

| Category            | Technology / Library                     |
|---------------------|-------------------------------------------|
| **Frontend**        | React.js, TypeScript                      |
| **Styling/UI**      | Tailwind CSS, ShadCN UI, Lucide-react, CSS |
| **Routing**         | React Router (likely)                     |
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
````

---

## 📷 Screenshots

> Add screenshots/GIFs here (UI from:

* Rewards section
* My Journal
* Admin Dashboard
* Service/User Management
* Chatbot & SOS)

---

## 🚧 Current Progress

* ✅ Fully working **Rewards System**
* ✅ Beautiful dark-mode UI with **ShadCN components**
* ✅ Role-based access with **Clerk auth** and secure routing
* ✅ Admin dashboard (User, Service, Booking, and Payment Mgmt)
* ✅ Accessibility and elderly-friendly optimizations

---

## 🧠 Future Scope

* 🔄 Backend migration to **NestJS** with PostgreSQL + Prisma
* 🤖 AI-based personalized recommendations
* 🗣️ Full voice command integration
* 🔒 Multi-factor authentication and OTP login
* 🌐 PWA support for offline access
* 📊 Analytics for Admin panel (Graphs, Usage, etc.)

---

## ✍️ Author

**Bharat Pratap Singh** 
> Final Year B.Tech IT-IoT, MITS Gwalior
> Passionate about building real-world full-stack products, accessible design, and scalable systems.

**Suhani Mehra**
> Final Year B.Tech CSE, MITS Gwalior
> Passionate about building real-world full-stack products, accessible design, and scalable systems.

📫 [GitHub](https://github.com/Bharatpratap392) | [LinkedIn](https://www.linkedin.com/in/bharatpratapsingh01/)
📫 [GitHub](https://github.com/Suhanimehra))    | [LinkedIn](https://www.linkedin.com/in/suhani-mehra-991618365/)
---

## 📦 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/Bharatpratap392/TapNTrip.git
cd TapNTrip

# Install dependencies
npm install

# Start development server
npm run dev/npm start
```

## 🤝 Contributions

While TapNTrip is currently being built Duo, contributions, suggestions, and collaboration ideas are welcome.

### ✅ Next Steps:
- Save this as `README.md` and push to your repo.
- Add a folder like `assets/screenshots/` to hold GIFs and images for visual showcase.
- Let me know if you want **badges** (GitHub stars, last commit, etc.) or a **deployment setup** with Vercel or Netlify.

Let me know when you're ready to push — or if you want the same quality README for your **Service Provider Panel**, **Elderly Travel Initiative**, or any other submodule.
```
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
