let level = document.getElementById("level");
let subject = document.getElementById("subject");
let branch = document.getElementById("branch");
let addForm = document.getElementById("addForm");



// *******************BRANCH*******************
level.addEventListener("change", function () {

    // Clear old options
    subject.innerHTML = '<option value="">Select Subject</option>';
    branch.innerHTML = '<option value="">Select Branch</option>';

    if (level.value === "UG") {

        subject.innerHTML += `
                <option value="Engineering">Engineering</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
                <option value="Computer Applications">Computer Applications</option>
            `;

    }
    else if (level.value === "PG") {

        subject.innerHTML += `
                <option value="Engineering">Engineering</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
                <option value="Management">Management</option>
                <option value="Computer Applications">Computer Applications</option>
            `;

    }
    else if (level.value === "PhD") {

        subject.innerHTML += `
                <option value="Engineering">Engineering</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Management">Management</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
            `;
    }
});


subject.addEventListener("change", function () {


    if (subject.value === "Engineering") {

        branch.innerHTML += `
                <option value="CSE">Computer Science & Engineering</option>
                <option value="AI-ML">AI & ML</option>
                <option value="ECE">Electronics & Communication Engineering</option>
                <option value="EEE">Electrical & Electronics Engineering</option>
                <option value="MECH">Mechanical Engineering</option>
                <option value="CIVIL">Civil Engineering</option>
                <option value="IT">Information Technology</option>
            `;

    }
    else if (subject.value === "Science") {

        branch.innerHTML += `
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Biology">Biology</option>
                <option value="Computer Science">Computer Science</option>
            `;

    }
    else if (subject.value === "Commerce") {

        branch.innerHTML += `
                <option value="Accounting">Accounting</option>
                <option value="Finance">Finance</option>
                <option value="Banking">Banking</option>
            `;

    }
    else if (subject.value === "Arts") {

        branch.innerHTML += `
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="History">History</option>
                <option value="Political Science">Political Science</option>
                <option value="Economics">Economics</option>
            `;

    }
    else if (subject.value === "Computer Applications") {

        branch.innerHTML += `
                <option value="BCA">Computer Applications</option>
                <option value="Data Science">Data Science</option>
                <option value="Cyber Security">Cyber Security</option>
            `;

    }
    else if (subject.value === "Management") {

        branch.innerHTML += `
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">Human Resources</option>
                <option value="Operations">Operations</option>
            `;
    }
});
// ************************************************

function addStudent() {
    addForm.style.display = "grid";

}







addForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const imageInput = document.getElementById("imageInput");

    let Student = {

        // Basic Information
        name: document.getElementById("name").value,
        rollno: document.getElementById("rollno").value,
        enrollmentYear: document.getElementById("enrollmentYear").value,

        // Personal
        dob: document.getElementById("dob").value,
        bloodGroup: document.getElementById("bloodGroup").value,
        phone: document.getElementById("phone").value,
        personalEmail: document.getElementById("personalEmail").value,

        // Emergency Contact
        relationship: document.getElementById("relationship").value,
        nameEmergency: document.getElementById("nameEmergency").value,
        emergencyPhone: document.getElementById("emergencyPhone").value,

        // Academics
        collegeEmail: document.getElementById("collegeEmail").value,
        level: document.getElementById("level").value,
        subject: document.getElementById("subject").value,
        branch: document.getElementById("branch").value,
        currentSem: document.getElementById("currentSem").value,
        cgpa: document.getElementById("cgpa").value,

        // Career
        skills: document.getElementById("skills").value,
        certifications: document.getElementById("certifications").value,
        internships: document.getElementById("internships").value,
        projects: document.getElementById("projects").value,
        linkedin: document.getElementById("linkedin").value,
        github: document.getElementById("github").value,
        resume: document.getElementById("resume").value,
        careerGoal: document.getElementById("careerGoal").value,

        // Social
        hobbies: document.getElementById("hobbies").value,
        languages: document.getElementById("languages").value,
        achievements: document.getElementById("achievements").value,
        clubs: document.getElementById("clubs").value,
        socialHandles: document.getElementById("socialHandles").value,

        // Image
        image: ""
    };


    // Get existing students
    let AllStudent = JSON.parse(localStorage.getItem("AllStudent")) || [];


    // If image is selected
    if (imageInput.files.length > 0) {

        const reader = new FileReader();

        reader.onload = function () {

            Student.image = reader.result;

            AllStudent.push(Student);

            localStorage.setItem(
                "AllStudent",
                JSON.stringify(AllStudent)
            );

            addForm.reset();

            console.log("Student Added:", Student);
            console.log("All Students:", AllStudent);
        };

        reader.readAsDataURL(imageInput.files[0]);

    }

    // If no image is selected
    else {

        AllStudent.push(Student);

        localStorage.setItem(
            "AllStudent",
            JSON.stringify(AllStudent)
        );

        addForm.reset();

        console.log("Student Added:", Student);
        console.log("All Students:", AllStudent);
    }

});