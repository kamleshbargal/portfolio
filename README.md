# 🚀 Kamlesh Bargal - Developer Portfolio

A sleek, responsive, high-performance personal developer portfolio website designed for **Kamlesh Bargal** (Frontend Web Developer & Software Engineer).

Built using modern web standards (**HTML5**, **CSS3**, **Vanilla JavaScript ES6+**), showcasing core proficiencies in **HTML, CSS, JavaScript, Python, Next.js, and Cloud Deployment (GCP)**.

---

## ✨ Features

- 🌓 **Dark & Light Mode Support**: Glassmorphic UI with persistent theme toggle stored in `localStorage`.
- ⌨️ **Dynamic Typewriter Effect**: Highlights roles dynamically in the Hero section.
- 💻 **Interactive Developer Terminal (CLI)**: Visitors can test commands like `help`, `skills`, `projects`, `contact`, `resume`, `clear`.
- 🗂️ **Interactive Project Showcase**:
  - **Atelier - Online Clothes Shopping Platform**: E-Commerce website with catalog, cart, checkout, admin, deployed on GCP.
  - **Hindavi Tours & Travels**: Travel package booking platform with fleet showcase and backend integration.
  - **Sports Analytics & Streamlit Dashboard**: Python & Pandas sports metrics visualizer.
  - **AI Conversational Chat Agent**: NLP-driven query answering capstone project.
- 🔍 **Interactive Project Modals**: Deep-dive architectural breakdowns for every featured project.
- ⚡ **Skills Filter Grid**: Instant filtering across *Frontend*, *Backend & Languages*, and *Tools & Cloud*.
- 🎓 **Education & Internship Milestones**: B.Tech CSE (CGPA: 7.54), Data Analyst Intern at Kiran Academy, Diploma in Computer Engg.
- 📄 **Resume Download Integration**: Linked directly to `assets/docs/Kamlesh_Bargal_Resume.pdf`.
- 📱 **Quick Connect Hub**: One-click WhatsApp chat, direct email (`kamleshbargal28@gmail.com`), phone dialer, copy buttons, and message form.

---

## 📁 Project Structure

```
C:\Kamlesh\portfolio\
├── index.html                  # Main semantic HTML5 markup
├── css\
│   └── style.css               # Modern design tokens, animations, responsive rules
├── js\
│   └── main.js                 # Terminal, modals, typewriter, filters, theme engine
├── assets\
│   ├── docs\
│   │   └── Kamlesh_Bargal_Resume.pdf # Real PDF resume
│   └── images\
│       ├── project-ecommerce.png     # Atelier E-Commerce preview
│       ├── project-travel.jpg        # Hindavi Tours preview
│       └── project-analytics.png     # Sports Analytics preview
├── run_portfolio.bat           # One-click launcher script
└── README.md                   # Documentation & deployment guide
```

---

## 🏃‍♂️ How to Run Locally

### Option 1: One-Click (Recommended)
Double click `run_portfolio.bat` in File Explorer. It automatically launches the local server at `http://localhost:8080` and pops open your default browser.

### Option 2: Python Command Line
Open PowerShell or Command Prompt inside `C:\Kamlesh\portfolio` and run:
```bash
python -m http.server 8080
```
Then open `http://localhost:8080` in any browser.

### Option 3: Direct Open
Simply double-click `index.html` to open it immediately in Google Chrome, Microsoft Edge, or any web browser without needing a server.

---

## 🌐 Free Deployment Guide

### Deploy on GitHub Pages (Recommended)
1. Initialize a new git repository in this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of portfolio website"
   ```
2. Create a new repository on your GitHub account (e.g. `kamleshbargal/portfolio` or `kamleshbargal.github.io`).
3. Push your repository:
   ```bash
   git remote add origin https://github.com/kamleshbargal/portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. Go to **Settings > Pages** on your GitHub repository, choose **Branch: main**, folder: `/ (root)`, and click **Save**. Your site will be live instantly!

### Deploy on Vercel
1. Install Vercel CLI or connect your GitHub repository directly at [vercel.com](https://vercel.com).
2. It detects static HTML/CSS/JS and deploys with a lightning-fast global CDN in under 30 seconds.
