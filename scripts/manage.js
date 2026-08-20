let level = document.getElementById("level");
let subject = document.getElementById("subject");
let branch = document.getElementById("branch");
let addForm = document.getElementById("addForm");


// TABLE
let studentTableContainer = document.getElementById("studentTableContainer");
let studentTableBody = document.getElementById("studentTableBody");
let studentCount = document.getElementById("studentCount");
let emptyTable = document.getElementById("emptyTable");


// EDIT FORM
let rollNoInput = document.getElementById("rollNo");
let dispOld = document.getElementById("dispOld");
let editFields = document.getElementById("editFields");
let notFound = document.getElementById("notFound");
let editForm = document.getElementById("editForm");


// OLD DETAIL DISPLAY
let old_image = document.getElementById("old_image");
let old_name = document.getElementById("old_name");
let old_phone = document.getElementById("old_phone");
let old_email = document.getElementById("old_email");
let old_cgpa = document.getElementById("old_cgpa");


// CURRENT EDITED STUDENT
let foundStudent = null;
let foundIndex = -1;




//   
// BRANCH
//   

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

    branch.innerHTML = '<option value="">Select Branch</option>';


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


//   
// PAGE NAVIGATION
//   
let displayDetails = document.querySelector(".displayDetails");

function showList() {

    displayDetails.style.display = "none";

    if (studentTableContainer.style.display === "grid") {
        studentTableContainer.style.display = "none";
    } else {
        editForm.style.display = "none";
        addForm.style.display = "none";
        studentTableContainer.style.display = "grid";
        renderStudents();
    }
}

function addStudent() {

    displayDetails.style.display = "none";

    if (addForm.style.display === "grid") {
        addForm.style.display = "none";
    } else {
        editForm.style.display = "none";
        studentTableContainer.style.display = "none";
        addForm.style.display = "grid";
    }
}

function showEdit() {

    displayDetails.style.display = "none";

    if (editForm.style.display === "grid") {
        editForm.style.display = "none";
    } else {
        studentTableContainer.style.display = "none";
        addForm.style.display = "none";
        editForm.style.display = "grid";
    }
}

//   
// ADD STUDENT
//   

addForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const imageInput = document.getElementById("imageInput");


    let Student = {

        name: document.getElementById("name").value,
        rollno: document.getElementById("rollno").value,
        enrollmentYear: document.getElementById("enrollmentYear").value,
        dob: document.getElementById("dob").value,
        bloodGroup: document.getElementById("bloodGroup").value,
        phone: document.getElementById("phone").value,
        personalEmail: document.getElementById("personalEmail").value,
        relationship: document.getElementById("relationship").value,
        nameEmergency: document.getElementById("nameEmergency").value,
        emergencyPhone: document.getElementById("emergencyPhone").value,
        collegeEmail: document.getElementById("collegeEmail").value,
        level: document.getElementById("level").value,
        subject: document.getElementById("subject").value,
        branch: document.getElementById("branch").value,
        currentSem: document.getElementById("currentSem").value,
        cgpa: document.getElementById("cgpa").value,
        skills: document.getElementById("skills").value,
        certifications: document.getElementById("certifications").value,
        internships: document.getElementById("internships").value,
        projects: document.getElementById("projects").value,
        linkedin: document.getElementById("linkedin").value,
        github: document.getElementById("github").value,
        resume: document.getElementById("resume").value,
        careerGoal: document.getElementById("careerGoal").value,
        hobbies: document.getElementById("hobbies").value,
        languages: document.getElementById("languages").value,
        achievements: document.getElementById("achievements").value,
        clubs: document.getElementById("clubs").value,
        socialHandles: document.getElementById("socialHandles").value,
        image: ""

    };
    let AllStudent =
        JSON.parse(localStorage.getItem("AllStudent")) || [];


    // ========================================
    // IMAGE SELECTED
    // ========================================

    if (imageInput.files.length > 0) {

        const reader = new FileReader();


        reader.onload = function () {

            Student.image = reader.result;

            AllStudent.push(Student);


            localStorage.setItem(
                "AllStudent",
                JSON.stringify(AllStudent)
            );


            // UPDATE TABLE
            renderStudents();


            addForm.reset();

            let name = document.getElementById("name").value
            alert(`${name} Added to the List`)
            console.log("Student Added:", Student);
            console.log("All Students:", AllStudent);

        };


        reader.readAsDataURL(imageInput.files[0]);

    }
    else {

        AllStudent.push(Student);


        localStorage.setItem(
            "AllStudent",
            JSON.stringify(AllStudent)
        );


        renderStudents();


        addForm.reset();


        console.log("Student Added:", Student);
        console.log("All Students:", AllStudent);

    }

});








//   
// EDIT FORM
//   


rollNoInput.addEventListener("input", function () {

    let typedRoll = rollNoInput.value.trim();


    if (typedRoll.length < 10) {

        hideForm();

        return;

    }


    searchStudent(typedRoll);

});



function searchStudent(rollNo) {

    let allStudents =
        JSON.parse(localStorage.getItem("AllStudent")) || [];


    foundIndex = -1;
    foundStudent = null;


    for (let i = 0; i < allStudents.length; i++) {

        if (allStudents[i].rollno === rollNo) {

            foundStudent = allStudents[i];

            foundIndex = i;

            break;

        }

    }


    if (foundStudent === null) {

        hideForm();

        notFound.style.display = "block";

        return;

    }


    notFound.style.display = "none";


    showOldDetails(foundStudent);

}



function showOldDetails(student) {

    if (student.image && student.image !== "") {

        old_image.src = student.image;

        old_image.style.display = "block";

    }

    else {

        old_image.src = "";

        old_image.style.display = "none";

    }


    old_name.textContent = student.name || "—";

    old_phone.textContent = student.phone || "—";

    old_email.textContent = student.personalEmail || "—";

    old_cgpa.textContent = student.cgpa || "—";


    dispOld.classList.add("visible");

    editFields.classList.add("visible");

}



function hideForm() {

    dispOld.classList.remove("visible");

    editFields.classList.remove("visible");

    notFound.style.display = "none";
    foundStudent = null;
    foundIndex = -1;

}



function resetEdit() {
    rollNoInput.value = "";
    editForm.reset();
    hideForm();

}


//   
// UPDATE STUDENT
//   

editForm.addEventListener("submit", function (event) {

    event.preventDefault();


    if (foundStudent === null || foundIndex === -1) {

        alert(
            "No student selected. Please enter a valid roll number."
        );

        return;

    }


    let allStudents =
        JSON.parse(localStorage.getItem("AllStudent")) || [];


    let newName =
        document.getElementById("newName").value.trim();


    let newPhone =
        document.getElementById("newPersonalNumber").value.trim();


    let newEmail =
        document.getElementById("newPersonalEmail").value.trim();


    let newCgpa =
        document.getElementById("newCgpa").value.trim();


    let newImage =
        document.getElementById("newImageInput");



    if (newName !== "") {

        allStudents[foundIndex].name = newName;

    }


    if (newPhone !== "") {

        allStudents[foundIndex].phone = newPhone;

    }


    if (newEmail !== "") {

        allStudents[foundIndex].personalEmail = newEmail;

    }


    if (newCgpa !== "") {

        allStudents[foundIndex].cgpa = newCgpa;

    }

    if (newImage.files.length > 0) {

        let reader = new FileReader();


        reader.onload = function () {

            allStudents[foundIndex].image = reader.result;


            localStorage.setItem(
                "AllStudent",
                JSON.stringify(allStudents)
            );


            renderStudents();


            console.log(
                "Student updated with new image:",
                allStudents[foundIndex]
            );


            alert(
                allStudents[foundIndex].name +
                " updated successfully!"
            );


            resetEdit();

        };


        reader.readAsDataURL(newImage.files[0]);

    }

    else {

        localStorage.setItem(
            "AllStudent",
            JSON.stringify(allStudents)
        );


        // UPDATE TABLE
        renderStudents();


        console.log(
            "Student updated:",
            allStudents[foundIndex]
        );


        alert(
            allStudents[foundIndex].name +
            " updated successfully!"
        );


        resetEdit();

    }

});


//   
// STUDENT TABLE
//   

function renderStudents() {

    const tableBody =
        document.getElementById("studentTableBody");


    const emptyTable =
        document.getElementById("emptyTable");


    const studentCount =
        document.getElementById("studentCount");


    // Get students from localStorage

    const allStudents =
        JSON.parse(localStorage.getItem("AllStudent")) || [];


    // Clear table

    tableBody.innerHTML = "";


    // Update count

    studentCount.textContent = allStudents.length;


    if (allStudents.length === 0) {

        emptyTable.style.display = "flex";

        return;

    }



    emptyTable.style.display = "none";


    // ========================================
    // CREATE ROWS
    // ========================================

    allStudents.forEach(function (student, index) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <img
                    class="student_photo"
                    src="${student.image || "../files/assets/default.png"}"
                    src="${student.image || "../files/assets/default.png"}"
                    alt="Student Photo"
                >

            </td>


            <td>

                <div class="name_with_menu">

                    <span class="student_name">
                        ${student.name || "—"}
                    </span>


                    <div class="student_menu">

                       


                        <div class="student_dropdown" id="menu-${index}">
                       


                        <div class="student_dropdown" id="menu-${index}">

                            <button
                                type="button"
                                class="delete_option"
                                onclick="deleteStudent(${index})"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            </td>


            <td>

                <span class="student_roll">
                    ${student.rollno || "—"}
                </span>

            </td>

            <td>

                <span class="student_roll">
                    ${student.cgpa || "—"}
                </span>

            </td>


            <td>

                <span class="student_branch">
                    ${student.branch || "—"}
                </span>

            </td>


            <td>

                <span class="student_level">
                    ${student.level || "—"}
                </span>

            </td>


            <td>

                <span class="student_phone">
                    ${student.phone || "—"}
                </span>

            </td>

            <td>
             <button
                            type="button"
                            class="menu_button"
                            onclick="toggleStudentMenu(${index})"
                        >

                            <h1>...</h1>

                        </button>
                        </td

            <td>
             <button
                            type="button"
                            class="menu_button"
                            onclick="toggleStudentMenu(${index})"
                        >

                            <h1>...</h1>

                        </button>
                        </td

        `;


        tableBody.appendChild(row);

    });

}


// TABLE LOAD


document.addEventListener("DOMContentLoaded", function () {

    renderStudents();

});


// 
// THREE DOT MENU
// 

function toggleStudentMenu(index) {

    const menu =
        document.getElementById(`menu-${index}`);


    // Close every other menu

    document
        .querySelectorAll(".student_dropdown")
        .forEach(function (item) {

            if (item !== menu) {

                item.style.display = "none";

            }

        });


    // Toggle selected menu

    if (menu.style.display === "block") {

        menu.style.display = "none";

    }

    else {

        menu.style.display = "block";

    }

}


//   
// DELETE STUDENT
//   

function deleteStudent(index) {

    let allStudents =
        JSON.parse(localStorage.getItem("AllStudent")) || [];


    // Make sure student exists

    if (!allStudents[index]) {

        return;

    }


    const student =
        allStudents[index];


    // Confirmation

    const confirmDelete = confirm(
        "Are you sure you want to delete " +
        student.name +
        "?"
    );


    // User clicked Cancel

    if (!confirmDelete) {

        return;

    }


    // Remove student from array

    allStudents.splice(index, 1);


    // Update localStorage

    localStorage.setItem(
        "AllStudent",
        JSON.stringify(allStudents)
    );


    // Refresh table

    renderStudents();

}




// SEARCH BAR
// 

const searchBar = document.getElementById("searchBar");

const displayDetailsBox = document.querySelector(".displayDetails");

const dispImage = document.getElementById("dispImage");
const dispName = document.getElementById("dispName");
const dispRollNo = document.getElementById("dispRollNo");
const dispCurrentSem = document.getElementById("dispCurrentSem");

const dispEnrollmentYear = document.getElementById("dispEnrollmentYear");
const dispDOB = document.getElementById("dispDOB");
const dispBloodGroup = document.getElementById("dispBloodGroup");
const dispPhone = document.getElementById("dispPhone");
const dispPersonalEmail = document.getElementById("dispPersonalEmail");

const dispNameEmergency = document.getElementById("dispNameEmergency");
const dispRelationship = document.getElementById("dispRelationship");
const dispEmergencyPhone = document.getElementById("dispEmergencyPhone");

const dispCollegeEmail = document.getElementById("dispCollegeEmail");
const dispLevel = document.getElementById("dispLevel");
const dispSubject = document.getElementById("dispSubject");
const dispBranch = document.getElementById("dispBranch");
const dispCGPA = document.getElementById("dispCGPA");

const dispSkills = document.getElementById("dispSkills");
const dispCertifications = document.getElementById("dispCertifications");
const dispInternships = document.getElementById("dispInternships");
const dispProjects = document.getElementById("dispProjects");

const dispCareerGoal = document.getElementById("dispCareerGoal");
const dispHobbies = document.getElementById("dispHobbies");
const dispLanguages = document.getElementById("dispLanguages");
const dispAchievements = document.getElementById("dispAchievements");
const dispClubs = document.getElementById("dispClubs");
const dispSocialHandles = document.getElementById("dispSocialHandles");

const dispLinkedin = document.getElementById("dispLinkedin");
const dispGithub = document.getElementById("dispGithub");
const dispLeetcode = document.getElementById("dispResume");


//   
// SEARCH INPUT
//   

searchBar.addEventListener("input", function () {

    const typedRoll = searchBar.value.trim();

    // Remove anything except numbers
    searchBar.value = searchBar.value.replace(/\D/g, "");

    // If search is empty
    if (typedRoll === "") {

        displayDetailsBox.style.display = "none";

        // Show table again
        studentTableContainer.style.display = "grid";

        renderStudents();

        return;
    }


    // Only search when 10 digit roll number is entered
    if (typedRoll.length < 10) {
        return;
    }


    // Get students from localStorage
    const allStudents =
        JSON.parse(localStorage.getItem("AllStudent")) || [];


    // Find student by roll number
    const student = allStudents.find(function (item) {

        return String(item.rollno).trim() === typedRoll;

    });


    //   
    // STUDENT NOT FOUND
    //   

    if (!student) {

        displayDetailsBox.style.display = "none";

        studentTableContainer.style.display = "none";

        alert("No student found with Roll Number: " + typedRoll);

        return;
    }


    //   
    // STUDENT FOUND
    //   

    // Hide table
    studentTableContainer.style.display = "none";

    // Hide add form
    addForm.style.display = "none";

    // Hide edit form
    editForm.style.display = "none";

    // Show details
    displayDetailsBox.style.display = "flex";


    //   
    // BASIC INFORMATION
    //   

    dispImage.src =
        student.image && student.image !== ""
            ? student.image
            : "../files/assets/default.png";

    dispName.textContent = student.name || "—";

    dispRollNo.textContent = student.rollno || "—";

    dispCurrentSem.textContent =
        "Semester: " + (student.currentSem || "—");


    //   
    // PERSONAL DETAILS
    //   

    dispEnrollmentYear.textContent =
        student.enrollmentYear || "—";

    dispDOB.textContent =
        student.dob || "—";

    dispBloodGroup.textContent =
        student.bloodGroup || "—";

    dispPhone.textContent =
        student.phone || "—";

    dispPersonalEmail.textContent =
        student.personalEmail || "—";


    // 
    // EMERGENCY CONTACT
    // 

    dispNameEmergency.textContent =
        student.nameEmergency || "—";

    dispRelationship.textContent =
        student.relationship || "—";

    dispEmergencyPhone.textContent =
        student.emergencyPhone || "—";


    // 
    // ACADEMICS
    // 

    dispCollegeEmail.textContent =
        student.collegeEmail || "—";

    dispLevel.textContent =
        student.level || "—";

    dispSubject.textContent =
        student.subject || "—";

    dispBranch.textContent =
        student.branch || "—";

    dispCGPA.textContent =
        student.cgpa || "—";


    //   
    // CAREER
    //   

    dispSkills.textContent =
        student.skills || "—";

    dispCertifications.textContent =
        student.certifications || "—";

    dispInternships.textContent =
        student.internships || "—";

    dispProjects.textContent =
        student.projects || "—";


    //   
    // SOCIAL / PERSONALITY
    //   

    dispCareerGoal.textContent =
        student.careerGoal || "—";

    dispHobbies.textContent =
        student.hobbies || "—";

    dispLanguages.textContent =
        student.languages || "—";

    dispAchievements.textContent =
        student.achievements || "—";

    dispClubs.textContent =
        student.clubs || "—";

    dispSocialHandles.textContent =
        student.socialHandles || "—";


    //   
    // SOCIAL LINKS
    //   

    if (student.linkedin && student.linkedin.trim() !== "") {

        dispLinkedin.href = student.linkedin;
        dispLinkedin.style.display = "inline-flex";

    } else {

        dispLinkedin.href = "#";
        dispLinkedin.style.display = "none";

    }


    if (student.github && student.github.trim() !== "") {

        dispGithub.href = student.github;
        dispGithub.style.display = "inline-flex";

    } else {

        dispGithub.href = "#";
        dispGithub.style.display = "none";

    }


    if (student.resume && student.resume.trim() !== "") {

        dispResume.href = student.resume;
        dispResume.style.display = "inline-flex";

    } else {

        dispResume.href = "#";
        dispResume.style.display = "none";

    }

});