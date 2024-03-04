let currentIndex = 0;

function showSlide(index) {
  const wrapper = document.querySelector(".carousel-wrapper");
  const items = document.querySelectorAll(".carousel-item");
  const totalItems = items.length;

  if (index >= totalItems) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = totalItems - 1;
  } else {
    currentIndex = index;
  }

  const translateValue = -currentIndex * 100 + "%";
  wrapper.style.transform = "translateX(" + translateValue + ")";
}

// Clone the first and last elements.
const cloneElement = () => {
  list.prepend(items[lastIndex].cloneNode(true));
  list.append(items[0].cloneNode(true));
  setTranslate({ reset: true });
};

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}
