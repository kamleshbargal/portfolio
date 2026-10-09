/**
 * Kamlesh Bargal - Developer Portfolio JavaScript
 * Features: Typewriter, Theme Toggle, Interactive Terminal,
 * Project Modals, Skills Filtering, Copy Helpers, Smooth Scrolling.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  initNavbar();
  initPageRouting();
  initSkillsFilter();
  initModals();
  initTerminal();
  initContactForm();
  initClipboardButtons();
  initBackToTop();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Check saved preference or default to dark
  const savedTheme = localStorage.getItem('kb-portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', nextTheme);
      localStorage.setItem('kb-portfolio-theme', nextTheme);
    });
  }
}

/* ==========================================================================
   2. Dynamic Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const textElement = document.getElementById('typewriterText');
  if (!textElement) return;

  const words = [
    'Frontend Web Developer',
    'Data Analyst & Insights Specialist',
    'HTML5, CSS3 & JS Specialist',
    'Power BI & SQL Dashboard Builder',
    'Python & Analytics Explorer',
    'Next.js & React Enthusiast'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      textElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      textElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. Zero-Scroll Page Switching Engine
   ========================================================================== */
function switchPage(pageName) {
  const pageViews = document.querySelectorAll('.page-view');
  if (pageViews.length === 0) return;

  // Normalize page name
  if (!pageName || pageName === 'index.html' || pageName === '/') {
    pageName = 'home';
  }

  const targetView = document.getElementById(`page-${pageName}`);
  if (!targetView) {
    pageName = 'home';
  }

  // Hide all other pages
  pageViews.forEach(view => {
    view.classList.remove('active');
  });

  // Activate only the selected page
  const activeView = document.getElementById(`page-${pageName}`) || document.getElementById('page-home');
  if (activeView) {
    activeView.classList.add('active');
  }

  // Update navbar links active state
  document.querySelectorAll('[data-page]').forEach(link => {
    if (link.getAttribute('data-page') === pageName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Zero-scroll: Always set position immediately to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Update URL hash without scrolling
  if (window.location.hash !== `#${pageName}`) {
    history.replaceState(null, null, `#${pageName}`);
  }
}

function initPageRouting() {
  // Listen for clicks on any link or button with data-page attribute
  document.addEventListener('click', (e) => {
    const pageTrigger = e.target.closest('[data-page]');
    if (pageTrigger) {
      e.preventDefault();
      const targetPage = pageTrigger.getAttribute('data-page');
      switchPage(targetPage);

      // Close mobile menu if open
      const navMenu = document.getElementById('navMenu');
      const mobileToggle = document.getElementById('mobileToggle');
      if (navMenu && mobileToggle) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
      }
    }
  });

  // Handle URL hash on load or hash change
  function handleHash() {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash) {
      switchPage(hash);
    } else {
      switchPage('home');
    }
  }

  window.addEventListener('hashchange', handleHash);
  handleHash();
}

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  // Scroll effect on header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
    });
  }
}

/* ==========================================================================
   4. Skills Category Filtering
   ========================================================================== */
function initSkillsFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetCategory = btn.getAttribute('data-category');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (targetCategory === 'all' || cardCategory === targetCategory) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Project Modals Management
   ========================================================================== */
function initModals() {
  const openButtons = document.querySelectorAll('.open-modal-btn');
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.modal-close-btn, .modal-close-btn-bottom, .modal-overlay');

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modals.forEach(m => m.classList.remove('active'));
      document.body.style.overflow = 'auto';
    });
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(m => m.classList.remove('active'));
      document.body.style.overflow = 'auto';
    }
  });
}

/* ==========================================================================
   6. Interactive Developer Terminal
   ========================================================================== */
function initTerminal() {
  const terminalBody = document.getElementById('terminalBody');
  const terminalInput = document.getElementById('terminalInput');
  const submitBtn = document.getElementById('terminalSubmitBtn');

  if (!terminalBody || !terminalInput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: () => [
      '<span class="terminal-highlight">Available Commands:</span>',
      '  <span class="terminal-highlight">whoami</span>    - Brief intro about Kamlesh Bargal',
      '  <span class="terminal-highlight">skills</span>    - List core technical proficiencies',
      '  <span class="terminal-highlight">analytics</span> - View Data Analytics & BI tools (Power BI, SQL, Pandas)',
      '  <span class="terminal-highlight">projects</span>  - Overview of featured projects',
      '  <span class="terminal-highlight">education</span> - Educational credentials & degree',
      '  <span class="terminal-highlight">contact</span>   - Contact email, phone, location',
      '  <span class="terminal-highlight">resume</span>    - Open & download PDF resume',
      '  <span class="terminal-highlight">github</span>    - Open GitHub profile in new tab',
      '  <span class="terminal-highlight">clear</span>     - Clear terminal window',
      '  <span class="terminal-highlight">date</span>      - Show current date & timestamp'
    ],
    whoami: () => [
      'Kamlesh Bargal | Frontend Web Developer & Data Analyst (B.Tech CSE).',
      'Experienced in building responsive websites, full-stack e-commerce applications, and data analytics pipelines (Power BI, SQL, Pandas).',
      'Based in Pune, India 🇮🇳.'
    ],
    skills: () => [
      '• Core Web: HTML5, CSS3, JavaScript (ES6+), Responsive UI',
      '• Data Analytics: Power BI, SQL, Python (Pandas/NumPy), Advanced Excel, EDA',
      '• Frameworks & Tools: Next.js, React, Angular basics, Python, REST APIs',
      '• Databases: MySQL, PostgreSQL, SQLite',
      '• Cloud & Ops: Google Cloud Platform (GCP), Git, GitHub, Linux, VS Code'
    ],
    analytics: () => [
      '📊 <span class="terminal-highlight">Data Analytics & Business Intelligence Toolkit:</span>',
      '  • Power BI: Interactive KPI dashboards, DAX formulas, trend reports (Kiran Academy)',
      '  • SQL: Complex queries, joins, window functions, and data transformations',
      '  • Python Pandas & NumPy: Data cleaning, wrangling, sports analytics dashboard',
      '  • Advanced Excel: Pivot tables, VLOOKUP, statistical summaries, data auditing',
      '  • Exploratory Data Analysis: Trend forecasting, anomaly detection, business insights'
    ],
    projects: () => [
      '1. Atelier Online Clothes Shopping (HTML5, CSS3, JS, GCP Live Store)',
      '2. Hindavi Tours & Travels [LIVE]: <a href="https://hindavi-tours-travels.onrender.com/" target="_blank" class="terminal-highlight">hindavi-tours-travels.onrender.com</a>',
      '3. Sports Performance Analytics & Streamlit Dashboard (Python, Pandas)',
      '4. AI Conversational Chat Agent (Python, NLP, REST APIs)'
    ],
    education: () => [
      '• B.Tech in CSE - Shreeyash College of Engg. (2023 - 2026) | CGPA: 7.54',
      '• Diploma in Computer Engg. - IET Polytechnic, Kannad (2020 - 2023) | 78.00%'
    ],
    contact: () => [
      '📧 Email: <a href="mailto:kamleshbargal28@gmail.com" class="terminal-highlight">kamleshbargal28@gmail.com</a>',
      '📱 Phone: <a href="tel:+919209962961" class="terminal-highlight">+91 9209962961</a>',
      '💬 WhatsApp: <a href="https://wa.me/919209962961" target="_blank" class="terminal-highlight">+91 9209962961</a>',
      '📍 Location: Pune, Maharashtra, India'
    ],
    resume: () => {
      window.open('assets/docs/Kamlesh_Bargal_Resume.pdf', '_blank');
      return ['[✓] Opening Kamlesh_Bargal_Resume.pdf...'];
    },
    github: () => {
      window.open('https://github.com/kamleshbargal', '_blank');
      return ['[✓] Navigating to GitHub: https://github.com/kamleshbargal...'];
    },
    date: () => [new Date().toString()],
    clear: () => {
      terminalBody.innerHTML = '';
      return [];
    }
  };

  function executeCommand(cmdStr) {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    // Append user input line
    const userLine = document.createElement('div');
    userLine.className = 'terminal-line';
    userLine.innerHTML = `<span class="prompt-user">guest@kamlesh-dev:~$</span> ${escapeHTML(cmdStr)}`;
    terminalBody.appendChild(userLine);

    // Find and execute handler
    if (commands[trimmed]) {
      const outputLines = commands[trimmed]();
      outputLines.forEach(line => {
        const outLine = document.createElement('div');
        outLine.className = 'terminal-line';
        outLine.innerHTML = line;
        terminalBody.appendChild(outLine);
      });
    } else {
      const errLine = document.createElement('div');
      errLine.className = 'terminal-line terminal-error';
      errLine.innerHTML = `command not found: ${escapeHTML(trimmed)}. Type '<span class="terminal-highlight">help</span>' for a list of commands.`;
      terminalBody.appendChild(errLine);
    }

    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
    terminalInput.value = '';
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    }
  });

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      executeCommand(terminalInput.value);
    });
  }
}

/* ==========================================================================
   7. Contact Form Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const subject = document.getElementById('senderSubject').value;
    const message = document.getElementById('senderMessage').value;

    // Build mailto fallback link for seamless zero-backend transmission
    const mailtoLink = `mailto:kamleshbargal28@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    if (feedback) {
      feedback.className = 'form-feedback success';
      feedback.innerHTML = `
        <i class="fa-solid fa-circle-check"></i> 
        Thank you, <strong>${escapeName(name)}</strong>! Opening your email client to send your message to <strong>kamleshbargal28@gmail.com</strong>...
      `;
    }

    setTimeout(() => {
      window.location.href = mailtoLink;
      form.reset();
    }, 800);
  });

  function escapeName(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}

/* ==========================================================================
   8. Copy to Clipboard Utility
   ========================================================================== */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check" style="color:#10b981;"></i>';
        btn.setAttribute('title', 'Copied to clipboard!');

        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.removeAttribute('title');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    });
  });
}

/* ==========================================================================
   9. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
