import * as React from "react";

export default function HeaderNav() {
  React.useEffect(() => {
    const mm = window.matchMedia("(max-width: 768px)");
    const drawer = document.getElementById("navSidebar");
    const overlay = document.querySelector<HTMLDivElement>(".nav-overlay");
    const closeButton = document.querySelector<HTMLButtonElement>(".nav-close");
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-sidebar .nav-link");
    const contactLink = document.querySelector<HTMLAnchorElement>(".nav-sidebar .nav-link-contact");

    const open = () => {
      if (!mm.matches) return;
      drawer?.classList.add("active");    // this CSS opens with .active
      if (overlay) overlay.style.display = "block";
      document.documentElement.style.overflow = "hidden";
    };
    const close = () => {
      drawer?.classList.remove("active");
      if (overlay) overlay.style.display = "none";
      document.documentElement.style.overflow = "";
    };

    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onEsc);

    // Here it closes if not mobile
    const onChange = (e: MediaQueryListEvent) => { if (!e.matches) close(); };
    mm.addEventListener?.("change", onChange);

    // Click in overlay to close
    overlay?.addEventListener("click", close);

    // Click on close button (X) to close
    closeButton?.addEventListener("click", close);

    // Click on nav links to close
    navLinks.forEach(link => {
      link.addEventListener("click", close);
    });

    // Handle contact link - close and trigger contact event
    const handleContactClick = (e: MouseEvent) => {
      e.preventDefault();
      close();
      dispatchEvent(new CustomEvent('open-contact'));
    };
    contactLink?.addEventListener("click", handleContactClick);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", onEsc);
      mm.removeEventListener?.("change", onChange);
      overlay?.removeEventListener("click", close);
      closeButton?.removeEventListener("click", close);
      navLinks.forEach(link => {
        link.removeEventListener("click", close);
      });
      contactLink?.removeEventListener("click", handleContactClick);
    };
  }, []);

  const handleOpen = () => {
    const click = new CustomEvent("open-mobile-menu"); // optional
    window.dispatchEvent(click);
    // opens directly:
    const drawer = document.getElementById("navSidebar");
    const overlay = document.querySelector<HTMLDivElement>(".nav-overlay");
    const mm = window.matchMedia("(max-width: 768px)");
    if (!mm.matches) return;
    drawer?.classList.add("active");
    if (overlay) overlay.style.display = "block";
    document.documentElement.style.overflow = "hidden";
  };

  return (
    <button
      className="mobile-menu-toggle"
      aria-label="Abrir menú"
      onClick={handleOpen}
    >
      <i className="fa-solid fa-bars" />
    </button>
  );
}
