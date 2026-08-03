/* ── Auth Actions ── */
function logoutUser() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';   // back to landing, no login
}

function switchUser() {
    localStorage.removeItem('currentUser');
    window.location.href = 'signin.html';   // go to login page
}




/* ── Load Current User ── */
var currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
    document.getElementById('profileName').textContent = 'Hi, ' + currentUser.name;
    document.getElementById('profileRole').textContent = currentUser.role || 'Student';
}









/* ── Rotating Text ── */
var phrases = [
    ["Manage", "Student Profiles"],
    ["Track", "Academic Progress"],
    ["View", "Semester Wrapped"],
    ["Predict", "Career Paths"],
    ["Export", "Profile Cards"],
    ["Filter by", "Skills"],
    ["Earn", "Performance Badges"],
    ["Compare", "Student Growth"],
    ["Discover", "Top Performers"],
    ["Monitor", "Skill Development"],
    ["Unlock", "Student Insights"]
];

var currentIndex = 0;
var topEl = document.getElementById("topText");
var bottomEl = document.getElementById("bottomText");

function showPhrase(index) {
    topEl.textContent = phrases[index][0];
    bottomEl.textContent = phrases[index][1];
}




function changeText() {
    topEl.classList.remove("visible");
    topEl.classList.add("hidden");
    bottomEl.classList.remove("visible");
    bottomEl.classList.add("hidden");

    setTimeout(function () {
        currentIndex = (currentIndex + 1) % phrases.length;
        showPhrase(currentIndex);
        topEl.classList.remove("hidden");
        topEl.classList.add("visible");
        bottomEl.classList.remove("hidden");
        bottomEl.classList.add("visible");
    }, 500);
}

if (topEl && bottomEl) {
    showPhrase(0);
    setInterval(changeText, 3000);
}

/* ── 3D Shot ── */
const shotStage = document.getElementById("shotStage");
const shotGlare = document.getElementById("shotGlare");

if (shotStage) {
    const BASE_RX = 4;    // resting tilt, degrees
    const BASE_RY = -8;
    const MAX_SWING = 6;  // extra degrees the pointer can add
    const MAX_SINK = 10;  // px, how far the pressed corner drops

    const resetStage = () => {
        shotStage.style.setProperty("--rx", `${BASE_RX}deg`);
        shotStage.style.setProperty("--ry", `${BASE_RY}deg`);
        shotStage.style.setProperty("--tz", "0px");
        if (shotGlare) shotGlare.style.setProperty("--glare-o", "0");
    };

    resetStage();

    shotStage.addEventListener("mousemove", (e) => {
        const rect = shotStage.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;  // -1 left  -> 1 right
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;  // -1 top   -> 1 bottom

        const rx = (BASE_RX + ny * -MAX_SWING).toFixed(2);
        const ry = (BASE_RY + nx * MAX_SWING).toFixed(2);

        const proximity = Math.max(Math.abs(nx), Math.abs(ny)); // 0 center -> 1 corner
        const tz = (-proximity * MAX_SINK).toFixed(2);

        shotStage.style.setProperty("--rx", `${rx}deg`);
        shotStage.style.setProperty("--ry", `${ry}deg`);
        shotStage.style.setProperty("--tz", `${tz}px`);

        if (shotGlare) {
            shotGlare.style.setProperty("--gx", `${((nx + 1) / 2) * 100}%`);
            shotGlare.style.setProperty("--gy", `${((ny + 1) / 2) * 100}%`);
            shotGlare.style.setProperty("--glare-o", "1");
        }
    });

    shotStage.addEventListener("mouseleave", resetStage);
}







