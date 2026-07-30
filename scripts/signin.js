const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const signinEmail = document.getElementById("in_signEmail").value.trim();
    const signinPassword = document.getElementById("in_signPassword").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(function (u) {
        return (
            u.email === signinEmail &&
            u.password === signinPassword
        );
    });

    if (user) {
        alert("Login Successful!");

        localStorage.setItem("currentUser", JSON.stringify(user));

        window.location.href = "../index.html"; // change path if needed
    } else {
        alert("Invalid Email or Password");
    }
});