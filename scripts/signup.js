const form = document.getElementById("signUpForm");
const validpassword = document.getElementById("validPassword");
const termsCheck = document.getElementById("termsCheck");
const createAccountBtn = document.getElementById("createAccountBtn");

// Hide button initially
createAccountBtn.style.display = "none";

function passwordValidation(password) {
    const passLength = password.length;
    let hasUpperCase = false;
    let hasLowercase = false;
    let hasNumber = false;
    let hasSpecial = false;

    if (passLength >= 8) {
        for (let i = 0; i < passLength; i++) {
            if (password[i] >= 'A' && password[i] <= 'Z') hasUpperCase = true;
            if (password[i] >= 'a' && password[i] <= 'z') hasLowercase = true;
            if (password[i] >= '0' && password[i] <= '9') hasNumber = true;
            if (
                !(password[i] >= 'A' && password[i] <= 'Z') &&
                !(password[i] >= 'a' && password[i] <= 'z') &&
                !(password[i] >= '0' && password[i] <= '9')
            ) hasSpecial = true;
        }
    }

    if (passLength >= 8 && hasUpperCase && hasLowercase && hasNumber && hasSpecial) {
        validpassword.innerText = "";
        return true;
    } else {
        validpassword.innerText = "Requires: 1 Uppercase, 1 Lowercase, 1 Number & 1 Special Character";
        validpassword.style.color = "red";
        return false;
    }
}

function passwordsMatch(password, confirmPass) {
    const unmatch = document.getElementById("unmatchedPassword");
    if (password !== confirmPass) {
        unmatch.innerText = "Passwords do not match.";
        unmatch.style.color = "red";
        return false;
    }
    unmatch.innerText = "";
    return true;
}

function validUsername(username) {
    const usernameMessage = document.getElementById("usernameError");
    let allRegisteredUsers = JSON.parse(localStorage.getItem("users")) || [];

    for (let i = 0; i < allRegisteredUsers.length; i++) {
        if (allRegisteredUsers[i].username.toLowerCase() === username.toLowerCase()) {
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

    const roleEl = document.querySelector('input[name="role"]:checked');
    if (!roleEl) { alert("Please select a role."); return; }
    const role = roleEl.value;

    if (!validUsername(username)) return;
    if (!passwordValidation(password)) return;
    if (!passwordsMatch(password, confirmPass)) return;

    if (!termsCheck.checked) {
        alert("Please accept the Terms and Conditions.");
        return;
    }

    const newUser = { name, email, username, phoneNo, password, role };

    let allRegisteredUsers = JSON.parse(localStorage.getItem("users")) || [];
    allRegisteredUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(allRegisteredUsers));

    console.log(`${name} signed up as ${role}`);
    form.reset();
    createAccountBtn.style.display = "none";

    window.location.href = "signin.html"; // ← redirect last
});

termsCheck.addEventListener("change", function () {
    createAccountBtn.style.display = termsCheck.checked ? "block" : "none";
});