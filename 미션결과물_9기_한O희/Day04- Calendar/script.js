let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let selectedDate;

// 캘린더 초기화 함수
function initCalendar() {
  showCalendar(currentMonth, currentYear);
}

// 캘린더 표시 함수
function showCalendar(month, year) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const calendarTable = document.getElementById("calendarTable");
  const monthElement = document.getElementById("month");

  monthElement.innerText = `${year}년 ${month + 1}월`;

  let html = "<tr>";
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  for (let day of weekdays) {
    html += `<th>${day}</th>`;
  }

  html += "</tr>";

  let day = 1;
  for (let i = 0; i < 6; i++) {
    html += "<tr>";
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay.getDay()) {
        html += "<td></td>";
      } else if (day > lastDay.getDate()) {
        html += "<td></td>";
      } else {
        // 메모가 있는 날짜에 클래스 추가
        const memoClass = hasMemo(new Date(currentYear, currentMonth, day))
          ? "memo-day"
          : "";
        html += `<td class="${memoClass}" onclick="selectDate(${day})">${day}`;

        // 수정된 부분: 메모가 있는 경우 동그라미 추가
        if (memoClass === "memo-day") {
          html += '<div class="dot"></div>';
        }

        html += "</td>";
        day++;
      }
    }
    html += "</tr>";
  }

  calendarTable.innerHTML = html;
}
// 날짜 선택 함수
function selectDate(day) {
  selectedDate = new Date(currentYear, currentMonth, day);

  updateMemoList(selectedDate);
  showMemoContainer();
}

// 메모 작성 창 표시 함수
function showMemoContainer() {
  memoInput.value = "";
  const memoContainer = document.getElementById("memoContainer");
  memoContainer.style.display = "block";
}
const memos = [];
// 메모 저장 함수
function addMemo() {
  const memoInput = document.getElementById("memoInput");

  const memo = memoInput.value;
  saveMemoToStorage(selectedDate, memo);
  memos.push({
    memo: memo,
  });

  updateMemoList();

  // 수정된 부분: 메모를 등록하는 시점에도 해당 날짜를 파란색으로 표시
  const memoClass = "memo-day";
  const selectedDayElement = document.querySelector(
    `.calendar td[data-day="${selectedDate.getDate()}"]`
  );
  if (selectedDayElement) {
    selectedDayElement.classList.add(memoClass);
  }

  memoInput.value = "";
}

// 메모 창 숨기기 함수
function hideMemoContainer() {
  const memoContainer = document.getElementById("memoContainer");
  memoContainer.style.display = "none";
}

// 메모 저장 함수
function saveMemoToStorage(date, memo) {
  const key = formatDate(date);
  const savedMemo = { memo, date: date.toISOString() };

  // 배열에 객체를 추가
  memos.push(savedMemo);

  localStorage.setItem(key, JSON.stringify(savedMemo));
}

// 불러온 메모 목록에 저장된 날짜와 선택한 날짜가 일치하는 경우에만 목록에 추가
function updateMemoList() {
  let memoListContainer = document.getElementById("memoList");

  memoListContainer.innerHTML = ""; // 목록 초기화

  // 배열에 있는 할 일들을 목록에 추가
  for (let i = 0; i < memos.length; i++) {
    let memoItem = document.createElement("div");
    let savedMemo = memos[i];
    let savedMemoDate = new Date(savedMemo.date);
    memoItem.id = `memoItem_${i}`; // 각 항목에 고유한 ID 부여
    memoItem.innerHTML = `
            <span>${savedMemo.memo}</span>
            <button class="delete_btn" onclick="deleteMemo(${i})">x</button> `;

    if (savedMemoDate.getTime() === selectedDate.getTime()) {
      // 저장된 메모의 날짜와 선택한 날짜가 일치하면 보여줌
      memoListContainer.appendChild(memoItem);
    }
  }

  // 헤더에 선택한 날짜 표시
  memoHeader.innerText = `${selectedDate.getFullYear()}년 ${
    selectedDate.getMonth() + 1
  }월 ${selectedDate.getDate()}일`;
}

// 메모 삭제시
function deleteMemo(index) {
  memos.splice(index, 1); // 배열에서 해당 인덱스의 요소를 제거
  updateMemoList(selectedDate); // 목록 갱신
}

// 날짜 포맷팅 함수
function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
}

// 이전 달 표시 함수
function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  showCalendar(currentMonth, currentYear);
}

// 다음 달 표시 함수
function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  showCalendar(currentMonth, currentYear);
}
// 선택한 날짜에 메모가 있는지 확인하는 함수
function hasMemo(date) {
  return memos.some((memo) => {
    const memoDate = new Date(memo.date);
    return (
      memoDate.getFullYear() === date.getFullYear() &&
      memoDate.getMonth() === date.getMonth() &&
      memoDate.getDate() === date.getDate()
    );
  });
}
// 초기화 함수 호출
initCalendar();
