// ================= NAVBAR =================
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

// ---- Icon-Rail Mobile Nav ----
const railItems = [
  {
    href: "index.html",
    label: "Home",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9.75L12 3l9 6.75V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.75z"/>
      <path d="M9 22V12h6v10"/>
    </svg>`,
  },
  {
    href: "about.html",
    label: "About Us",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>`,
  },
  {
    href: "voice.html",
    label: "Voice Termination",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>`,
  },
  {
    href: "sms.html",
    label: "A2P SMS Termination",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      <path d="M8 9h8M8 13h5"/>
    </svg>`,
  },
  {
    href: "contact.html",
    label: "Contact Us",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>`,
  },
];

// Build the icon rail element
const rail = document.createElement("nav");
rail.className = "icon-rail";
rail.id = "iconRail";
rail.setAttribute("aria-label", "Mobile navigation");

// Close button
const closeBtn = document.createElement("button");
closeBtn.className = "icon-rail-close";
closeBtn.setAttribute("aria-label", "Close menu");
closeBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

// Header: logo + close button
const railHead = document.createElement("div");
railHead.className = "icon-rail-head";
railHead.innerHTML = `<a href="index.html" class="icon-rail-logo logo" aria-label="Omaginfo LLC home"><img src="assets/images/Omag_Logo.png" alt="Omaginfo LLC" class="logo-img" style="height: 80px !important; max-height: 80px !important; width: auto !important; object-fit: contain !important; display: block !important;" /></a>`;
railHead.appendChild(closeBtn);
rail.appendChild(railHead);

// Nav items wrapper
const railList = document.createElement("div");
railList.className = "icon-rail-list";
rail.appendChild(railList);

// Nav items
railItems.forEach(({ href, label, icon }) => {
  const a = document.createElement("a");
  a.href = href;
  a.className = "icon-rail-item";
  a.setAttribute("data-label", label);
  a.setAttribute("aria-label", label);
  a.innerHTML = `${icon}<span class="icon-rail-label">${label}</span><span class="icon-rail-go" aria-hidden="true">→</span>`;
  railList.appendChild(a);
});

// Update active states
const updateRailActive = () => {
  const currentPath = location.pathname.split("/").pop() || "index.html";

  rail.querySelectorAll("a.icon-rail-item").forEach((a) => {
    const href = a.getAttribute("href");
    const [path] = href.split("#");
    const targetPath = path || "index.html";
    const isActive = targetPath === currentPath || (currentPath === "" && targetPath === "index.html");
    a.classList.toggle("active", isActive);
  });
};
updateRailActive();
window.addEventListener("hashchange", updateRailActive);


// Scrim
const railScrim = document.createElement("div");
railScrim.className = "icon-rail-scrim";
railScrim.id = "iconRailScrim";

document.body.appendChild(railScrim);
document.body.appendChild(rail);

// Toggle logic
const setRail = (open) => {
  rail.classList.toggle("open", open);
  railScrim.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
  if (hamburger) {
    hamburger.setAttribute("aria-expanded", open);
    hamburger.classList.toggle("open", open);
  }
};

if (hamburger) {
  hamburger.addEventListener("click", () => setRail(!rail.classList.contains("open")));
}
closeBtn.addEventListener("click", () => setRail(false));
railScrim.addEventListener("click", () => setRail(false));

// Click handling: close drawer on item click
rail.querySelectorAll("a.icon-rail-item").forEach((a) =>
  a.addEventListener("click", () => {
    setRail(false);
  })
);

document.addEventListener("keydown", (e) => { if (e.key === "Escape") setRail(false); });
window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => { if (e.matches) setRail(false); });


// Services dropdown: hover on desktop, toggle on click, and close on click
document.querySelectorAll(".nav-dd").forEach((dd) => {
  const toggle = dd.querySelector(".dd-toggle");
  const servicesLink = dd.querySelector(".dd-row > a");
  const menu = dd.querySelector(".dd-menu");
  let hoverSuppressed = false;

  const openDropdown = () => {
    dd.classList.add("open");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
  };

  const closeDropdown = () => {
    dd.classList.remove("open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.blur();
    }
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (dd.classList.contains("open")) {
      closeDropdown();
      hoverSuppressed = true;
    } else {
      hoverSuppressed = false;
      openDropdown();
    }
  };

  // Click on the arrow toggle button toggles dropdown
  if (toggle) toggle.addEventListener("click", toggleDropdown);

  // Desktop hover interactions
  dd.addEventListener("mouseenter", () => {
    if (!hoverSuppressed) {
      openDropdown();
    }
  });

  dd.addEventListener("mouseleave", () => {
    hoverSuppressed = false;
    closeDropdown();
  });

  // Close when any dropdown item is clicked
  if (menu) {
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeDropdown();
        hoverSuppressed = false;
      });
    });
  }

  // Close on Escape key
  dd.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDropdown();
      hoverSuppressed = false;
      if (toggle) toggle.focus();
    }
  });

  // Close when clicking anywhere outside
  document.addEventListener("click", (e) => {
    if (!dd.contains(e.target)) {
      closeDropdown();
      hoverSuppressed = false;
    }
  });
});

// sticky style on scroll
const spySections = [...document.querySelectorAll("[data-nav]")];
const spyLinks = [...document.querySelectorAll('.nav-links > a, .dd-row > a')];
const onScroll = () => {
  const y = window.scrollY;
  if (navbar) navbar.classList.toggle("scrolled", y > 20);
  if (spySections.length > 1) {
    let current = spySections[0]?.dataset.nav;
    spySections.forEach((s) => { if (y >= s.offsetTop - 160) current = s.dataset.nav; });
    if (window.innerHeight + y >= document.body.scrollHeight - 4) current = spySections.at(-1)?.dataset.nav;
    spyLinks.forEach((a) => {
      const href = a.getAttribute("href");
      if (href && href.startsWith("#")) {
        a.classList.toggle("active", href === "#" + current);
      }
    });
  }
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ================= REVEAL =================
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      io.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => {
  const sibs = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
  el.style.transitionDelay = `${Math.min(sibs.indexOf(el), 5) * 110}ms`;
  el.addEventListener("transitionend", () => { el.style.transitionDelay = ""; }, { once: true });
  io.observe(el);
});

// scroll progress bar
const scrollBar = document.getElementById("scrollBar");
const updateBar = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  if (scrollBar) scrollBar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
};
window.addEventListener("scroll", updateBar, { passive: true });
updateBar();

// ================= HERO PARALLAX =================
const finePointer = window.matchMedia("(pointer: fine)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (finePointer && !reduceMotion) {
  document.querySelectorAll(".hero-art").forEach((heroArt) => {
    const layers = heroArt.querySelectorAll("[data-depth]");
    const hero = heroArt.closest(".hero");
    hero.addEventListener("mousemove", (e) => {
      const r = heroArt.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      layers.forEach((layer) => {
        const d = parseFloat(layer.dataset.depth);
        layer.style.transform = `translate(${x * d}px, ${y * d}px)`;
      });
    });
    hero.addEventListener("mouseleave", () => layers.forEach((l) => (l.style.transform = "")));
  });
}

// ================= CONTACT FORM =================
const form = document.getElementById("contactForm");
if (form) {
  const seg = document.getElementById("seg");
  const msg = document.getElementById("formMsg");
  const labels = { voice: "Voice / VoIP", sms: "SMS", partnership: "Partnership", general: "General" };
  let enquiryType = "voice";

  const setType = (type) => {
    if (!labels[type]) return;
    enquiryType = type;
    seg.querySelectorAll("button").forEach((b) => {
      const on = b.dataset.type === type;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on);
    });
  };

  // pre-select from ?type=voice|sms|partnership|general
  const params = new URLSearchParams(window.location.search);
  setType((params.get("type") || "voice").toLowerCase());

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-enquiry]");
    if (link) setType(link.dataset.enquiry);
  });

  seg.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (btn) setType(btn.dataset.type);
  });

  const rules = {
    name: (v) => v.trim().length >= 2,
    company: (v) => v.trim().length >= 2,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    phone: (v) => {
      const trimmed = v.trim();
      const digits = trimmed.replace(/\D/g, "");
      return /^[+\d\s().-]{6,25}$/.test(trimmed) && digits.length >= 6;
    },
    message: (v) => v.trim().length >= 5,
  };

  const updateFieldValidation = (input) => {
    const field = input.closest(".field");
    if (!field || !rules[input.id]) return true;
    const val = input.value;
    const ok = rules[input.id](val);
    field.classList.toggle("error", !ok);
    input.setAttribute("aria-invalid", !ok);

    const hint = field.querySelector(".hint");
    if (hint && input.id === "phone") {
      if (val.trim() === "") {
        hint.textContent = "Please enter your phone number.";
      } else if (!ok) {
        hint.textContent = "Please enter a valid phone number (min 6 digits).";
      } else {
        hint.textContent = "Please enter your phone number.";
      }
    }
    return ok;
  };

  // once a field has been flagged, re-check it as the visitor types and
  // hide the summary message as soon as no field is flagged any more
  const clearIfFixed = () => {
    if (msg.classList.contains("err") && !form.querySelector(".field.error, .consent.error")) {
      msg.className = "form-msg";
      msg.textContent = "";
    }
  };
  form.addEventListener("input", (e) => {
    const input = e.target;
    const field = input.closest(".field");
    if (field && rules[input.id] && field.classList.contains("error")) {
      updateFieldValidation(input);
    }
    clearIfFixed();
  });
  form.querySelector("#consent").addEventListener("change", (e) => {
    if (e.target.checked) e.target.closest(".consent").classList.remove("error");
    clearIfFixed();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form.querySelector(".hp input").value) return; // honeypot: silently drop bots

    let valid = true;
    Object.keys(rules).forEach((id) => {
      const input = document.getElementById(id);
      if (input) {
        const ok = updateFieldValidation(input);
        if (!ok) valid = false;
      }
    });
    const consent = document.getElementById("consent");
    consent.closest(".consent").classList.toggle("error", !consent.checked);
    if (!consent.checked) valid = false;

    if (valid) {
      msg.className = "form-msg";
      msg.textContent = "";
    } else {
      msg.className = "form-msg err";
      msg.textContent = "Please check the highlighted fields.";
      form.querySelector(".error input, .error textarea")?.focus();
      return;
    }

    const val = (id) => document.getElementById(id).value.trim();
    const data = {
      type: labels[enquiryType],
      name: val("name"),
      company: val("company"),
      email: val("email"),
      phone: val("phone"),
      message: val("message"),
    };
    const subject = `[${data.type}] Website enquiry from ${data.company}`;

    // If a form handler URL is set on the form (data-endpoint), post to it.
    // Otherwise fall back to opening the visitor's email app, addressed to info@omaginfo.com.
    const endpoint = form.dataset.endpoint;
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: form.querySelector('input[name="access_key"]').value,
            subject,
            from_name: "Omaginfo Website",
            ...data,
          }),
        });
        const result = await res.json();
        if (!res.ok || !result.success) throw new Error(result.message || res.status);
        msg.className = "form-msg ok";
        msg.textContent = "Thank you. Your enquiry has been sent — our team will be in touch.";
      } else {
        const body = [
          `Enquiry type: ${data.type}`,
          `Name: ${data.name}`,
          `Company: ${data.company}`,
          `Email: ${data.email}`,
          data.phone ? `Phone: ${data.phone}` : "",
          "",
          data.message,
        ].filter((l, i) => l !== "" || i === 5).join("\n");
        window.location.href = `mailto:info@omaginfo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        msg.className = "form-msg ok";
        msg.textContent = "Thank you. Your email app should open with the enquiry ready to send to info@omaginfo.com.";
      }
      form.reset();
      setType(enquiryType);
    } catch (err) {
      msg.className = "form-msg err";
      msg.textContent = "Sorry, something went wrong. Please email us at info@omaginfo.com.";
    }
  });
}

// ================= FOOTER ACCORDION (MOBILE) =================
document.querySelectorAll(".footer-col[data-accordion]").forEach((col) => {
  const head = col.querySelector(".footer-col-head");
  if (!head) return;
  head.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      const isOpen = col.classList.contains("open");
      col.classList.toggle("open", !isOpen);
      head.setAttribute("aria-expanded", String(!isOpen));
    }
  });
});

// Close all mobile accordions when resizing up to desktop
window.matchMedia("(min-width: 769px)").addEventListener("change", (e) => {
  if (e.matches) {
    document.querySelectorAll(".footer-col[data-accordion]").forEach((col) => {
      col.classList.remove("open");
      col.querySelector(".footer-col-head")?.setAttribute("aria-expanded", "false");
    });
  }
});

// ================= FOOTER YEAR =================
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();


