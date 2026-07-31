# 🎓 Nodus — Student Profile Management System

> *A student data platform that actually feels like a product.*

---

## 📌 Overview

**EduProfile** is a feature-rich, frontend-only student profile management system built for the Front End Engineering II course assessment. It goes far beyond basic CRUD — it's a complete student intelligence platform with role-based access, AI-powered features, battle comparisons, and semester analytics.

No backend. No database. Just **HTML, CSS, JavaScript**, and the browser.

---

## ✨ Features

### Core
| Feature | Description |
|---|---|
| Add / Edit / Delete | Full student management with form validation |
| Search & Filter | Filter by name, branch, CGPA, or semester |
| Sort | Sort students by CGPA, name, or date added |
| CSV Import | Bulk upload student data from a CSV file |

### Profile
| Feature | Description |
|---|---|
| Skill Bars | Visual proficiency bars for each student skill |
| Achievement Badges | Auto-assigned — Top Performer, On Fire, Hackathon Winner |
| Journey Timeline | Chronological log of a student's college milestones |
| Mood / Vibe Tag | Student's current academic state — Grinding, Burnt Out, On Fire |
| Profile Card Export | Download a student's profile as a shareable card |

### Unique
| Feature | Description |
|---|---|
| ⚔️ Battle Mode | Pick any two students — compare them head-to-head on all stats |
| 🎁 Semester Wrapped | End-of-semester summary — CGPA jump, skills added, projects shipped |
| 🤖 Career Path Predictor |  AI reads the profile and suggests career roles + skill gaps |
| 🤝 Smart Teammate Finder | Enter a project idea — AI recommends the best matching teammates |

### Access Control
| Feature | Description |
|---|---|
| Admin | Full access — add, edit, delete, import |
| Viewer | Read-only — browse profiles, view stats, use AI features |

---

## 🗂️ Pages

```
📄 login.html          → Role-based entry point (Admin / Viewer)
📄 dashboard.html      → Stats overview + recent students + search
📄 students.html       → Full student grid + filters + add modal
📄 profile.html        → Individual student — skills, timeline, badges
📄 battle.html         → Head-to-head student comparison
📄 wrapped.html        → Semester performance summary card
```

---

## 🛠️ Tech Stack

```
Frontend      HTML5 · CSS3 · Vanilla JavaScript (ES6+)
Storage       localStorage (JSON serialized)
AI Features   GROQ API 
Deployment    Vercel / GitHub Pages
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/eduprofile.git

# 2. Open in browser
cd eduprofile
open login.html
```

> No install. No build step. No dependencies. Just open and run.

---

## 📁 Folder Structure

```
eduprofile/
├── index.html              (redirects to login)
├── login.html
├── dashboard.html
├── students.html
├── profile.html
├── battle.html
├── wrapped.html
│
├── css/
│   ├── global.css          (variables, reset, typography)
│   ├── components.css      (cards, modals, badges, buttons)
│   └── pages/
│       ├── dashboard.css
│       ├── profile.css
│       ├── battle.css
│       └── wrapped.css
│
├── js/
│   ├── storage.js          (localStorage read/write helpers)
│   ├── auth.js             (role check, page protection)
│   ├── students.js         (CRUD operations)
│   ├── battle.js           (comparison logic)
│   ├── wrapped.js          (semester summary logic)
│   └── ai.js              (GROQ API calls)
│
└── assets/
    └── icons/
```

---

## 🔐 Role System

Authentication is handled entirely on the frontend via `localStorage`.

```
Admin login  →  full access  →  add, edit, delete, import
Viewer login →  read only   →  browse, search, AI features
```

Roles are stored on login and read on every page load. Buttons are conditionally shown or hidden based on the active role. All pages are protected — direct URL access without login redirects to `login.html`.

---

## 💾 Data Persistence

All student data is stored in the browser using `localStorage` with `JSON.stringify` and `JSON.parse`. Data survives page refreshes and browser restarts. No server required.

```js
// Save
localStorage.setItem("students", JSON.stringify(students))

// Load
const students = JSON.parse(localStorage.getItem("students")) || []
```

---

## 👥 Team

| Name | Role |
|---|---|
| Pashvinder | Lead — Dashboard, Battle Mode, Auth |
| [Teammate 2] | Student CRUD, Search, Filter |
| [Teammate 3] | Profile Page, Timeline, Badges |
| [Teammate 4] | AI Features, Semester Wrapped, Export |

---

## 📚 Course Details

```
Course     Front End Engineering II
Code       25CSE0203
Semester   3rd Sem · Batch 2025
Branch     AIML / CSE
Type       Continuous Evaluation Project
```

---

## 📄 License

This project is for academic purposes.
Built with curiosity, caffeine, and way too many localStorage logs.

---

<div align="center">
  <sub>Made with dedication by the EduProfile team · Batch 2025</sub>
</div>
