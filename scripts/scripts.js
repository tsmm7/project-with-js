const gallery = document.getElementById("gallery")
const addArtworkBtn = document.getElementById("addArtwork")
const clearAllBtn = document.getElementById("clearAll")
const titleInput = document.getElementById("titleInput")
const descInput = document.getElementById("descInput")
const imageUrlInput = document.getElementById("imageUrl")
const template = document.getElementById("artworkTemplate")

let artworks = [
  {
    title: "Звездная ночь",
    image: "assets/vangog.jpg",
    description: "Знаменитая картина Винсента Ван Гога, написанная в 1889 году",
  },
  {
    title: "Мона Лиза",
    image: "assets/liza.jpg",
    description:
      "Портрет, написанный Леонардо да Винчи, одно из самых известных произведений искусства",
  },
  {
    title: "Крик",
    image: "assets/krik.jpg",
    description: "Картина Эдварда Мунка, выражающая тревогу и беспокойство",
  },
]

function createCard(title, description, imageUrl) {
  const card = template.content.cloneNode(true)
  card.querySelector(".title").textContent = title
  card.querySelector(".description").textContent = description
  card.querySelector(".photo").style.backgroundImage = `url(${imageUrl})`

  const likeBtn = card.querySelector(".like-btn")
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("liked")
    likeBtn.closest(".art-card").classList.toggle("highlighted")
  })

  const deleteBtn = card.querySelector(".delete-btn")
  deleteBtn.addEventListener("click", () => {
    deleteBtn.closest(".art-card").remove()
    artworks = artworks.filter((art) => art.title !== title)
  })

  gallery.appendChild(card)
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
    alert("Заполните все поля!")
    return;
  }
  if (title.length > 100 || description.length > 100) {
    alert("Заголовок и описание не должны превышать 100 символов!")
    return
  }

  artworks.push({ title, description, image: imageUrl })
  renderGallery()

  titleInput.value = ""
  descInput.value = ""
  imageUrlInput.value = ""
})

clearAllBtn.addEventListener("click", () => {
  gallery.innerHTML = ""
  artworks = []
})
