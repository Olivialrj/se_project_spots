const initialCards = [
  (object1 = {
    name: "A building with signs",
    link: "http://unsplash.com/photos/a-building-with-a-lot-of-signs-on-the-side-of-it-qt3IKanoH50",
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
const cardTemplate = document.querySelector("#card-template");

function showModal() {
  editModal.classList.add("modal_opened");
  editNameInput.value = profileNameElement.textContent;
  editJobInput.value = profileJobElement.textContent;
}

function hideModal() {
  editModal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileNameElement.textContent = editNameInput.value;
  profileJobElement.textContent = editJobInput.value;

  hideModal();
}
const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".card__list");
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card_caption");
  cardNameEl.textContent = data.name;

  return cardElement;
}

profileEditButton.addEventListener("click", showModal);
editModalCloseButton.addEventListener("click", hideModal);
editFormElement.addEventListener("submit", handleProfileFormSubmit);

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardList.prepend(cardElement);
}
