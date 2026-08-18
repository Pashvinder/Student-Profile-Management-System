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
    editForm.style.display = "none";
    addForm.style.display = "grid";
    
}
function showEdit() {
    addForm.style.display = "none";
    editForm.style.display = "grid";

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



// *********
// EDIT FORM
// **********

var rollNoInput = document.getElementById("rollNo");
var dispOld = document.getElementById("dispOld");
var editFields = document.getElementById("editFields");
var notFound = document.getElementById("notFound");
var editForm = document.getElementById("editForm");

/* old detail display elements */
var old_image = document.getElementById("old_image");
var old_name = document.getElementById("old_name");
var old_phone = document.getElementById("old_phone");
var old_email = document.getElementById("old_email");
var old_cgpa = document.getElementById("old_cgpa");

var foundStudent = null;
var foundIndex = -1;


rollNoInput.addEventListener("input", function () {

    var typedRoll = rollNoInput.value.trim();

    if (typedRoll.length < 10) {
        hideForm();
        return;  
    }

    searchStudent(typedRoll);
});


function searchStudent(rollNo) {

    var allStudents = JSON.parse(localStorage.getItem("AllStudent")) || [];

    foundIndex = -1;  
    foundStudent = null;

    for (var i = 0; i < allStudents.length; i++) {
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
    } else {
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


editForm.addEventListener("submit", function (event) {

    event.preventDefault();  

    if (foundStudent === null || foundIndex === -1) {
        alert("No student selected. Please enter a valid roll number.");
        return;
    }

    var allStudents = JSON.parse(localStorage.getItem("AllStudent")) || [];

    var newName = document.getElementById("newName").value.trim();
    var newPhone = document.getElementById("newPersonalNumber").value.trim();
    var newEmail = document.getElementById("newPersonalEmail").value.trim();
    var newCgpa = document.getElementById("newCgpa").value.trim();
    var newImage = document.getElementById("newImageInput");


    if (newName !== "") allStudents[foundIndex].name = newName;
    if (newPhone !== "") allStudents[foundIndex].phone = newPhone;
    if (newEmail !== "") allStudents[foundIndex].personalEmail = newEmail;
    if (newCgpa !== "") allStudents[foundIndex].cgpa = newCgpa;

    if (newImage.files.length > 0) {

        var reader = new FileReader();

        reader.onload = function () {

            allStudents[foundIndex].image = reader.result;
            localStorage.setItem("AllStudent", JSON.stringify(allStudents));

            console.log("Student updated with new image:", allStudents[foundIndex]);
            alert(allStudents[foundIndex].name + " updated successfully!");
            resetEdit();
        };

        reader.readAsDataURL(newImage.files[0]);

    } else {

        localStorage.setItem("AllStudent", JSON.stringify(allStudents));

        console.log("Student updated:", allStudents[foundIndex]);
        alert(allStudents[foundIndex].name + " updated successfully!");
        resetEdit();
    }
});