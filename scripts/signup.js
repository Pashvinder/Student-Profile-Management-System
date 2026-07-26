const form = document.getElementById("signUpForm");
const validpassword = document.getElementById("validPassword");


function passwordsMatch(password, confirmPass) {
    const unmatch = document.getElementById("unmatchedPassword")
    if (password !== confirmPass) {
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


    if (!passwordsMatch(password, confirmPass)) {
        return;
    }
    console.log("Passswords matched.")

})