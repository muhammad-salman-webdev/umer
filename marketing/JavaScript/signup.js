"use strict";
const message = document.getElementById("alert-message");

const navigator = document.getElementById("signup-navigator");

const forms = document.getElementById("signup-multiple-forms");
const namesForm = forms.querySelector("form.form-1");
const paymentForm = forms.querySelector("form.form-2");
const emailForm = forms.querySelector("form.form-3");
const phoneNoForm = forms.querySelector("form.form-4");
const passwordForm = forms.querySelector("form.form-5");
const welcomeSection = forms.querySelector(".welcome-section");

const actionBtn = document.getElementById("actionBtn");

let signupStep = 1;

// Adding profile img
const profileImgContainer = document.getElementById("profile-img-container");
const profileImg = profileImgContainer.querySelector("div.img");
const imgInput = profileImgContainer.querySelector("input[type='file']");
const removeText = profileImgContainer.querySelector(".remove-photo");
const changeText = profileImgContainer.querySelector(
    "div > label.change-photo"
);
const maleInput = document.getElementById("male");
const femaleInput = document.getElementById("female");

let customImg = false;
let gender = "male";

let infoData = {};
let customPhoto = "";

maleInput.addEventListener("change", () => {
    gender = "male";
    updateDemiPhoto();
});

femaleInput.addEventListener("change", () => {
    gender = "female";
    updateDemiPhoto();
});

function updateDemiPhoto() {
    if (!customImg) {
        profileImg.style.backgroundImage = `url(${profileImg.getAttribute(
            gender === "male" ? "maleImgUrl" : "femaleImgUrl"
        )})`;
        customImg = false;
    }
}

removeText.addEventListener("click", () => {
    customImg = false;
    updateDemiPhoto();
    removeText.classList.add("d-none");
    changeText.classList.remove("d-none");
});
function previewFile() {
    const file = imgInput.files[0];
    const reader = new FileReader();

    reader.addEventListener(
        "load",
        () => {
            profileImg.style.backgroundImage = `url(${reader.result})`;
            customPhoto = reader.result;
        },
        false
    );
    if (file) {
        reader.readAsDataURL(file);
    }

    if (!customImg) {
        removeText.classList.remove("d-none");
        changeText.classList.add("d-none");
    }
    customImg = true;
}
imgInput.addEventListener("change", () => {
    previewFile();
});
// ----------

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
        signupStep === 6 ? "welcome" : `step-${signupStep}`
    );
    forms.classList.add(signupStep === 6 ? "welcome" : `step-${signupStep}`);
    if (signupStep === 6) {
        actionBtn.querySelector("span").textContent = "Finish!";
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

namesForm.addEventListener("submit", (e) => {
    e.preventDefault();
    disabledForm(namesForm, false);
    toggleForm();
    // // use the AJAX and perform actions on the boolean value as the response from the backend
    let res = true;
    setTimeout(() => {
        //... calling ajax
        // let the answer of ajax call is true, remember the answer will in the boolean type
        // res = true;
        if (res) {
            toggleForm();
            navigateNext();
            console.log("First Form Done!");
        } else {
            disabledForm(namesForm, true);
            toggleForm();
            namesForm.reset();
            showMessage("There is an error in the Database", false);
        }
    }, 2000);
});

paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    disabledForm(paymentForm, false);
    toggleForm();
    // // use the AJAX and perform actions on the boolean value as the response from the backend
    let res = true;
    setTimeout(() => {
        //... calling ajax
        // let the answer of ajax call is true, remember the answer will in the boolean type
        // res = true;
        if (res) {
            toggleForm();
            navigateNext();
            console.log("Second Form Done!");
        } else {
            disabledForm(paymentForm, true);
            toggleForm();
            namesForm.reset();
            showMessage("Please make sure all the IDs correct!", false);
        }
    }, 2000);
});
let emailEntered = false;
emailForm.addEventListener("submit", (e) => {
    e.preventDefault();
    disabledForm(emailForm, false);
    toggleForm();
    let res = false;

    if (!emailEntered) {
        // // use the AJAX and perform actions on the boolean value as the response from the backend
        setTimeout(() => {
            //... calling ajax
            // let the answer of ajax call is true, remember the answer will in the boolean type
            res = true;
            if (res) {
                toggleForm();
                hideMessage();
                disabledForm(emailForm, true);
                emailForm.querySelector("input#confirm-email").required = true;
                emailForm
                    .querySelector(".input-group.d-none")
                    .classList.add("confirm-email-pin");
                emailForm
                    .querySelector(".input-group.d-none")
                    .classList.remove("d-none");
                emailForm.querySelector("input[type='email']").disabled = true;
                emailEntered = true;
            } else {
                disabledForm(emailForm, true);
                toggleForm();
                emailForm.reset();
                showMessage("Please change the email.", false);
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
                emailForm.querySelector("input#confirm-email").disabled = false;
                emailForm.querySelector("input#confirm-email").value = "";
                showMessage("Entered PinCode is not correct!", false);
            }
        }, 2000);
    }
});

emailForm
    .querySelector(".input-group .confirm-message span")
    .addEventListener("click", () => {
        disabledForm(emailForm, true);
        emailForm.querySelector("input#email").value = "";
        emailForm.querySelector("input#confirm-email").required = false;
        emailForm.querySelector("input#confirm-email").value = "";

        emailForm
            .querySelector(".input-group.confirm-email-pin")
            .classList.add("d-none");
        emailForm
            .querySelector(".input-group.confirm-email-pin")
            .classList.remove("confirm-email-pin");

        emailEntered = false;
        hideMessage();
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
                showMessage("Please enter a correct and valid number.", false);
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
            namesForm.querySelector("button[type='submit']").click();
            break;
        case 2:
            paymentForm.querySelector("button[type='submit']").click();
            break;
        case 3:
            emailForm.querySelector("button[type='submit']").click();
            break;
        case 4:
            phoneNoForm.querySelector("button[type='submit']").click();
            break;
        case 5:
            passwordForm.querySelector("button[type='submit']").click();
            break;
        case 6:
            window.open("index.html", "_parent");
            break;
    }
});
