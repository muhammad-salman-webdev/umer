"use strict";
const message = document.getElementById("message");
const loginForm = document.getElementById("login-form");

function showMessage(msg, action) {
    message.querySelector("span").textContent = msg;
    message.classList.remove("d-none");
    message.classList.add(action ? "success" : "error");
}
function hideMessage() {
    message.classList.add("d-none");
    if (message.classList.contains("success")) {
        message.classList.remove("success");
    } else {
        message.classList.remove("error");
    }
}

function enableForm(action) {
    const inputs = loginForm.querySelectorAll("input");
    const submitBtn = loginForm.querySelector("button[type='submit']");

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = action ? false : true;
        console.log(inputs[i]);
    }
    submitBtn.disabled = action ? false : true;
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    hideMessage();
    const email = loginForm.querySelector("input#email").value;
    const password = loginForm.querySelector("input#password").value;
    enableForm(false);
    console.log(email, password);
    // calling ajax
    setTimeout(() => {
        let res = false;

        if (res) {
            showMessage("Login Successfully", true);
            setTimeout(() => {
                window.open("index.html", "_parent");
            }, 1000);
        } else {
            showMessage("Invalid Email or Password", false);
            enableForm(true);
        }
    }, 2000);
});
