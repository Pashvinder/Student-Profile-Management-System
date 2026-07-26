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
            if (password[i] >= 'A' && password[i] <= 'Z') { hasUpperCase = true };
            if (password[i] >= 'a' && password[i] <= 'z') { hasLowercase = true };
            if (password[i] >= '0' && password[i] <= '9') { hasNumber = true };
            if (!(password[i] >= 'A' && password[i] <= 'Z') && !(password[i] >= 'a' && password[i] <= 'z') && !(password[i] >= '0' && password[i] <= '9')) {
                hasSpecial = true;
            }
        }

    }

    if (passLength >= 8 && hasUpperCase === true && hasLowercase === true && hasNumber === true && hasSpecial === true) {
        console.log("Valid Password");
        return true;
    }
    else {
        console.log("Invalid Password!");
        alert("Password requirements not met.");
        validpassword.innerText = "Requires: 1 Upper case, 1 Lower Case, 1 Number, 1 Special Chracter";
        validpassword.style.color = "red";
        return false;
    }
}



// both passwords matches or not
function passwordsMatch(password, confirmPass) {
    const unmatch = document.getElementById("unmatchedPassword")
    if (password !== confirmPass) {
        console.log("Unmatched Passwords")
        unmatch.innerText = "Passwords do not match.";
        unmatch.style.color = "red";
        return false;
    }
    unmatch.innerText = "";
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

    if (!passwordValidation(password)) {
        return;
    }
    if (!passwordsMatch(password, confirmPass)) {
        return;
    }
    else {
        validpassword.innerText = "";
        console.log("Passswords matched.")
    }


})