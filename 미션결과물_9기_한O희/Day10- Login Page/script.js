function login() {
  var predefinedUsername = "0000"; // 임의의 ID 값 설정
  var predefinedPassword = "aa1@"; // 임의의 비밀번호 값 설정

  var enteredUsername = document.getElementById("username").value;
  var enteredPassword = document.getElementById("password").value;

  UserMessage();
  PassMessage();

  if (
    enteredUsername === predefinedUsername &&
    enteredPassword === predefinedPassword
  ) {
    // 로그인 성공 시 토스트 팝업 표시
    showToast("로그인이 되었습니다.\n 홈으로 이동합니다!");

    setTimeout(function () {
      // 2초후 페이지 이동
      window.location.href = "Responsive Navigation.html";
    }, 2000);
  } else {
    // 로그인 실패 시 토스트 팝업 표시
    showToast("아이디 혹은 비밀번호가 잘못되었습니다.\n 다시 입력하세요!");
  }
}

function UserMessage() {
  var usernameInput = document.getElementById("username");
  var userMessage = document.querySelector(".failure-message1");

  var regex = /^[a-zA-Z0-9]+$/; //영어, 숫자만 가능함

  if (!regex.test(usernameInput.value)) {
    userMessage.style.display = "block";
  } else {
    userMessage.style.display = "none";
  }
}

function PassMessage() {
  var passwordInput = document.getElementById("password");
  var passMessage = document.querySelector(".failure-message2");

  var regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/; //영어, 숫자, 숫자가 포함되어야 가능함

  if (!regex.test(passwordInput.value)) {
    passMessage.style.display = "block";
  } else {
    passMessage.style.display = "none";
  }
}

function showToast(message) {
  var toast = document.getElementById("toast");
  toast.textContent = message;
  toast.innerHTML = message.replace(/\n/g, "<br>"); // \n을 <br>로 대체하여 HTML 줄바꿈 처리

  toast.style.display = "block";

  // 일정 시간 후에 토스트 팝업 숨김
  setTimeout(function () {
    toast.style.display = "none";
  }, 2000); // 2000 밀리초 (2초) 후에 숨김
}
