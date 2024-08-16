document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInpunt = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");
  const visiblePassBtn = document.getElementById("show-hide-pass");
  const visibleConfPassBtn = document.getElementById("show-hide-conf-pass");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    validateForm();
  });

  emailInpunt.addEventListener("blur", function () {
    validateEmail();
  });

  emailInpunt.addEventListener("change", function () {
    clearError(emailError);
  });

  passwordInput.addEventListener("change", function () {
    clearError(passwordError);
  });

  confirmPasswordInput.addEventListener("change", function () {
    clearError(confirmPasswordError);
  });

  visiblePassBtn.addEventListener("click", function () {
    if (passwordInput.type == "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });

  visibleConfPassBtn.addEventListener("click", function () {
    if (confirmPasswordInput.type == "password") {
      confirmPasswordInput.type = "text";
    } else {
      confirmPasswordInput.type = "password";
    }
  });

  function validateForm() {
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();
    const passwordMatch = validatePasswordMatch();

    if (isValidEmail && isValidPassword && passwordMatch) {
      saveToLocalStorage();
      alert("ingresaste con exito");
    }
  }

  function validateEmail() {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const emailValue = emailInpunt.value.trim();

    if (!emailRegex.test(emailValue)) {
      showError(emailError, "Ingresa un email valido.");
      return false;
    }
    return true;
  }

  function validatePassword() {
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    const passwordValue = passwordInput.value.trim();

    if (!passRegex.test(passwordValue)) {
      showError(
        passwordError,
        "La contraseña de al menos 8 caracteres, una minúscula, una mayúscula, un número y un caracter especial."
      );
      return false;
    }
    return true;
  }

  function validatePasswordMatch() {
    const passwordValue = passwordInput.value.trim();
    const confirmPasswordValue = confirmPasswordInput.value.trim();

    if (passwordValue != confirmPasswordValue) {
      showError(confirmPasswordError, "Las contraseñas no coinciden.");
      return false;
    }
    return true;
  }

  function showError(errorElement, message) {
    errorElement.innerHTML = message;
    errorElement.style.display = "block";
  }

  function clearError(errorElement) {
    errorElement.innerHTML = "";
    errorElement.style.display = "none";
  }

  function saveToLocalStorage() {
    const emailValue = emailInpunt.value.trim();
    localStorage.setItem("email", emailValue);
    const body = bodyBuilderJSON();
    console.log(body);
  }

  function bodyBuilderJSON() {
    return {
      email: emailInpunt.value,
      password: passwordInput.value,
    };
  }
});
