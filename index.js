const initialCards = [
  (object7 = {
    name: "Golden Gate Bridge",
    link: "   https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  }),
  (object1 = {
    name: "Val Thorens",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  }),
  (object2 = {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  }),
  (object3 = {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  }),
  (object4 = {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  }),
  (object5 = {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  }),
  (object6 = {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  }),
];

const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__button-secondary");
const editModal = document.querySelector("#edit-modal");
const editModalCloseButton = editModal.querySelector(".modal__button");
const editFormElement = editModal.querySelector(".modal__form");
const editNameInput = editModal.querySelector("#profile-name");
const editJobInput = editModal.querySelector("#profile-description");

const profilePostButton = document.querySelector(".profile__button-primary");
const postModal = document.querySelector("#post-modal");
const postModalElement = postModal.querySelector(".modal__form");
const postModalCloseButton = postModal.querySelector(".modal__button");
const postLinkInput = postModal.querySelector("#image-link");
const postCaptionInput = postModal.querySelector("#newpost-caption");

const previewModal = document.querySelector("#preview-modal");
const previewCloseButton = previewModal.querySelector(
  ".modal__close-icon_type_preview"
);
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

function showModal() {
  editModal.classList.add("modal_opened");
  editNameInput.value = profileNameElement.textContent;
  editJobInput.value = profileJobElement.textContent;
}

function hideModal() {
  [editModal, postModal, previewModal].forEach((modal) => {
    modal.classList.remove("modal_opened");
  });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileNameElement.textContent = editNameInput.value;
  profileJobElement.textContent = editJobInput.value;

  hideModal();
}

const handleNewPostSubmit = (evt) => {
  evt.preventDefault();

  const inputValues = {
    name: postCaptionInput.value,
    link: postLinkInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardList.prepend(cardElement);

  hideModal();
};

profileEditButton.addEventListener("click", showModal);
profilePostButton.addEventListener("click", () => {
  postModal.classList.add("modal_opened");
});
[editModalCloseButton, postModalCloseButton, previewCloseButton].forEach(
  (button) => {
    button.addEventListener("click", hideModal);
  }
);
editFormElement.addEventListener("submit", handleProfileFormSubmit);
postModalElement.addEventListener("submit", handleNewPostSubmit);

const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards");

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

  cardLike.addEventListener("click", () => {
    cardLike.classList.toggle("card__icon_liked");
  });

  cardImageEl.addEventListener("click", () => {
    previewModal.classList.add("modal_opened");
    previewModalCaption.textContent = data.name;
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
  });

  cardDelete.addEventListener("click", () => {
    cardElement.remove();
  });
  return cardElement;
}

// for (let i = 0; i < initialCards.length; i++) {
//   const cardElement = getCardElement(initialCards[i]);
//   cardList.prepend(cardElement);
// }

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardList.append(cardElement);
});
