const form = document.querySelector("#contact-form");
const firstName = document.querySelector("#firstName");
const firstNameError = document.querySelector("#firstName-error");
const lastName = document.querySelector("#lastName");
const lastNameError = document.querySelector("#lastName-error");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");
const formMessage = document.querySelector("#message");
const formMessageError = document.querySelector("#message-error");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const guide = document.querySelector(".success-message");

function validateForm(event) {
    event.preventDefault();

    if (checkLength(firstName.value, 2) === true) {
        firstNameError.style.display = "none";
    } else {
        firstNameError.style.display = "block";
    }

    if (checkLength(lastName.value, 4) === true) {
        lastNameError.style.display = "none";
    } else {
        lastNameError.style.display = "block";
    }

    if (checkLength(subject.value, 14) === true) {
        subjectError.style.display = "none";
    } else {
        subjectError.style.display = "block";
    }
    
    if (checkLength(formMessage.value, 24) === true) {
        formMessageError.style.display = "none";
    } else {
        formMessageError.style.display = "block";
    }

    if (validateEmail(email.value) === true) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
    }

    if (checkLength(firstName.value, 2) && checkLength(lastName.value, 4) && checkLength(subject.value, 14) && checkLength(formMessage.value, 24) && validateEmail(email.value)) {
        firstName.value = "";
        lastName.value = "";
        subject.value = "";
        formMessage.value = "";
        email.value = "";

        guide.innerHTML = `<p class="success">Thank you for your request. We will answer you as soon as possible.</p>`;
    }
}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
} 

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}