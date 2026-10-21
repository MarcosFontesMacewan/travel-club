document.addEventListener("DOMContentLoaded", function () {

  const inputs = document.querySelectorAll("#username, #email, #password, #terms");

  inputs.forEach(function (input) {
    input.addEventListener("focus", function () {
      input.style.backgroundColor = "#fffae0";
    });
    input.addEventListener("blur", function () {
      input.style.backgroundColor = "";
    });
  });

  const form = document.getElementById("signup-form");

  const username = document.getElementById("username");
  const email    = document.getElementById("email");
  const password = document.getElementById("password");
  const terms    = document.getElementById("terms");

  const usernameError = document.getElementById("error-username");
  const emailError    = document.getElementById("error-email");
  const passwordError = document.getElementById("error-password");
  const termsError    = document.getElementById("error-terms");


  function setFieldState(field, errorSpan, message) {
    if (message) {
      errorSpan.textContent = message;      
      errorSpan.style.display = "block";    
      field.classList.add("error-border");
      return false;
    }
    errorSpan.textContent = "";             
    errorSpan.style.display = "none";       
    field.classList.remove("error-border");
    return true;
  }


  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let allValid = true;

    const usernameValue = username.value.trim();
    allValid = setFieldState(
      username,
      usernameError,
      usernameValue === "" ? "Username is required" : ""
    ) && allValid;

    const emailValue = email.value.trim();
    let emailMsg = "";
    if (emailValue === "" || !isValidEmail(emailValue)) {
      emailMsg = "Enter a valid email address";
    }
    allValid = setFieldState(email, emailError, emailMsg) && allValid;

    let passwordMsg = "";
    if (password.value.length < 8) {
      passwordMsg = "Password must be at least 8 characters";
    }
    allValid = setFieldState(password, passwordError, passwordMsg) && allValid;

    const termsMsg = terms.checked ? "" : "You must accept the terms";
    allValid = setFieldState(terms, termsError, termsMsg) && allValid;

    if (allValid) {
      let success = document.getElementById("success-message");
      if (!success) {
        success = document.createElement("p");
        success.id = "success-message";
        success.style.color = "green";
        form.appendChild(success);
      }
      success.textContent = "Registration successful! Welcome to the club.";
      success.style.display = "block";
    } else {
      const success = document.getElementById("success-message");
      if (success) {
        success.style.display = "none";
        success.textContent = "";
      }
    }
  });

  const thumbs = document.querySelectorAll(".thumb");
const captionEl = document.getElementById("image-caption");


function selectTile(tile) {
  
  thumbs.forEach(function (t) {
    t.classList.remove("expanded");
  });

  tile.classList.add("expanded");

  const city = tile.dataset.city;             
  captionEl.textContent = "This shot is from " + city;
}

thumbs.forEach(function (tile) {
  tile.addEventListener("click", function () {
    selectTile(tile);          
  });


  tile.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();   
      selectTile(tile);
    }
  });
});
});