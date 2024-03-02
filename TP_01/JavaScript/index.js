const showPopup = document.querySelector(".homepageBtns");
const popupContainer = document.querySelector(".popup-container");
const closeBtn = document.querySelector("#close-button");

showPopup.onclick = () => {
  popupContainer.classList.add("active");
}

closeBtn.onclick = () => {
  popupContainer.classList.remove("active");
}

// sign up form (my head hurts from this ouchiiii im so tired)