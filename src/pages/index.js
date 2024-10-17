import {
  enableValidation,
  settings,
  disabledButton,
} from "../scripts/validation.js";
import "./index.css";
import headerLogo from "../images/Logo.svg";
import editLogo from "../images/pencil-icon.svg";
import newLogo from "../images/plus-icon.svg";
import closeLogo from "../images/close-icon.svg";
import whiteCloseLogo from "../images/close-icon-white.svg";
import whitePencil from "../images/pencil-white.svg";
import avatarImg from "../images/avatar.jpg";
import Api from "../scripts/Api.js";

const headerLogoImg = document.getElementById("header-logo");
const editPostLogo = document.getElementById("edit-post");
const newPostLogo = document.getElementById("new-post");
const editClose = document.getElementById("edit-close-icon");
const newClose = document.getElementById("new-close-icon");
const avatarImage = document.getElementById("avatar-img");
const deleteClose = document.getElementById("delete-close-icon");
const editAvatar = document.getElementById("edit-avatar-icon");
const avatarClose = document.getElementById("avatar-modal-close");

headerLogoImg.src = headerLogo;
editPostLogo.src = editLogo;
newPostLogo.src = newLogo;
editClose.src = closeLogo;
newClose.src = closeLogo;
avatarImage.src = avatarImg;
editAvatar.src = whitePencil;
avatarClose.src = closeLogo;
deleteClose.src = whiteCloseLogo;
// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "   https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2a33eb51-29e1-461c-a628-84dfa7ed62f0",
    "Content-Type": "application/json",
  },
});
//destructure the second item in the callback of the .then()
api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardList.append(cardElement);
    });
    profileNameElement.textContent = userInfo.name;
    profileJobElement.textContent = userInfo.about;
    avatarElement.src = userInfo.avatar;
  })
  .catch((err) => {
    console.error(err);
  });
//modal elements
const modals = document.querySelectorAll(".modal");
const avatarElement = document.querySelector(".profile__avatar");
const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__button-secondary");
const profilePostButton = document.querySelector(".profile__button-primary");

//Edit Elements
const editModal = document.querySelector("#edit-modal");
const editModalCloseButton = editModal.querySelector(".modal__button");
const editModalSubmitButton = editModal.querySelector(
  "#modal__edit-submit-button"
);
const editFormElement = editModal.querySelector("#modal__edit-form");
const editNameInput = editModal.querySelector("#profile-name");
const editJobInput = editModal.querySelector("#profile-description");

//Post Elements
const postModal = document.querySelector("#post-modal");
const postModalCloseButton = postModal.querySelector(".modal__button");
const postFormElement = postModal.querySelector("#modal__post-form");
const postModalSubmitButton = postModal.querySelector(
  "#modal__post-submit-button"
);
const postLinkInput = postModal.querySelector("#image-link");
const postCaptionInput = postModal.querySelector("#newpost-caption");

//Preview Card Image Elements
const previewModal = document.querySelector("#preview-modal");
const previewCloseButton = previewModal.querySelector(
  ".modal__close-icon_type_preview"
);
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

//Delete confimation Elements
const deleteModal = document.querySelector("#delete-modal");
const deleteCloseButton = deleteModal.querySelector("#close-icon-delete");
const deleteCloseImage = deleteModal.querySelector("#delete-close-icon");
const deleteCancelButton = deleteModal.querySelector(
  ".modal__delete-type-cancel"
);
const deleteForm = deleteModal.querySelector(".modal__button-container");

//card element
const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards");

//Edit Avatar
const avatarModal = document.querySelector("#avatar-modal");
const avatarModalCloseButton = avatarModal.querySelector(".modal__close-icon");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitButton = avatarModal.querySelector(".modal__button-avatar");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarModalButton = document.querySelector(".profile__avatar-button");

let selectedCard;
let selectedCardId;
console.log(editModalSubmitButton, postModalSubmitButton, avatarSubmitButton);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitbtn = evt.submitter;
  submitbtn.textContent = "Saving...";
  api
    .editUserInfo({ name: editNameInput.value, about: editJobInput.value })
    .then((data) => {
      profileNameElement.textContent = data.name;
      profileJobElement.textContent = data.about;
      disabledButton(editModalSubmitButton, settings);
      hideAllModals();
    })
    .catch(console.error)
    .finally(() => {
      submitbtn.textContent = "Save";
    });
}

const handleNewPostSubmit = (evt) => {
  evt.preventDefault();
  const submitbtn = evt.submitter;
  submitbtn.textContent = "Saving...";
  api
    .newCards({ name: postCaptionInput.value, link: postLinkInput.value })
    .then((data) => {
      const cardElement = getCardElement(data);
      cardList.prepend(cardElement);
      evt.target.reset();
      disabledButton(postModalSubmitButton, settings);
      hideAllModals();
    })
    .catch(console.error)
    .finally(() => {
      submitbtn.textContent = "Save";
    });
};

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitbtn = evt.submitter;
  submitbtn.textContent = "Saving...";

  api
    .updateProfilePicture(avatarInput.value)
    .then((data) => {
      avatarEl.src = data.avatar;
      disabledButton(avatarSubmitButton, settings);
      hideAllModals();
    })
    .catch(console.error)
    .finally(() => {
      submitbtn.textContent = "Save";
    });
}

function showProfileModal() {
  openPopup(editModal);
  editNameInput.value = profileNameElement.textContent;
  editJobInput.value = profileJobElement.textContent;
}

function hideAllModals() {
  [editModal, postModal, previewModal, deleteModal, avatarModal].forEach(
    closePopup
  );
}

[
  editModalCloseButton,
  postModalCloseButton,
  previewCloseButton,
  deleteCloseButton,
  deleteCancelButton,
  deleteCloseImage,
  avatarModalCloseButton,
].forEach((button) => {
  button.addEventListener("click", hideAllModals);
});

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__caption");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLike = cardElement.querySelector(".card__icon");
  const cardDelete = cardElement.querySelector(".card__delete-icon");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLike.addEventListener("click", (evt) => {
    handleLike(evt, data._id, cardLike);
  });
  cardImageEl.addEventListener("click", () => {
    openPopup(previewModal);
    previewModalCaption.textContent = data.name;
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
  });

  cardDelete.addEventListener("click", (evt) => {
    handleDeleteCard(cardElement, data._id);
  });

  return cardElement;
}

function handleLike(evt, id, cardLikeElement) {
  const isLiked = cardLikeElement.classList.contains("card__icon_liked");
  api
    .updateLikeStatus(id, isLiked)
    .then((data) => {
      if (isLiked) {
        cardLikeElement.classList.remove("card__icon_liked");
      } else {
        cardLikeElement.classList.add("card__icon_liked");
      }
    })
    .catch(console.error);
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openPopup(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitbtn = evt.submitter;
  submitbtn.textContent = "Deleting...";
  api
    .removeCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closePopup(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      submitbtn.textContent = "Delete";
    });
}

profileEditButton.addEventListener("click", showProfileModal);
profilePostButton.addEventListener("click", () => {
  openPopup(postModal);
});
deleteForm.addEventListener("submit", handleDeleteSubmit);
editFormElement.addEventListener("submit", handleProfileFormSubmit);
postFormElement.addEventListener("submit", handleNewPostSubmit);
avatarModalButton.addEventListener("click", () => {
  openPopup(avatarModal);
});
avatarForm.addEventListener("submit", handleAvatarSubmit);

modals.forEach((modal) => {
  modal.addEventListener("click", function (evt) {
    if (evt.target === modal) {
      hideAllModals();
    }
  });
});

const handleEscape = (evt) => {
  if (evt.key === "Escape") {
    hideAllModals();
  }
};

enableValidation(settings);
