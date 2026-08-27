/* ── Auth Actions ── */

function logoutUser() {

    localStorage.removeItem("currentUser");

    window.location.href = "index.html";

}


function switchUser() {

    localStorage.removeItem("currentUser");

    window.location.href = "signin.html";

}


/* ── Load Current User ── */

var currentUser = null;

try {

    currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

} catch (error) {

    currentUser = null;

}


if (currentUser) {

    var profileName =
        document.getElementById("profileName");

    var profileRole =
        document.getElementById("profileRole");


    if (profileName) {

        profileName.textContent =
            "Hi, " + currentUser.name;

    }


    if (profileRole) {

        profileRole.textContent =
            currentUser.role || "Student";

    }

}


/* ── Admin Authentication ── */

function checkAdmin(event) {

    var storedUser =
        localStorage.getItem("currentUser");


    /* No current user */

    if (!storedUser) {

        event.preventDefault();

        window.location.href =
            "unauthorise.html";

        return;

    }


    var user;

    try {

        user = JSON.parse(storedUser);

    } catch (error) {

        event.preventDefault();

        window.location.href =
            "unauthorise.html";

        return;

    }


    /* User is not admin */

    if (
        !user ||
        user.role !== "admin"
    ) {

        event.preventDefault();

        window.location.href =
            "unauthorise.html";

        return;

    }

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

var topEl =
    document.getElementById("topText");

var bottomEl =
    document.getElementById("bottomText");


function showPhrase(index) {

    if (!topEl || !bottomEl) {
        return;
    }

    topEl.textContent =
        phrases[index][0];

    bottomEl.textContent =
        phrases[index][1];

}


function changeText() {

    if (!topEl || !bottomEl) {
        return;
    }


    topEl.classList.remove("visible");
    topEl.classList.add("hidden");

    bottomEl.classList.remove("visible");
    bottomEl.classList.add("hidden");


    setTimeout(function () {

        currentIndex =
            (currentIndex + 1) %
            phrases.length;


        showPhrase(currentIndex);


        topEl.classList.remove("hidden");
        topEl.classList.add("visible");

        bottomEl.classList.remove("hidden");
        bottomEl.classList.add("visible");

    }, 500);

}


if (topEl && bottomEl) {

    showPhrase(0);

    setInterval(
        changeText,
        3000
    );

}


/* ── 3D Shot ── */

const shotStage =
    document.getElementById("shotStage");

const shotGlare =
    document.getElementById("shotGlare");


/*
    3D effect is only enabled
    on devices that actually have
    a mouse pointer.
*/

if (
    shotStage &&
    window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches
) {

    const BASE_RX = 4;

    const BASE_RY = -8;

    const MAX_SWING = 6;

    const MAX_SINK = 10;


    const resetStage = () => {

        shotStage.style.setProperty(
            "--rx",
            `${BASE_RX}deg`
        );

        shotStage.style.setProperty(
            "--ry",
            `${BASE_RY}deg`
        );

        shotStage.style.setProperty(
            "--tz",
            "0px"
        );


        if (shotGlare) {

            shotGlare.style.setProperty(
                "--glare-o",
                "0"
            );

        }

    };


    resetStage();


    shotStage.addEventListener(
        "mousemove",
        (e) => {

            const rect =
                shotStage.getBoundingClientRect();


            const nx =
                ((e.clientX - rect.left) /
                    rect.width) *
                2 - 1;


            const ny =
                ((e.clientY - rect.top) /
                    rect.height) *
                2 - 1;


            const rx =
                (
                    BASE_RX +
                    ny * -MAX_SWING
                ).toFixed(2);


            const ry =
                (
                    BASE_RY +
                    nx * MAX_SWING
                ).toFixed(2);


            const proximity =
                Math.max(
                    Math.abs(nx),
                    Math.abs(ny)
                );


            const tz =
                (
                    -proximity *
                    MAX_SINK
                ).toFixed(2);


            shotStage.style.setProperty(
                "--rx",
                `${rx}deg`
            );

            shotStage.style.setProperty(
                "--ry",
                `${ry}deg`
            );

            shotStage.style.setProperty(
                "--tz",
                `${tz}px`
            );


            if (shotGlare) {

                shotGlare.style.setProperty(
                    "--gx",
                    `${((nx + 1) / 2) * 100}%`
                );

                shotGlare.style.setProperty(
                    "--gy",
                    `${((ny + 1) / 2) * 100}%`
                );

                shotGlare.style.setProperty(
                    "--glare-o",
                    "1"
                );

            }

        }
    );


    shotStage.addEventListener(
        "mouseleave",
        resetStage
    );

}


/* ══ HALL OF FAME ══ */

var hofRaw = localStorage.getItem("AllStudent");

var hofPodium = document.getElementById("hofPodium");

if (hofPodium) {

    if (!hofRaw) {

        hofPodium.innerHTML = "<p class='hof-empty'>No students added yet.</p>";

    } else {

        /* AllStudent is an array not object */
        var hofAllStudents = JSON.parse(hofRaw);

        /* Keep only students with valid CGPA */
        var hofWithCGPA = [];

        for (var hi = 0; hi < hofAllStudents.length; hi++) {

            var s = hofAllStudents[hi];

            if (s.cgpa && parseFloat(s.cgpa) > 0) {
                hofWithCGPA.push(s);
            }

        }

        /* Sort highest CGPA first */
        hofWithCGPA.sort(function (a, b) {
            return parseFloat(b.cgpa) - parseFloat(a.cgpa);
        });

        /* Top 3 only */
        var hofTop3 = hofWithCGPA.slice(0, 3);

        if (hofTop3.length === 0) {

            hofPodium.innerHTML = "<p class='hof-empty'>No CGPA data found.</p>";

        } else {

            var hofMedals = ["🥇", "🥈", "🥉"];

            var hofHTML = "";

            for (var hj = 0; hj < hofTop3.length; hj++) {

                var student = hofTop3[hj];
                var studentName = student.name || "Unknown";
                var studentCGPA = parseFloat(student.cgpa).toFixed(2);

                /* Initial letter for fallback avatar */
                var initials = studentName[0].toUpperCase();

                /* Use image if exists, else show initials */
                var avatarHTML = "";

                if (student.image && student.image !== "") {

                    avatarHTML = "<img src='" + student.image + "' class='hof-avatar-img' alt='" + studentName + "' />";

                } else {

                    avatarHTML = "<div class='hof-avatar'>" + initials + "</div>";

                }

                var hofClass = (hj === 0) ? "hof-card hof-gold" : "hof-card";

                hofHTML += "<div class='" + hofClass + "'>";
                hofHTML += "<div class='hof-rank'>" + hofMedals[hj] + "</div>";
                hofHTML += avatarHTML;
                hofHTML += "<p class='hof-name'>" + studentName + "</p>";
                hofHTML += "<p class='hof-cgpa'>" + studentCGPA + " CGPA</p>";
                hofHTML += "</div>";

            }

            hofPodium.innerHTML = hofHTML;

        }

    }

}