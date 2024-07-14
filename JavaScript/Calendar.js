
const mainContainer = document.querySelector("#main-container");
const monthInputBtn = document.querySelector("#month-input-btn");
const calendarTemplate = document.querySelector("#calendar_template");
const nextMonthBtn = document.querySelector("#next-month-btn");
const preMonthBtn = document.querySelector("#pre-month-btn");
const nowBtn = document.querySelector("#now-btn");
const addEvent = document.querySelector("#add-event");
const editEvent = document.querySelector("#edit-event");
const deleteEvent = document.querySelector("#delete-event");
const plusBtn = document.querySelector("#plus-btn");
const startDateBtn = document.querySelector("#start-date");
const endDateBtn = document.querySelector("#end-date");
const todo = document.querySelector("#todo");
const colorMark = document.querySelector("#color-mark");
const editStartDateBtn = document.querySelector("#edit-start-date");
const editEndDateBtn = document.querySelector("#edit-end-date");
const editTodo = document.querySelector("#edit-todo");
const editColorMark = document.querySelector("#edit-color-mark");
const storageKey = "Calendar";
const now = new Date(Date.now());
now.setHours(0, 0, 0, 0);
let theDate = new Date(now);    //當前畫面時間
let startDate = new Date(now);  //增加事項開始日期
let endDate = new Date(now);  //增加事項結束日期
let editStartDate = new Date(now);  //修改事項開始日期
let editEndDate = new Date(now);  //修改事項結束日期
const maxEventNum = 4; //每天顯示最多
let editId = "";

// localStorage.clear();
// 載入資料
addEventListener("DOMContentLoaded", () => {
    generateCalendar();
});

// 生成日曆
function generateCalendar() {
    // 設定年月份
    monthInputBtn.value = theDate.getFullYear() + "," + new Intl.DateTimeFormat("en-US", { month: "long" }).format(theDate);

    // 清除 .day-list
    const OldDayList = mainContainer.querySelectorAll(".day-list");
    OldDayList.forEach(el => el.remove());

    generateDay();
    generateTodoList();
}

// 生成表格
function generateDay() {
    const theDay = new Date(Date.parse(theDate));
    theDay.setHours(0, 0, 0, 0);
    theDay.setDate(1);
    theDay.setDate(1 - theDay.getDay());

    let isEnd = false;
    const today = calendarTemplate.content
        .querySelector(".today")
        .cloneNode(true);
    while (!isEnd) {
        const dayList = calendarTemplate.content
            .querySelector(".day-list")
            .cloneNode(true);
        for (let day = theDay.getDay() + 1; day < 8; day++) {
            const notToday = calendarTemplate.content
                .querySelector(".notToday")
                .cloneNode(true);
            const theDiv = calendarTemplate.content
                .querySelector(".day")
                .cloneNode(true);
            // 判斷是否當天
            if (theDay.valueOf() === now.valueOf()) {
                today.textContent = theDay.getDate();
                theDiv.prepend(today);
            } else {
                notToday.textContent = theDay.getDate();
                theDiv.prepend(notToday);
            }
            // 非本月份
            if (theDay.getMonth() !== theDate.getMonth()) {
                theDiv.style.color = "#bbb";
            }
            // 新增資訊
            theDiv.dataset.date = `${theDay.getFullYear()}-${theDay.getMonth() + 1}-${theDay.getDate()}`;
            theDay.setDate(theDay.getDate() + 1);

            dayList.append(theDiv);
        }
        mainContainer.append(dayList);
        if (theDay.getMonth() !== theDate.getMonth()) {
            isEnd = true;
        }
    }
}

// 生成代辦事項
function generateTodoList() {
    // 獲取庫資料
    const todoStorage = JSON.parse(localStorage.getItem(storageKey)) || [];

    // 取的每天的DOM
    let allDOM = document.querySelectorAll(".day");

    // 取得日期
    const theDay = new Date(allDOM[0].dataset.date);
    theDay.setHours(0, 0, 0, 0);

    // 生成每天事項
    for (let allDOMIdx = 0; allDOMIdx < allDOM.length; allDOMIdx++) {
        // 獲取資料(依開始日期)
        const theDayDOM = allDOM[allDOMIdx];
        const theDayData = todoStorage.filter(data => data.startDate === dateToNum(theDay));
        theDayData.sort(data => data.duration);

        // 建立每筆代辦事項
        for (const theData of theDayData) {
            let eventIdx = 0;
            // 判斷event1~4是否為空
            for (let i = 1; i <= maxEventNum; i++) {
                if (theDayDOM.querySelector(`.event:nth-child(${i + 1})`).dataset.isvalue === "false") {
                    eventIdx = i;
                    break;
                }
            }
            // 事件已滿
            if (eventIdx === 0) { break; }

            // 生成該筆資料所有時間
            for (let durIdx = 0; durIdx < theData.duration; durIdx++) {
                if (allDOMIdx + durIdx >= allDOM.length) { break; }
                const theDOM = allDOM[allDOMIdx + durIdx].querySelector(`.event${eventIdx}`);
                theDOM.style["background-color"] = theData.color;
                if (durIdx === 0) { // 第一天
                    theDOM.textContent = theData.todo;
                    theDOM.style["border-top-left-radius"] = "5px";
                    theDOM.style["border-bottom-left-radius"] = "5px";
                }
                if (durIdx === theData.duration - 1) {// 最後一天
                    theDOM.style["border-top-right-radius"] = "10px";
                    theDOM.style["border-bottom-right-radius"] = "10px";
                    theDOM.classList.add("me-1");
                }
                theDOM.setAttribute("data-bs-toggle", "modal");
                theDOM.setAttribute("data-bs-target", "#editEventModal");
                theDOM.dataset.isvalue = "true";
                theDOM.dataset.id = theData.id;
            }

        }
        // 更新日期
        theDay.setDate(theDay.getDate() + 1);
    }

}

// 下個月
nextMonthBtn.addEventListener("click", () => {
    theDate.setMonth(theDate.getMonth() + 1);
    generateCalendar();
})

// 上個月
preMonthBtn.addEventListener("click", () => {
    theDate.setMonth(theDate.getMonth() - 1);
    generateCalendar();
})

// 現在月份
nowBtn.addEventListener("click", () => {
    theDate = new Date(now);
    generateCalendar();
})

// 日期選擇格式設定
flatpickr("#month-input-btn", {
    dateFormat: "Y/m/d", //時間格式
    onChange: function (selectedDates, dateStr, instance) {
        theDate = new Date(dateStr);
        generateCalendar();
    }
});

flatpickr("#start-date", {
    dateFormat: "Y/m/d", //時間格式
    onChange: function (selectedDates, dateStr, instance) {
        startDate = new Date(dateStr);
    }
});

flatpickr("#end-date", {
    dateFormat: "Y/m/d", //時間格式
    onChange: function (selectedDates, dateStr, instance) {
        endDate = new Date(dateStr);
    }
});

flatpickr("#edit-start-date", {
    dateFormat: "Y/m/d", //時間格式
    onChange: function (selectedDates, dateStr, instance) {
        editStartDate = new Date(dateStr);
    }
});

flatpickr("#edit-end-date", {
    dateFormat: "Y/m/d", //時間格式
    onChange: function (selectedDates, dateStr, instance) {
        editEndDate = new Date(dateStr);
    }
});

// 增加事項 by +
plusBtn.addEventListener("click", () => {
    setAddInitDate(now);
    legalInput();
})

// 增加or修改事項 by day
mainContainer.addEventListener("click", (e) => {
    const dayDOM = e.target.closest(".day");
    if (dayDOM !== null) {
        if (e.target.dataset.isvalue === "true") {  // 修改事項
            setEditInitDate(e.target);
            editLegalInput();
        } else {    // 新增資料
            setAddInitDate(new Date(dayDOM.dataset.date));
            legalInput();
        }
    }
})

// todo刪除按鈕

// 設定新增初始資料
function setAddInitDate(date) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };
    const dateTimeFormat = new Intl.DateTimeFormat('zh', options);
    startDateBtn.value = dateTimeFormat.format(date);
    endDateBtn.value = dateTimeFormat.format(date);
    todo.value = "";
    colorMark.value = "#ffaa00";
    startDate = new Date(date);
    endDate = new Date(date);
}

// 設定編輯初始資料
function setEditInitDate(theDOM) {
    editId = Number(theDOM.dataset.id);

    // 獲取庫資料
    const todoStorage = JSON.parse(localStorage.getItem(storageKey)) || [];

    const theStorage = todoStorage.find((e) => e.id === editId);

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };
    const dateTimeFormat = new Intl.DateTimeFormat('zh', options);
    editStartDateBtn.value = dateTimeFormat.format(theStorage.startDate);
    editEndDateBtn.value = dateTimeFormat.format(theStorage.endDate);
    editTodo.value = theStorage.todo;
    editColorMark.value = theStorage.color;
    editStartDate = new Date(theStorage.startDate);
    editEndDate = new Date(theStorage.endDate);
}

// 確定增加事項
addEvent.addEventListener("click", () => {
    const storageObj = {
        id: Date.now(),
        startDate: startDate,
        endDate: endDate,
        todo: todo.value.trim(),
        color: colorMark.value,
    };

    saveData(storageObj);
    generateCalendar();
})

todo.addEventListener("input", legalInput);
startDateBtn.addEventListener("input", legalInput);
endDateBtn.addEventListener("input", legalInput);

// 檢查新增資料是否輸入正確
function legalInput() {
    if (endDate - startDate < 0
        || todo.value.trim() === "") {
        addEvent.disabled = true;
        return;
    }
    addEvent.disabled = null;
}

// 確定修改事項
editEvent.addEventListener("click", () => {
    const storageObj = {
        id: editId,
        startDate: editStartDate,
        endDate: editEndDate,
        todo: editTodo.value.trim(),
        color: editColorMark.value,
    };

    saveData(storageObj);
    generateCalendar();
})

editTodo.addEventListener("input", editLegalInput);
editStartDateBtn.addEventListener("input", editLegalInput);
editEndDateBtn.addEventListener("input", editLegalInput);

// 檢查編輯資料是否輸入正確
function editLegalInput() {
    if (editEndDate - editStartDate < 0
        || editTodo.value.trim() === "") {
        editEvent.disabled = true;
        return;
    }
    editEvent.disabled = null;
}

// 儲存資料
function saveData(storageObj) { // storageObj:用null表示沒要更新的欄位

    // 獲取庫資料
    const todoStorage = JSON.parse(localStorage.getItem(storageKey)) || [];

    // 日期前處理
    storageObj.startDate = dateToNum(storageObj.startDate);
    storageObj.endDate = dateToNum(storageObj.endDate);

    // 存入資料庫
    const theStorage = todoStorage.find((e) => e.id === storageObj.id)
    // 有資料
    if (theStorage) {
        if (storageObj.id !== undefined) { theStorage.id = storageObj.id; }
        if (storageObj.startDate !== undefined) { theStorage.startDate = storageObj.startDate; }
        if (storageObj.endDate !== undefined) { theStorage.endDate = storageObj.endDate; }
        if (storageObj.todo !== undefined) { theStorage.todo = storageObj.todo; }
        if (storageObj.color !== undefined) { theStorage.color = storageObj.color; }
        storageObj.duration = durationDate(storageObj.startDate, storageObj.endDate)
    } else {    // 無資料
        storageObj.duration = durationDate(storageObj.startDate, storageObj.endDate)
        todoStorage.push(storageObj);
    }
    localStorage.setItem(storageKey, JSON.stringify(todoStorage));
}

// 確定修改刪除
deleteEvent.addEventListener("click", () => {
    // 獲取庫資料
    const todoStorage = JSON.parse(localStorage.getItem(storageKey)) || [];

    // 存入資料庫
    const idx = todoStorage.indexOf(todoStorage.find((e) => e.id === editId))

    if (idx !== -1) {
        todoStorage.splice(idx, 1);
    }
    localStorage.setItem(storageKey, JSON.stringify(todoStorage));
    generateCalendar();
})

// 日期轉換時間戳(紀錄資料用)
function dateToNum(date) {
    date.setHours(0, 0, 0, 0);
    return date.valueOf();
}

// 持續天數(輸入時間戳)
function durationDate(date1, date2) {
    return (date2 - date1) / 1000 / 60 / 60 / 24 + 1;
}

