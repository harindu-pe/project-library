// modal
const openModalButtons = document.querySelectorAll(`[data-modal-target]`);
const closeModalButtons = document.querySelectorAll(`[data-close-button]`);

// overlay
const overlay = document.getElementById("overlay");
overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

// open modal button logic
openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

// close modal button logic
closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

// open modal function
function openModal(modal) {
  if (modal === null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

// close modal function
function closeModal(modal) {
  if (modal === null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

// reference html elements (form and card container)
const addBooks = document.querySelector(".input-form");
const cardContainer = document.querySelector(".book-card-container");

// book class
class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = "0",
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

// array to store books
let myLibrary = [];

// function to add book
function addBook(e) {
  // prevent page from refreshing
  e.preventDefault();

  // get the info from the form
  const title = this.querySelector("[name=form-title]").value;
  const author = this.querySelector("[name=form-author]").value;
  const pages = this.querySelector("[name=form-pages]").value;
  const checkbox = this.querySelector("[name=form-checkbox]").checked;

  // book class
  const book = new Book(title, author, pages, checkbox);

  // add book to library
  myLibrary.push(book);

  // populate book cards
  populateCards(myLibrary, cardContainer);

  // reset form
  this.reset();

  //close modal
  const modal = document.querySelector("#modal");
  closeModal(modal);
}

// function to populate cards
function populateCards(library = [], cardContainer) {
  cardContainer.innerHTML = library
    .map((book, i) => {
      return `
    <div class="card">
      <div class="card-row">
          <label for="card-title">Title</label>
          <div id="card-title">${book.title}</div>
      </div>
      <div class="card-row">
          <label for="card-author">Author</label>
          <div id="card-author">${book.author}</div>
      </div>
      <div class="card-row">
          <label for="card-pages">Pages</label>
          <div id="card-pages">${book.pages}</div>
      </div>
      <button onclick="toggleRead(${i})" data-read=${i} class="${
        book.isRead ? "button-read" : "button-notRead"
      }">${book.isRead ? "Read" : "Not Read"}</button>
      <button onclick="removeCard(${i})" data-remove=${i} class="button-remove">Remove</button>
    </div>
    `;
    })
    .join("");
}

// form submission logic
addBooks.addEventListener("submit", addBook);

// book card button logic
function toggleRead(index) {
  // update my library
  myLibrary[index].isRead = !myLibrary[index].isRead;

  // update html
  populateCards(myLibrary, cardContainer);
}

function removeCard(index) {
  // update my library
  myLibrary.splice(index, 1);

  // update html
  populateCards(myLibrary, cardContainer);
}
