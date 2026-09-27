(() => {
  "use strict";
  document.documentElement.classList.add("js");

  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("#site-menu");
  if (menuToggle && menu) {
    const closeMenu = (restoreFocus = false) => {
      menu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      if (restoreFocus) menuToggle.focus();
    };
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") !== "true";
      menu.classList.toggle("is-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
    });
    menu
      .querySelectorAll("a")
      .forEach((link) => link.addEventListener("click", () => closeMenu()));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("is-open"))
        closeMenu(true);
    });
    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target) && !menuToggle.contains(event.target))
        closeMenu();
    });
    window
      .matchMedia("(min-width: 901px)")
      .addEventListener("change", (event) => {
        if (event.matches) closeMenu();
      });
  }

  const galleryItems = [...document.querySelectorAll("[data-gallery-item]")];
  const galleryModal = document.querySelector("[data-gallery-modal]");
  if (galleryModal && galleryItems.length) {
    const image = galleryModal.querySelector("[data-gallery-modal-image]");
    const caption = galleryModal.querySelector("[data-gallery-modal-caption]");
    const position = galleryModal.querySelector("[data-gallery-position]");
    const count = document.querySelector("[data-gallery-count]");
    let activeItems = galleryItems;
    let currentIndex = 0;
    let openedFrom = null;

    const renderPhoto = () => {
      const item = activeItems[currentIndex];
      image.src = item.dataset.gallerySrc;
      image.alt = item.dataset.galleryAlt;
      caption.textContent = item.dataset.galleryAlt;
      position.textContent = ` · ${currentIndex + 1} of ${activeItems.length}`;
    };
    const changePhoto = (direction) => {
      currentIndex =
        (currentIndex + direction + activeItems.length) % activeItems.length;
      renderPhoto();
    };
    galleryItems.forEach((item) =>
      item.addEventListener("click", () => {
        openedFrom = item;
        currentIndex = activeItems.indexOf(item);
        renderPhoto();
        galleryModal.showModal();
        document.body.classList.add("modal-open");
      }),
    );
    galleryModal
      .querySelector("[data-gallery-close]")
      .addEventListener("click", () => galleryModal.close());
    galleryModal
      .querySelector("[data-gallery-prev]")
      .addEventListener("click", () => changePhoto(-1));
    galleryModal
      .querySelector("[data-gallery-next]")
      .addEventListener("click", () => changePhoto(1));
    galleryModal.addEventListener("click", (event) => {
      if (event.target !== galleryModal) return;
      const bounds = galleryModal.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      )
        galleryModal.close();
    });
    galleryModal.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        const buttons = galleryModal.querySelectorAll("button:not([disabled])");
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        changePhoto(event.key === "ArrowLeft" ? -1 : 1);
      }
    });
    galleryModal.addEventListener("close", () => {
      document.body.classList.remove("modal-open");
      image.removeAttribute("src");
      openedFrom?.focus();
    });
    document.querySelectorAll("[data-gallery-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.dataset.galleryFilter;
        document.querySelectorAll("[data-gallery-filter]").forEach((filter) => {
          filter.setAttribute("aria-pressed", String(filter === button));
        });
        galleryItems.forEach((item) => {
          item.hidden =
            category !== "all" && item.dataset.category !== category;
        });
        activeItems = galleryItems.filter((item) => !item.hidden);
        count.textContent = `${activeItems.length} photo${activeItems.length === 1 ? "" : "s"}`;
      });
    });
  }

  const roomField = document.querySelector("#room_preference");
  if (roomField) {
    const rooms = { regular: "Regular Bedroom", master: "Master Bedroom" };
    const room = new URLSearchParams(window.location.search).get("room");
    if (Object.hasOwn(rooms, room)) roomField.value = rooms[room];
  }

  // Header shadow and the phone apply bar both key off scroll position.
  const header = document.querySelector("[data-header]");
  const mobileCta = document.querySelector("[data-mobile-cta]");
  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > 8);
    if (mobileCta) {
      const nearEnd =
        window.innerHeight + y > document.documentElement.scrollHeight - 320;
      mobileCta.classList.toggle("is-visible", y > 420 && !nearEnd);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Fade sections in as they enter the viewport.
  const revealTargets = document.querySelectorAll(
    "main > section:not(:first-child), main > .quick-facts",
  );
  if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    revealTargets.forEach((node) => {
      const box = node.getBoundingClientRect();
      if (box.top < window.innerHeight) return;
      node.classList.add("reveal");
      observer.observe(node);
    });
  }

  // Open a FAQ answer when linked to directly (faqs.html#utilities).
  const openFaqFromHash = () => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id && document.getElementById(id);
    if (target instanceof HTMLDetailsElement) target.open = true;
  };
  openFaqFromHash();
  window.addEventListener("hashchange", openFaqFromHash);

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
})();
