# 🪴 Habit Garden

A gamified habit tracking web application that helps users build and maintain positive habits by growing a virtual garden. Watch your plants grow as you complete your habits!

**Created by Linden, Layya & George**

## 📖 Overview

Habit Garden transforms habit tracking into an engaging visual experience. Users can create habits with custom frequencies, track their progress, and watch their virtual garden flourish as they maintain consistency. Each habit is represented by a plant that grows through different stages based on the user's completion rate.

## ✨ Features

- **User Authentication**: Simple username-based login system
- **Habit Creation**: Create custom habits with specified frequencies
- **Visual Progress**: Watch plants grow through 8 different stages (0-7) based on habit completion
- **Beautiful Landscape**: Interactive garden scene with clouds, trees, hills, and grass
- **Responsive Design**: Modern UI built with Bootstrap 5.3
- **Real-time Updates**: Dynamic plant rendering based on user progress

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- Bootstrap 5.3
- Custom landscape components (plants, clouds, hills, trees)

### Backend
- Python Flask
- Flask-CORS for cross-origin requests
- SQLite database

## 📁 Project Structure

```
hackathon/
├── frontend_site/          # Frontend application
│   ├── landing_page.html   # Login page
│   ├── landing_page.css    # Login page styles
│   ├── landing_page.js     # Login page logic
│   └── assets/             # Garden assets
│       ├── landscape.html  # Main garden view
│       ├── landscape.css   # Garden styles
│       ├── landscape.js    # Garden logic
│       ├── plant/          # Plant growth stages (plant0-7.html)
│       ├── tree/           # Tree components
│       ├── hill/           # Hill components
│       ├── cloud.html      # Cloud component
│       └── sky.html        # Sky component
├── flaskr/                 # Backend API
│   ├── __init__.py         # Flask app initialization
│   ├── auth.py             # Authentication routes
│   ├── habit.py            # Habit management routes
│   ├── db.py               # Database utilities
│   └── schema.sql          # Database schema
├── instance/               # SQLite database storage
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Python 3.7+
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   cd hackathon
   ```

2. **Set up Python virtual environment**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize the database**
   ```bash
   flask --app flaskr init-db
   ```

### Running the Application

1. **Start the Flask backend**
   ```bash
   flask --app flaskr run
   ```
   The API will be available at `http://127.0.0.1:5000`

2. **Serve the frontend**
   
   Open a new terminal and run:
   ```bash
   cd frontend_site
   python -m http.server 8000
   ```
   
   Or use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VSCode for auto-reload functionality.

3. **Access the application**
   
   Open your browser and navigate to:
   - `http://localhost:8000/landing_page.html` (login page)
   - After login, you'll be redirected to the garden view

## 🎮 How to Use

1. **Sign In**: Enter your username on the landing page (no password required)
2. **Add a Habit**: Click "Add Habit" button and specify:
   - Habit name (e.g., "Morning Exercise")
   - Frequency (how many times per week)
3. **View Your Garden**: Your habit is represented by a plant
4. **Track Progress**: As you log completions, your plant grows through stages 0-7
5. **Watch Your Garden Grow**: Maintain consistency to see your plant flourish!

## 🔌 API Endpoints

### Authentication
- `POST /auth/create` - Create new user
- `POST /auth/login` - User login

### Habits
- `POST /habit/new` - Create new habit
- `GET /habit/<user_id>` - Get user's habits
- `GET /habit/score` - Calculate habit completion score
- `POST /habit/log` - Log habit completion
- `GET /habit/all_logs/<habit_id>` - Get all logs for a habit

## 🗄️ Database Schema

### user_info
- `user_id` (PRIMARY KEY)
- `username` (UNIQUE)

### habit
- `habit_id` (PRIMARY KEY)
- `habit_name`
- `frequency` (times per week)
- `user_id` (FOREIGN KEY)

### habit_log
- `habit_log_id` (PRIMARY KEY)
- `user_id` (FOREIGN KEY)
- `habit_id` (FOREIGN KEY)
- `date_practiced`

## 🎨 Customization

- **Plant Stages**: Edit HTML files in `frontend_site/assets/plant/` to customize plant appearances
- **Landscape Elements**: Modify components in `assets/` folder (trees, hills, clouds)
- **Styling**: Update CSS files for colors and layouts
- **Scoring Algorithm**: Modify the scoring logic in `flaskr/habit.py`

## 🐛 Troubleshooting

**Plants not showing up?**
- Check browser console for errors
- Verify iframe paths are correct
- Ensure Flask backend is running on port 5000

**Database errors?**
- Run `flask --app flaskr init-db` to reinitialize
- Check that `instance/` folder exists

**CORS errors?**
- Ensure Flask-CORS is installed
- Verify backend is running on correct port

## 📝 License

This project was created for a hackathon event.

## 🙏 Acknowledgments

- Bootstrap for UI components
- Flask for backend framework
- The hackathon organising team

---

**Happy Habit Building! 🌱**
- JavaScript (Vanilla)
- [Bootstrap 5](https://getbootstrap.com/)
