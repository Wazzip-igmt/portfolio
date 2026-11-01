/* Interações progressivas, sem dependências e compatíveis com abertura local. */
(() => {
  "use strict";

  const root = document.documentElement;
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#navigation");

  if (menuButton && navigation) {
    const closeMenu = () => {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.querySelector(".menu-label").textContent = "Menu";
    };

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      navigation.classList.toggle("is-open", !isOpen);
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.querySelector(".menu-label").textContent = isOpen ? "Menu" : "Fechar";
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menuButton.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".site-header")) closeMenu();
    });
    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });
    window.matchMedia("(min-width: 851px)").addEventListener("change", closeMenu);
    root.classList.add("js");
  }

  // Os dados ainda não informados ficam visíveis como texto, nunca como links falsos.
  const config = window.PORTFOLIO_CONFIG || {};
  const allowedHosts = {
    linkedin: ["www.linkedin.com", "linkedin.com"],
    imcRepository: ["github.com"],
    swingRepository: ["github.com"]
  };

  let hasAdditionalContact = false;
  document.querySelectorAll("[data-config-link]").forEach((placeholder) => {
    const key = placeholder.dataset.configLink;
    const value = String(config[key] || "").trim();
    if (!value) return;

    let href;
    if (key === "email") {
      if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value) || /[?&#]/.test(value)) return;
      href = `mailto:${value}`;
    } else {
      try {
        const url = new URL(value);
        if (url.protocol !== "https:" || url.username || url.password) return;
        if (!allowedHosts[key]?.includes(url.hostname) || url.pathname === "/") return;
        href = url.href;
      } catch {
        return;
      }
    }

    const link = document.createElement("a");
    link.className = placeholder.className;
    link.classList.remove("channel-pending", "pending-link");
    link.href = href;
    if (key !== "email") {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    if (placeholder.dataset.linkLabel) {
      link.classList.add("text-link");
      const label = document.createElement("span");
      label.textContent = placeholder.dataset.linkLabel;
      const arrow = document.createElement("span");
      arrow.textContent = "↗";
      arrow.setAttribute("aria-hidden", "true");
      link.append(label, arrow);
    } else {
      link.append(...Array.from(placeholder.childNodes));
      const handle = link.querySelector(".channel-handle");
      if (handle) handle.textContent = key === "email" ? value : "Ver perfil";
      const arrow = link.querySelector(".channel-go");
      if (arrow) arrow.textContent = key === "email" ? "→" : "↗";
    }
    placeholder.replaceWith(link);
    if (key === "email" || key === "linkedin") hasAdditionalContact = true;
  });

  if (hasAdditionalContact) {
    const contactNote = document.querySelector(".paper-footnote");
    if (contactNote) {
      contactNote.textContent = "Além do GitHub, você pode usar os canais de contato disponíveis nesta página.";
    }
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const motionButton = document.querySelector(".motion-toggle");
  let manuallyPaused = false;
  try {
    manuallyPaused = localStorage.getItem("wazzip-motion-paused") === "true";
  } catch { /* Preferência opcional quando o armazenamento está bloqueado. */ }

  const hero = document.querySelector(".hero");
  const wordLayer = document.querySelector(".parallax-word");
  const photoLayer = document.querySelector(".parallax-photo");
  const target = { x: 0, y: 0, scroll: 0 };
  const current = { x: 0, y: 0, scroll: 0 };
  let frame = 0;
  const motionIsAllowed = () => !reducedMotion.matches && !manuallyPaused;

  function resetParallax() {
    cancelAnimationFrame(frame);
    frame = 0;
    for (const key of Object.keys(target)) target[key] = current[key] = 0;
    if (wordLayer) wordLayer.style.removeProperty("transform");
    if (photoLayer) photoLayer.style.removeProperty("transform");
  }

  function syncMotion() {
    const paused = !motionIsAllowed();
    root.classList.toggle("motion-paused", paused);
    if (motionButton) {
      motionButton.hidden = false;
      motionButton.setAttribute("aria-pressed", String(paused));
      motionButton.disabled = reducedMotion.matches;
      motionButton.querySelector("span").textContent = reducedMotion.matches
        ? "Movimento reduzido pelo sistema"
        : paused ? "Retomar animações" : "Pausar animações";
    }
    if (paused) resetParallax();
  }

  motionButton?.addEventListener("click", () => {
    manuallyPaused = !manuallyPaused;
    try {
      localStorage.setItem("wazzip-motion-paused", String(manuallyPaused));
    } catch { /* O controle continua funcional sem persistência. */ }
    syncMotion();
  });
  reducedMotion.addEventListener("change", syncMotion);
  finePointer.addEventListener("change", resetParallax);
  syncMotion();

  // Revela uma única vez. Sem suporte ou sem JavaScript, o conteúdo já está visível.
  if ("IntersectionObserver" in window && motionIsAllowed()) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });

    document.querySelectorAll(".reveal").forEach((element) => {
      element.setAttribute("data-pending", "");
      observer.observe(element);
    });
  }

  // Parallax do original: apenas camadas decorativas e somente com mouse.
  if (hero && wordLayer && photoLayer) {
    function tick() {
      // Sincroniza também o controle caso a preferência mude durante um frame.
      if (!motionIsAllowed()) {
        syncMotion();
        return;
      }
      if (!finePointer.matches || document.hidden) {
        resetParallax();
        return;
      }
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      current.scroll += (target.scroll - current.scroll) * 0.12;
      wordLayer.style.transform = `translate3d(${-current.x * 26}px, ${-current.y * 10}px, 0)`;
      photoLayer.style.transform = `translate3d(${current.x * 18}px, ${current.y * 10 + current.scroll * 24}px, 0)`;
      const settled = Object.keys(target).every((key) => Math.abs(target[key] - current[key]) < 0.001);
      frame = settled ? 0 : requestAnimationFrame(tick);
    }

    function start() {
      if (motionIsAllowed() && finePointer.matches && !frame && !document.hidden) {
        frame = requestAnimationFrame(tick);
      }
    }

    hero.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse" || !finePointer.matches) return;
      const rect = hero.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      start();
    });
    hero.addEventListener("pointerleave", () => {
      target.x = target.y = 0;
      start();
    });
    window.addEventListener("scroll", () => {
      if (window.scrollY > hero.offsetHeight) return;
      target.scroll = Math.min(Math.max(window.scrollY / hero.offsetHeight, 0), 1);
      start();
    }, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) resetParallax();
    });
  }
})();
