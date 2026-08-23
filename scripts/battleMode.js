(function () {
    "use strict";

    var defaultImage = "../files/assets/default.png";
    var studentOneSelect = document.getElementById("studentOne");
    var studentTwoSelect = document.getElementById("studentTwo");
    var startButton = document.getElementById("startBattle");
    var message = document.getElementById("battleMessage");
    var results = document.getElementById("battleResults");
    var emptyState = document.getElementById("emptyState");
    var cards = document.getElementById("studentCards");
    var comparisonGrid = document.getElementById("comparisonGrid");
    var winnerBanner = document.getElementById("winnerBanner");

    function getStudents() {
        try {
            var savedStudents = JSON.parse(localStorage.getItem("AllStudent"));
            return Array.isArray(savedStudents) ? savedStudents : [];
        } catch (error) {
            return [];
        }
    }

    function safeText(value) {
        return value === undefined || value === null || String(value).trim() === "" ? "Not provided" : String(value).trim();
    }

    function itemCount(value) {
        if (!value || typeof value !== "string") return 0;
        return value.split(/[,;|\n]+/).map(function (item) { return item.trim(); }).filter(Boolean).length;
    }

    function scoreStudent(student) {
        var cgpa = Math.min(10, Math.max(0, Number.parseFloat(student.cgpa) || 0));
        var profileFields = ["skills", "projects", "certifications", "internships", "achievements", "clubs", "languages"];
        var profileScore = profileFields.reduce(function (total, field) {
            return total + Math.min(itemCount(student[field]), 4);
        }, 0);
        return Math.round((cgpa * 6) + Math.min(profileScore, 40));
    }

    function createOption(student, index) {
        var option = document.createElement("option");
        option.value = String(index);
        option.textContent = safeText(student.name) + " — " + safeText(student.rollno);
        return option;
    }

    function populateSelectors() {
        var students = getStudents();
        [studentOneSelect, studentTwoSelect].forEach(function (select) {
            select.length = 1;
            students.forEach(function (student, index) { select.appendChild(createOption(student, index)); });
            select.disabled = students.length < 2;
        });
        startButton.disabled = students.length < 2;
        emptyState.hidden = students.length >= 2;
    }

    function createDetail(label, value) {
        var detail = document.createElement("div");
        var title = document.createElement("span");
        var content = document.createElement("strong");
        title.textContent = label;
        content.textContent = safeText(value);
        detail.append(title, content);
        return detail;
    }

    function createStudentCard(student, score, isWinner) {
        var card = document.createElement("article");
        card.className = "student-card" + (isWinner ? " is-winner" : "");
        var photo = document.createElement("img");
        photo.className = "student-photo";
        photo.src = student.image || defaultImage;
        photo.alt = safeText(student.name) + " profile photo";
        photo.onerror = function () { this.src = defaultImage; };
        var heading = document.createElement("div");
        var name = document.createElement("h2");
        var roll = document.createElement("p");
        name.textContent = safeText(student.name);
        roll.textContent = "Roll no. " + safeText(student.rollno);
        heading.append(name, roll);
        var scoreBadge = document.createElement("div");
        scoreBadge.className = "overall-score";
        scoreBadge.innerHTML = "<span>Overall score</span><strong>" + score + "<small>/100</small></strong>";
        var details = document.createElement("div");
        details.className = "student-details";
        [["CGPA", student.cgpa], ["Branch", student.branch], ["Semester", student.currentSem ? "Semester " + student.currentSem : ""], ["Career goal", student.careerGoal]].forEach(function (detail) {
            details.appendChild(createDetail(detail[0], detail[1]));
        });
        card.append(photo, heading, scoreBadge, details);
        return card;
    }

    function createComparisonRow(label, oneValue, twoValue, oneWins, twoWins) {
        var row = document.createElement("div");
        row.className = "comparison-row";
        var left = document.createElement("span");
        var metric = document.createElement("strong");
        var right = document.createElement("span");
        left.textContent = oneValue;
        right.textContent = twoValue;
        metric.textContent = label;
        if (oneWins) left.classList.add("leads");
        if (twoWins) right.classList.add("leads");
        row.append(left, metric, right);
        return row;
    }

    function runBattle() {
        var students = getStudents();
        var firstIndex = Number(studentOneSelect.value);
        var secondIndex = Number(studentTwoSelect.value);
        message.textContent = "";
        results.hidden = true;
        if (studentOneSelect.value === "" || studentTwoSelect.value === "") {
            message.textContent = "Select two students to start the battle.";
            return;
        }
        if (firstIndex === secondIndex) {
            message.textContent = "Choose two different students for a fair comparison.";
            return;
        }
        var first = students[firstIndex];
        var second = students[secondIndex];
        if (!first || !second) {
            message.textContent = "The selected students could not be found. Please choose them again.";
            populateSelectors();
            return;
        }
        var firstScore = scoreStudent(first);
        var secondScore = scoreStudent(second);
        var tie = firstScore === secondScore;
        winnerBanner.textContent = tie ? "It’s a draw — both students earned " + firstScore + "/100." : "🏆 " + safeText(firstScore > secondScore ? first.name : second.name) + " wins with " + Math.max(firstScore, secondScore) + "/100!";
        cards.replaceChildren(createStudentCard(first, firstScore, !tie && firstScore > secondScore), createStudentCard(second, secondScore, !tie && secondScore > firstScore));
        comparisonGrid.replaceChildren();
        [
            ["CGPA", Number.parseFloat(first.cgpa) || 0, Number.parseFloat(second.cgpa) || 0, " / 10"],
            ["Skills", itemCount(first.skills), itemCount(second.skills), " listed"],
            ["Projects", itemCount(first.projects), itemCount(second.projects), " listed"],
            ["Certifications", itemCount(first.certifications), itemCount(second.certifications), " listed"],
            ["Internships", itemCount(first.internships), itemCount(second.internships), " listed"],
            ["Achievements", itemCount(first.achievements), itemCount(second.achievements), " listed"],
            ["Clubs", itemCount(first.clubs), itemCount(second.clubs), " listed"],
            ["Languages", itemCount(first.languages), itemCount(second.languages), " listed"]
        ].forEach(function (item) {
            comparisonGrid.appendChild(createComparisonRow(item[0], item[1] + item[3], item[2] + item[3], item[1] > item[2], item[2] > item[1]));
        });
        results.hidden = false;
        results.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    startButton.addEventListener("click", runBattle);
    populateSelectors();
}());
