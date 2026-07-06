(function () {
  const KEY = "sabiPreferredView266Z";
  const root = document.documentElement;
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("view");
  const saved = localStorage.getItem(KEY);
  const isPhone = window.matchMedia("(max-width: 820px)").matches;

  function apply(view) {
    const next = view === "desktop" ? "desktop" : "mobile";
    root.setAttribute("data-sabi-view", next);
    localStorage.setItem(KEY, next);
  }

  if (requested === "desktop" || requested === "pc") {
    apply("desktop");
  } else if (requested === "mobile") {
    apply("mobile");
  } else if (saved === "desktop" || saved === "mobile") {
    apply(saved);
  } else {
    apply(isPhone ? "mobile" : "desktop");
  }

  document.addEventListener("click", function (event) {
    const button = event.target.closest("[data-sabi-view]");
    if (!button) return;
    const view = button.getAttribute("data-sabi-view");
    apply(view);
  });
})();
