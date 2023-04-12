const pswrdInputs = document.querySelectorAll(".password-input-group input");

pswrdInputs.forEach((input) => {
    const icon = input.nextElementSibling;
    icon.addEventListener("click", () => {
        if (input.type === "password") {
            input.type = "text";
            icon.title = "Hide Password";
        } else {
            input.type = "password";
            icon.title = "Show Password";
        }
        icon.classList.toggle("fa-eye-slash");
        icon.classList.toggle("fa-eye");
    });
});
