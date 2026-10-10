(() => {
  "use strict";

  const body = document.body;
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-button]");
  const nav = document.querySelector("[data-nav]");
  const page = body.dataset.page;

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-nav-page]").forEach((link) => {
    if (link.dataset.navPage === page) link.setAttribute("aria-current", "page");
  });

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelector(".sr-only").textContent = "Open menu";
    nav.classList.remove("nav-open");
    body.classList.remove("menu-open");
  };

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.querySelector(".sr-only").textContent = open ? "Close menu" : "Open menu";
      nav.classList.toggle("nav-open", open);
      body.classList.toggle("menu-open", open);
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => { if (window.innerWidth > 900) closeMenu(); });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && body.classList.contains("menu-open")) closeMenu();
  });

  const backToTop = document.querySelector("[data-back-top]");
  const updateScrollState = () => {
    const moved = window.scrollY > 55;
    if (header && header.classList.contains("header-overlay")) header.classList.toggle("is-scrolled", moved);
    if (backToTop) backToTop.classList.toggle("show", window.scrollY > 620);
  };
  window.addEventListener("scroll", updateScrollState, { passive: true });
  updateScrollState();
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const revealItems = document.querySelectorAll(".reveal:not(.is-visible)");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const lightbox = document.querySelector("[data-lightbox-dialog]");
  const lightboxImage = document.querySelector("[data-lightbox-image]");
  const lightboxCaption = document.querySelector("[data-lightbox-caption]");
  const lightboxClose = document.querySelector("[data-lightbox-close]");

  document.querySelectorAll("[data-lightbox]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!lightbox || !lightboxImage || !lightboxCaption) return;
      const caption = button.dataset.caption || "Hero House project";
      lightboxImage.src = button.dataset.lightbox;
      lightboxImage.alt = caption;
      lightboxCaption.textContent = caption;
      lightbox.showModal();
    });
  });
  lightboxClose?.addEventListener("click", () => lightbox.close());
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });

  const form = document.querySelector("[data-contact-form]");
  if (form) {
    const status = form.querySelector("[data-form-status]");
    const validate = () => {
      let valid = true;
      form.querySelectorAll("input[type='text'], input[type='email'], textarea").forEach((field) => {
        const fieldValid = field.value.trim() !== "" && (field.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value));
        field.classList.toggle("invalid", !fieldValid);
        field.closest("label").querySelector(".field-error")?.classList.toggle("show", !fieldValid);
        if (!fieldValid) valid = false;
      });
      const interest = form.querySelector("input[name='interest']:checked");
      form.querySelector(".choice-error")?.classList.toggle("show", !interest);
      return valid && Boolean(interest);
    };

    form.querySelectorAll("input, textarea").forEach((field) => {
      field.addEventListener("input", () => {
        field.classList.remove("invalid");
        field.closest("label")?.querySelector(".field-error")?.classList.remove("show");
      });
      field.addEventListener("change", () => form.querySelector(".choice-error")?.classList.remove("show"));
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validate()) {
        status.textContent = "Please complete the highlighted fields.";
        form.querySelector(".invalid")?.focus();
        return;
      }
      const data = new FormData(form);
      const name = `${data.get("firstName")} ${data.get("lastName")}`;
      const subject = `Hero House inquiry — ${data.get("interest")}`;
      const message = [
        `Name: ${name}`,
        `Email: ${data.get("email")}`,
        `Interest: ${data.get("interest")}`,
        "",
        String(data.get("message"))
      ].join("\n");
      status.textContent = "Opening your email app with this inquiry…";
      window.location.href = `mailto:hello@terravistahomes.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    });
  }
})();
