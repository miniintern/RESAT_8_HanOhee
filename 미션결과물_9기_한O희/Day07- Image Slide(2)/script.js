const wrapper = document.querySelector(".slide-wrapper");
const items = document.querySelectorAll(".slide-item");
const totalItems = items.length;

// 첫장, 마지막장 슬라이드 클론 카피
let firstChild = wrapper.firstElementChild;
let lastChild = wrapper.lastElementChild;
let clonedFirst = firstChild.cloneNode(true);
let clonedLast = lastChild.cloneNode(true);

// 첫장 카피를 마지막 페이지에, 마지막장 카피를 첫페이지에 삽입
wrapper.appendChild(clonedFirst);
wrapper.insertBefore(clonedLast, wrapper.firstElementChild);

wrapper.style.width = `${100 * (totalItems + 2)}%`; //카피가 추가된 슬라이드 넓이

let currentIndex = 0; //현재 페이지
let translateValue;
wrapper.style.transform = "translateX(-100%)"; //마지막 복제 넘어가서 첫 이미지

function nextSlide() {
  if (currentIndex < totalItems - 1) {
    currentIndex++;
    wrapper.style.transition = "2000ms";
    translateValue = -(currentIndex + 1) * 100 + "%";
    wrapper.style.transform = "translateX(" + translateValue + ")";
  } else {
    currentIndex++;
    wrapper.style.transition = "2000ms";
    translateValue = -(currentIndex + 1) * 100 + "%";
    wrapper.style.transform = "translateX(" + translateValue + ")";
    currentIndex = 0; //첫페이지로 돌아감
    setTimeout(function () {
      wrapper.style.transition = "0ms";
      translateValue = -(currentIndex + 1) * 100 + "%";
      wrapper.style.transform = "translateX(" + translateValue + ")";
    }, 2000);
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    wrapper.style.transition = "2000ms";
    translateValue = -(currentIndex + 1) * 100 + "%";
    wrapper.style.transform = "translateX(" + translateValue + ")";
  } else {
    currentIndex--;
    wrapper.style.transition = "2000ms";
    wrapper.style.transform = "translateX(0%)";
    currentIndex = totalItems - 1; //마지막 페이지로 돌아감
    setTimeout(function () {
      wrapper.style.transition = "0ms";
      translateValue = -(currentIndex + 1) * 100 + "%";
      wrapper.style.transform = "translateX(" + translateValue + ")";
    }, 2000);
  }
}

let intervalId; // 자동 슬라이드를 제어하기 위한 변수

function startAutoSlide() {
  intervalId = setInterval(nextSlide, 2200); // 2.2초마다 다음 슬라이드로 이동
}

function stopAutoSlide() {
  clearInterval(intervalId); // 자동 슬라이드 중지
}

// 페이지 로드 시 자동 슬라이드 시작
startAutoSlide();

// 마우스가 슬라이드 영역에 들어가면 자동 슬라이드 중지
wrapper.addEventListener("mouseenter", stopAutoSlide);

// 마우스가 슬라이드 영역에서 나가면 자동 슬라이드 재시작
wrapper.addEventListener("mouseleave", startAutoSlide);
