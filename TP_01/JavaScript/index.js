const showPopup = document.querySelector(".homepageBtns");
const popupContainer = document.querySelector(".popup-container");
const closeBtn = document.querySelector("#close-button");

showPopup.onclick = () => {
  popupContainer.classList.add("active");
};

closeBtn.onclick = () => {
  popupContainer.classList.remove("active");
};

// sign up form (my head hurts from this ouchiiii im so tired)
const registerBtn = document.getElementById("register-button");
const loginBtn = document.getElementById("login-button");
const usernameInput = document.getElementById("username-input").value;
const passwordInput = document.getElementById("password-input").value;
const form = document.getElementById("main-form");

registerBtn.onclick = (event) => {
  event.preventDefault(); // prevent the default form submission
  const usernameInput = document.getElementById("username-input").value;
  const passwordInput = document.getElementById("password-input").value;

  if (localStorage.getItem(usernameInput)) {
    alert("Username already exists. Please choose a different username.");
    return;
  }
  localStorage.setItem(usernameInput, passwordInput);
};

loginBtn.onclick = (event) => {
  event.preventDefault(); // prevent the default form submission
  const usernameInput = document.getElementById("username-input").value;
  const passwordInput = document.getElementById("password-input").value;
  const creditsError = document.getElementById("invalid-input");
  const attempts = document.getElementById("error-count");

  if (!localStorage.getItem(usernameInput)) {
    alert("Username does not exist. Please register an account.");
    return;
  }

  if (localStorage.getItem(usernameInput) === passwordInput) {
    alert("Login successful!");
    window.location.href = "accueil.html";
  } else {
    creditsError.style.display = "block";
    attempts.innerHTML = parseInt(attempts.innerHTML) - 1;

    setTimeout(() => {
      creditsError.style.display = "none";
    }, 10000);

    if (attempts.innerHTML === "0") {
      alert("please wait a few seconds before trying again.");
      loginBtn.disabled = true;

      setTimeout(() => {
        loginBtn.disabled = false;
        attempts.innerHTML = "3";
      }, 3000);
    }
  }
};

document.addEventListener('keydown', event => {
  if (event.key === "Escape") {
    popupContainer.classList.remove("active");
  }
});
