// script.js
let timer;
let hoursInput = document.getElementById("hours");
let minutesInput = document.getElementById("minutes");
let secondsInput = document.getElementById("seconds");
let timerDisplay = document.getElementById("timerDisplay");
let inputSection = document.getElementById("inputSection");
let timerSection = document.getElementById("timerSection");

let paused = false;

let count = 0; // 타이머 상태 카운터 (0: 초기, 1: 일시정지/재시작)
function startTimer() {
  clearInterval(timer); // 이전 타이머 정리

  if (count == 0) {
    //초기 시작
    inputSection.style.display = "none";
    timerDisplay.style.display = "block";

    // 입력된 시간을 가져와서 초로 계산
    let hours = parseInt(hoursInput.value) || 0;
    let minutes = parseInt(minutesInput.value) || 0;
    let seconds = parseInt(secondsInput.value) || 0;
    totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

    // 1초 간격으로 타이머 감소
    timer = setInterval(function () {
      if (totalTimeInSeconds <= 0) {
        clearInterval(timer);
        alert("타이머 종료!");
        resetTimer();
      } else {
        let formattedTime = formatTime(totalTimeInSeconds);
        timerDisplay.textContent = formattedTime;
        totalTimeInSeconds--;
      }
    }, 1000);
  } else if (count == 1) {
    // 일시정지 후 재시작
    count = 0;
    timer = setInterval(function () {
      if (totalTimeInSeconds <= 0) {
        clearInterval(timer);
        alert("타이머 종료!"); //타이머 종료 알람
        resetTimer();
      } else {
        let formattedTime = formatTime(totalTimeInSeconds);
        timerDisplay.textContent = formattedTime;
        totalTimeInSeconds--;
      }
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timer);
  count = 1; // 일시정지 상태로 전환
}

function resetTimer() {
  //초기화
  inputSection.style.display = "block";
  timerDisplay.style.display = "none";
  hoursInput.value = 0;
  minutesInput.value = 0;
  secondsInput.value = 0;

  clearInterval(timer);
  timer = null;
  timerDisplay.textContent = "00:00:00";
}

function formatTime(seconds) {
  // 초를 시, 분, 초로 변환하여 포맷팅
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;

  return (
    padZero(hours) + ":" + padZero(minutes) + ":" + padZero(remainingSeconds)
  );
}

function padZero(num) {
  // 숫자가 10 미만일 때 앞에 0을 추가하는 함수
  return (num < 10 ? "0" : "") + num;
}
