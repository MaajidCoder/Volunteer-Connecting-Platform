# Volunteer Connecting Platform

A full-stack MERN web application designed to empower college communities by seamlessly connecting passionate student volunteers with clubs, departments, and faculty organizers. 

## 🚀 Live Features

### For Volunteers (Students):
- **Browse Opportunities:** Explore a visually appealing feed of upcoming volunteering events across the campus.
- **One-Click Apply:** Instantly apply to events using your profile.
- **Personal Dashboard:** Track your submitted applications and monitor your approval status.

### For Organizers (Clubs/Faculty):
- **Event Creation:** Easily publish new events, specifying required volunteers, locations, and schedules. 
- **Application Management:** Review applications in real-time on your dashboard and seamlessly sort, approve, or reject volunteers.

## 🛠️ Technology Stack

- **Frontend:** React.js, Vite, Tailwind CSS v4, React Router, Axios, Lucide React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB & Mongoose
- **Security:** JSON Web Tokens (JWT) & bcryptjs for encrypted passwords

## ⚙️ Local Setup & Installation

### Prerequisites
- Node.js installed on your machine
- A MongoDB URI (Local or MongoDB Atlas)

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/volunteer-connecting-platform.git
cd "volunteer-connecting-platform"
```

### Step 2: Setup the Backend
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Step 3: Setup the Frontend
1. Open a new terminal tab and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit `http://localhost:5173` (or the port Vite provides) to view the app!

## 🤝 Contributing
Contributions are welcome! If you have any ideas to improve the interface or add new features (such as automated certificate generation or email notifications), feel free to open an issue or submit a pull request.

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
