"use strict";
const message = document.getElementById("alert-message");

const navigator = document.getElementById("signup-navigator");

const forms = document.getElementById("signup-multiple-forms");
const emailForm = forms.querySelector("form.form-1");
const phoneNoForm = forms.querySelector("form.form-2");
const passwordForm = forms.querySelector("form.form-3");
const welcomeSection = forms.querySelector(".welcome-section");

const actionBtn = document.getElementById("actionBtn");

let signupStep = 1;

function showMessage(msg, action) {
    message.classList.remove("d-none");
    message.classList.add(action ? "success" : "error");
    message.querySelector("span").textContent = msg;
}
function hideMessage() {
    if (!message.classList.contains("d-none")) {
        message.classList.add("d-none");
        message.classList.remove(
            message.classList.contains("success") ? "success" : "error"
        );
    }
}

function navigateNext() {
    hideMessage();
    signupStep++;
    navigator.classList.add(
        signupStep === 4 ? "welcome" : `step-${signupStep}`
    );
    forms.classList.add(signupStep === 4 ? "welcome" : `step-${signupStep}`);
    if (signupStep === 4) {
        actionBtn.querySelector("span").textContent = "Go to the Account!";
    }
}

function toggleForm() {
    forms.classList.toggle("disabled");
    if (actionBtn.disabled) {
        actionBtn.disabled = false;
    } else {
        actionBtn.disabled = true;
    }
}

function disabledForm(form, action) {
    let inputs = form.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = action ? false : true;
    }
}

emailForm.addEventListener("submit", (e) => {
    e.preventDefault();
    disabledForm(emailForm, false);
    toggleForm();
    let res = false;

    let numberDigit;
    // // use the AJAX and perform actions on the boolean value as the response from the backend
    setTimeout(() => {
        //... calling ajax
        // let the answer of ajax call is true, remember the answer will in the boolean type
        res = true;
        numberDigit = "49";

        if (res) {
            navigateNext();
            toggleForm();
            phoneNoForm
                .querySelector("input#phoneNumber")
                .setAttribute(
                    "placeholder",
                    `Enter phone Number 03*******${numberDigit}`
                );
        } else {
            disabledForm(emailForm, true);
            toggleForm();
            emailForm.reset();
            showMessage("Enter a valid email", false);
        }
    }, 2000);
});

//
let phoneNumberEntered = false;
phoneNoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    disabledForm(phoneNoForm, false);
    toggleForm();
    let res = false;

    if (!phoneNumberEntered) {
        // // use the AJAX and perform actions on the boolean value as the response from the backend
        setTimeout(() => {
            //... calling ajax
            // let the answer of ajax call is true, remember the answer will in the boolean type
            res = true;
            if (res) {
                toggleForm();
                hideMessage();
                disabledForm(phoneNoForm, true);
                phoneNoForm.querySelector(
                    "input#confirm-phoneNumber"
                ).required = true;
                phoneNoForm
                    .querySelector(".input-group.d-none")
                    .classList.add("confirm-phone-pin");
                phoneNoForm
                    .querySelector(".input-group.d-none")
                    .classList.remove("d-none");
                phoneNoForm.querySelector("input#phoneNumber").disabled = true;
                phoneNumberEntered = true;
            } else {
                disabledForm(phoneNoForm, true);
                toggleForm();
                phoneNoForm.reset();
                showMessage(
                    "Enter the Number which you attached while creating the account",
                    false
                );
            }
        }, 2000);
    } else {
        setTimeout(() => {
            //... calling ajax
            // let the answer of ajax call is true, remember the answer will in the boolean type
            res = true;
            if (res) {
                hideMessage();
                toggleForm();
                navigateNext();
                console.log("Fourth Form Done!");
            } else {
                toggleForm();
                phoneNoForm.querySelector("input#phoneNumber").disabled = false;
                phoneNoForm.querySelector("input#phoneNumber").value = "";
                showMessage("Entered PinCode is not correct!", false);
            }
        }, 2000);
    }
});

phoneNoForm
    .querySelector(".input-group .confirm-message span")
    .addEventListener("click", () => {
        disabledForm(phoneNoForm, true);
        phoneNoForm.querySelector("input#phoneNumber").value = "";
        phoneNoForm.querySelector("input#confirm-phoneNumber").required = false;
        phoneNoForm.querySelector("input#confirm-phoneNumber").value = "";

        phoneNoForm
            .querySelector(".input-group.confirm-phone-pin")
            .classList.add("d-none");
        phoneNoForm
            .querySelector(".input-group.confirm-phone-pin")
            .classList.remove("confirm-phone-pin");

        phoneNumberEntered = false;
        hideMessage();
    });

passwordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const password = passwordForm.querySelector("input#password").value;
    const cPassword = passwordForm.querySelector(
        "input#confirm-password"
    ).value;

    if (password === cPassword) {
        disabledForm(passwordForm, false);
        toggleForm();
        hideMessage();
        // // use the AJAX and perform actions on the boolean value as the response from the backend
        let res = true;
        setTimeout(() => {
            //... calling ajax
            // let the answer of ajax call is true, remember the answer will in the boolean type
            res = true;
            if (res) {
                toggleForm();
                navigateNext();
                console.log("fifth Form Done!");
            } else {
                disabledForm(passwordForm, true);
                toggleForm();
                namesForm.reset();
                showMessage("Please enter a valid password.", false);
            }
        }, 2000);
    } else {
        showMessage("Please enter the same passwords in the fields.", false);
    }
});

actionBtn.addEventListener("click", () => {
    switch (signupStep) {
        case 1:
            emailForm.querySelector("button[type='submit']").click();
            break;
        case 2:
            phoneNoForm.querySelector("button[type='submit']").click();
            break;
        case 3:
            passwordForm.querySelector("button[type='submit']").click();
            break;
        case 4:
            window.open("index.html", "_parent");
            break;
    }
});
