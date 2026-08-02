const form = document.getElementById("signUpForm");
const validpassword = document.getElementById("validPassword");

// Enter password is valid or not
function passwordValidation(password) {
    const passLength = password.length;
    let hasUpperCase = false;
    let hasLowercase = false;
    let hasNumber = false;
    let hasSpecial = false;

    if (passLength >= 8) {
        for (let i = 0; i < passLength; i++) {

            if (password[i] >= 'A' && password[i] <= 'Z') {
                hasUpperCase = true;
            }

            if (password[i] >= 'a' && password[i] <= 'z') {
                hasLowercase = true;
            }

            if (password[i] >= '0' && password[i] <= '9') {
                hasNumber = true;
            }

            if (!(password[i] >= 'A' && password[i] <= 'Z') &&
                !(password[i] >= 'a' && password[i] <= 'z') &&
                !(password[i] >= '0' && password[i] <= '9')) {

                hasSpecial = true;
            }
        }
    }

    if (passLength >= 8 &&
        hasUpperCase &&
        hasLowercase &&
        hasNumber &&
        hasSpecial) {

        validpassword.innerText = "";
        console.log("Valid Password");
        return true;
    }
    else {

        console.log("Invalid Password!");

        validpassword.innerText =
            "Requires: 1 Uppercase, 1 Lowercase, 1 Number & 1 Special Character";

        validpassword.style.color = "red";

        return false;
    }
}


// both passwords matches or not
function passwordsMatch(password, confirmPass) {

    const unmatch = document.getElementById("unmatchedPassword");

    if (password !== confirmPass) {

        console.log("Unmatched Passwords");

        unmatch.innerText = "Passwords do not match.";
        unmatch.style.color = "red";

        return false;
    }

    unmatch.innerText = "";

    return true;
}


// user already exists or not
function validUsername(username) {

    const usernameMessage = document.getElementById("usernameError");

    let allRegisteredUsers = JSON.parse(localStorage.getItem("users"));

    if (allRegisteredUsers == null) {
        allRegisteredUsers = [];
    }

    for (let i = 0; i < allRegisteredUsers.length; i++) {

        if (allRegisteredUsers[i].username.toLowerCase() === username.toLowerCase()) {

            console.log("Username Already Exists");

            usernameMessage.innerText = "Username already exists";
            usernameMessage.style.color = "red";

            return false;
        }
    }

    usernameMessage.innerText = "";

    return true;
}


form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("full_name").value;
    const email = document.getElementById("inEmail").value;
    const username = document.getElementById("inUsername").value;
    const phoneNo = document.getElementById("inPhone").value;
    const password = document.getElementById("inPassword").value;
    const confirmPass = document.getElementById("inConfirm").value;
    const role = document.querySelector('input[name="role"]:checked').value;
    const termsCheck = document.getElementById("termsCheck");

    if (!validUsername(username)) {
        return;
    }

    if (!passwordValidation(password)) {
        return;
    }

    if (!passwordsMatch(password, confirmPass)) {
        return;
    }

    if (!termsCheck.checked) {
        alert("Please accept the Terms and Conditions.");
        return;
    }

    console.log(`${name} has signed Up as ${role}`);

    // Storing User data o jandeeee
    const newUser = {

        name: name,
        email: email,
        username: username,
        phoneNo: phoneNo,
        password: password,
        role: role

    };

    let allRegisteredUsers = JSON.parse(localStorage.getItem("users"));

    if (allRegisteredUsers == null) {
        allRegisteredUsers = [];
    }

    allRegisteredUsers.push(newUser);

    localStorage.setItem("users", JSON.stringify(allRegisteredUsers));

    console.log("Signed Up Successfully!");
    window.location.href = "signin.html";

    form.reset();

    createAccountBtn.disabled = true;
});

const termsCheck = document.getElementById("termsCheck");
const createAccountBtn = document.getElementById("createAccountBtn");

// Hide button initially
createAccountBtn.style.display = "none";

termsCheck.addEventListener("change", function () {
    if (termsCheck.checked) {
        createAccountBtn.style.display = "block";
    } else {
        createAccountBtn.style.display = "none";
    }
});