// ---------- splash overlay cleanup ----------
const splash = document.getElementById("splash-overlay");
if (splash) {
    splash.addEventListener("animationend", () => splash.remove());
}
