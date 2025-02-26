const gallery = document.getElementById("gallery")
const addArtworkBtn = document.getElementById("addArtwork")
const clearAllBtn = document.getElementById("clearAll")
const titleInput = document.getElementById("titleInput")
const descInput = document.getElementById("descInput")
const imageUrlInput = document.getElementById("imageUrl")

let artworks = [
  {
    title: "Звездная ночь",
    image: "assets/vangog.jpg",
    description:
      "Знаменитая картина Винсента Ван Гога, написанная в 1889 году.",
  },
  {
    title: "Мона Лиза",
    image: "assets/liza.jpg",
    description:
      "Портрет, написанный Леонардо да Винчи, одно из самых известных произведений искусства.",
  },
  {
    title: "Крик",
    image: "assets/krik.jpg",
    description: "Картина Эдварда Мунка, выражающая тревогу и беспокойство.",
  },
];

// Функция для карточки
function createCard(title, description, imageUrl) {
  const card = document.createElement("div")
  card.classList.add("art-card");

  const photo = document.createElement("div")
  photo.classList.add("photo")
  if ((imageUrl)) {
    photo.style.backgroundImage = `url(${imageUrl})`
  }

  const info = document.createElement("div")
  info.classList.add("info")

  const titleElem = document.createElement("p")
  titleElem.classList.add("title")
  titleElem.textContent = title

  const descElem = document.createElement("p")
  descElem.classList.add("description")
  descElem.textContent = description

  const likeBtn = document.createElement("button")
  likeBtn.textContent = "❤️"
  likeBtn.classList.add("like-btn")
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("liked")
    card.classList.toggle("highlighted")
  })

  const deleteBtn = document.createElement("button")
  deleteBtn.textContent = "🗑️"
  deleteBtn.classList.add("delete-btn")
  deleteBtn.addEventListener("click", () => {
    card.remove()
    artworks = artworks.filter((art) => art.title !== title)
  })

  info.append(titleElem, descElem, likeBtn, deleteBtn)
  card.append(photo, info)
  gallery.appendChild(card)
}

// очистка всех карточек
function clearAllCards() {
  gallery.innerHTML = ""
  artworks = []
}

function renderGallery() {
  gallery.innerHTML = ""
  artworks.sort((a, b) => a.title.localeCompare(b.title))
  artworks.forEach((art) => createCard(art.title, art.description, art.image))
}
renderGallery()

addArtworkBtn.addEventListener("click", () => {
  const title = titleInput.value.trim()
  const description = descInput.value.trim()
  const imageUrl = imageUrlInput.value.trim()

  if (!title || !description || !imageUrl) {
    alert("Заполните все поля!");
    return;
  }
  if (title.length > 100 || description.length > 100) {
    alert("Заголовок и описание не должны превышать 100 символов!")
    return;
  }

  artworks.push({ title, description, image: imageUrl })
  renderGallery()

  titleInput.value = ""
  descInput.value = ""
  imageUrlInput.value = ""
});

clearAllBtn.addEventListener("click", clearAllCards)
