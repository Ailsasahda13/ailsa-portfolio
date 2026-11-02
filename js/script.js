/**
 * Ailsa Sahda Garizah - Portfolio JavaScript
 * Handles navigation, animations, project filtering, and interactive modals.
 */

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 1. MOBILE NAVIGATION TOGGLE
  // =========================================================================
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-links a");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }

  // =========================================================================
  // 2. SCROLL REVEAL OBSERVER
  // =========================================================================
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach((el) => el.classList.add("visible"));
  }

  // =========================================================================
  // 3. ACTIVE NAV LINK HIGHLIGHTER
  // =========================================================================
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute("id");
            navItems.forEach((link) => {
              const href = link.getAttribute("href");
              if (href === `#${currentId}`) {
                link.classList.add("active");
              } else if (href.startsWith("#")) {
                link.classList.remove("active");
              }
            });
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px" }
    );

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  // =========================================================================
  // 4. PROJECT CATEGORY FILTER
  // =========================================================================
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Set active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          card.style.display = "";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 20);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(12px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 250);
        }
      });
    });
  });

  // =========================================================================
  // 5. MODAL MANAGEMENT (CERTIFICATE & PROJECT DETAILS)
  // =========================================================================
  const certModal = document.getElementById("certModal");
  const openCertBtns = document.querySelectorAll(".open-cert-modal");
  const closeCertBtn = document.getElementById("closeCertModal");

  const projectModal = document.getElementById("projectModal");
  const closeProjectBtn = document.getElementById("closeProjectModal");
  const openProjectDetailBtns = document.querySelectorAll(".open-project-modal");

  const cvModal = document.getElementById("cvModal");
  const openCvBtns = document.querySelectorAll(".open-cv-modal");
  const closeCvBtn = document.getElementById("closeCvModal");

  // Helper to open modal
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Helper to close modal
  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Certificate Modal Handlers
  openCertBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(certModal);
    });
  });

  if (closeCertBtn) {
    closeCertBtn.addEventListener("click", () => closeModal(certModal));
  }

  // CV Modal Handlers
  openCvBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(cvModal);
    });
  });

  if (closeCvBtn) {
    closeCvBtn.addEventListener("click", () => closeModal(cvModal));
  }

  // Project Details Database for Interactive Modal
  const projectData = {
    outgear: {
      title: "OutGear Station",
      subtitle: "Outdoor Equipment Rental System & Integrated POS",
      type: "Web Application • Academic PBL Semester 5",
      tech: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"],
      github: "https://github.com/fael83/Pbl-Smt5_Outgear-Station",
      summary:
        "OutGear Station is a full-featured web-based rental information system equipped with an integrated Point of Sale (POS) and inventory tracking module. Designed to automate outdoor adventure gear rentals, reduce double-booking, and optimize store cashier workflows.",
      myRole:
        "Developed key frontend customer rental catalog and booking interface, and assisted in backend transactional logic and POS integration for inventory deductions.",
      keyFeatures: [
        "Online catalog and reservation system with dates selection",
        "Point of Sale (POS) cashier interface for walk-in transactions",
        "Automated late fee calculation and deposit status tracking",
        "Inventory level monitoring and return verification system",
        "Role-based authentication for Customers, Cashier, and Store Admin"
      ]
    },
    easylive: {
      title: "EasyLive",
      subtitle: "Integrated Boarding House Rental & Moving Logistics App",
      type: "Mobile Application • Academic PBL Semester 4",
      tech: ["Flutter", "Dart", "REST API", "Provider State Management"],
      github: "https://github.com/alyfazeha/EasyLive_PBLKelompok1Semester4",
      summary:
        "EasyLive addresses the fragmented accommodation journey for college students and renters by combining boarding house (kost) discovery with on-demand moving service logistics into a unified cross-platform mobile application.",
      myRole:
        "Led frontend UI development using Flutter, created responsive multi-screen layouts, designed intuitive user flows, and integrated booking endpoints.",
      keyFeatures: [
        "Interactive room search with price, facility, and distance filters",
        "Detailed boarding house views with photo galleries and reviews",
        "Integrated moving service vehicle booking and scheduled pickup",
        "User profile, saved favorites, and booking history tracking",
        "Clean, consistent Flutter UI designed for Android & iOS"
      ]
    },
    labsys: {
      title: "SE Laboratory Information System",
      subtitle: "Laboratory Operations & Academic Resource Management",
      type: "Web Application • Academic Project",
      tech: ["Laravel", "PHP", "MySQL", "JavaScript"],
      github: "https://github.com/Ailsasahda13/pwl-pos-244107060006",
      summary:
        "A customized institutional information system engineered to support the daily operations of the Software Engineering Laboratory at Politeknik Negeri Malang, replacing manual paperwork with automated record-keeping.",
      myRole:
        "Contributed to end-to-end development across frontend views and backend CRUD controllers, database schema design, and administrative validation modules.",
      keyFeatures: [
        "Centralized equipment inventory and hardware condition monitoring",
        "Laboratory schedule booking for practicum sessions and research",
        "Administrative reporting and activity log generation",
        "Secure user authentication with administrative approval tiers"
      ]
    },
    waste2worth: {
      title: "Waste2Worth",
      subtitle: "Automated Waste Segregation & Circular Economy Platform",
      type: "Business IT Competition Innovation • 2nd Place Winner",
      tech: ["Business Process Modeling", "IoT Architecture", "System Design"],
      github: "https://github.com/Ailsasahda13",
      summary:
        "Waste2Worth is an award-winning innovation presented at Politeknik Negeri Malang's Business IT Competition. It designs an automated smart waste collection system integrated with a circular economy incentive model, motivating citizens to segregate waste at source.",
      myRole:
        "Conceptualized system business model, mapped technical architecture, and presented the feasibility study leading to 2nd Place award in the competition.",
      keyFeatures: [
        "Automated waste segregation concept utilizing smart sorting sensors",
        "Circular economy reward tokenization for participating households",
        "Recycling vendor integration and supply chain tracking",
        "Comprehensive Business Model Canvas and feasibility analysis"
      ]
    }
  };

  // Open Project Detail Modal
  openProjectDetailBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const projectKey = btn.getAttribute("data-project");
      const data = projectData[projectKey];

      if (!data) return;

      const titleEl = document.getElementById("projectModalTitle");
      const bodyEl = document.getElementById("projectModalBody");

      titleEl.textContent = data.title;
      bodyEl.innerHTML = `
        <div style="margin-bottom: 20px;">
          <span style="font-size: 0.76rem; font-weight: 700; color: #6F8265; text-transform: uppercase; letter-spacing: 1px;">${data.type}</span>
          <h4 style="font-size: 1.2rem; color: #4F252C; margin-top: 4px; margin-bottom: 12px;">${data.subtitle}</h4>
          <p style="font-size: 0.94rem; color: #4E3B3F; line-height: 1.7; margin-bottom: 18px;">${data.summary}</p>
        </div>

        <div style="background-color: #FFFFFF; border: 1px solid rgba(116,61,69,0.12); border-radius: 12px; padding: 18px; margin-bottom: 20px;">
          <h5 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.8px; color: #743D45; margin-bottom: 8px;">My Key Contribution:</h5>
          <p style="font-size: 0.9rem; color: #2F1E22; line-height: 1.6; margin: 0;">${data.myRole}</p>
        </div>

        <div style="margin-bottom: 22px;">
          <h5 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.8px; color: #743D45; margin-bottom: 10px;">Key Features & Architecture:</h5>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
            ${data.keyFeatures.map((f) => `<li style="font-size: 0.88rem; color: #4E3B3F; display: flex; gap: 8px;"><span style="color: #743D45; font-weight: bold;">✔</span> ${f}</li>`).join("")}
          </ul>
        </div>

        <div style="margin-bottom: 24px;">
          <h5 style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.8px; color: #743D45; margin-bottom: 10px;">Tech Stack:</h5>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${data.tech.map((t) => `<span style="background-color: #F8F4EC; border: 1px solid rgba(116,61,69,0.15); padding: 5px 12px; border-radius: 9999px; font-size: 0.78rem; font-weight: 600; color: #2F1E22;">${t}</span>`).join("")}
          </div>
        </div>

        <div style="display: flex; gap: 12px; padding-top: 16px; border-top: 1px solid rgba(116,61,69,0.12);">
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-card-primary" style="text-decoration: none;">
            View Source Code on GitHub ↗
          </a>
        </div>
      `;

      openModal(projectModal);
    });
  });

  if (closeProjectBtn) {
    closeProjectBtn.addEventListener("click", () => closeModal(projectModal));
  }

  // Close modals on clicking overlay backdrop
  [certModal, projectModal, cvModal].forEach((modal) => {
    if (!modal) return;
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Close modals on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(certModal);
      closeModal(projectModal);
      closeModal(cvModal);
    }
  });

  // Copy Credential ID button handler
  const copyCredBtn = document.getElementById("copyCredBtn");
  if (copyCredBtn) {
    copyCredBtn.addEventListener("click", () => {
      const credId = "eUwsiC_ATUSGWiwKppuSPg";
      navigator.clipboard.writeText(credId).then(() => {
        const origText = copyCredBtn.textContent;
        copyCredBtn.textContent = "Copied to Clipboard! ✓";
        setTimeout(() => {
          copyCredBtn.textContent = origText;
        }, 2500);
      });
    });
  }
});
