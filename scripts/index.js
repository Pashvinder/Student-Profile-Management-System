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

