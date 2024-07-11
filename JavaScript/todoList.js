
const dataContainer = document.querySelector(".data-container");
const addInput = document.querySelector("#add_input");
const addBtn = document.querySelector("#add_btn");
const storageKey = "todoList";

// 載入資料
addEventListener("DOMContentLoaded", () => {
    init();
    loadData();
});

// 初始化
function init() {
    // 獲取庫資料
    const todoStorage = JSON.parse(localStorage.getItem(storageKey)) || [];
    // 刪除暫存資料
    todoStorage.forEach(data => { data.tempText = ""; })
    // 回歸未編輯狀態
    todoStorage.forEach(data => { data.isEdit = false; })

    localStorage.setItem(storageKey, JSON.stringify(todoStorage));
}

// 新增代辦事項
addBtn.addEventListener("click", () => {
    addData(addInput.value.trim());
    loadData();
    addInput.value = "";
});

// 新增資料
function addData(inputText) {
    // 建立資料
    const storageObj = {
        id: Date.now(),
        text: inputText,
        tempText: "",
        isDone: false,
        isEdit: false,
    };

    saveData(storageObj);
}

// 儲存資料
function saveData(storageObj) { // storageObj:用null表示沒要更新的欄位
    // 獲取庫資料
    const todoStorage = JSON.parse(localStorage.getItem(storageKey)) || [];

    // 存入資料庫
    const theStorage = todoStorage.find((e) => e.id === storageObj.id)
    // 有資料
    if (theStorage) {
        if (storageObj.id !== undefined) { theStorage.id = storageObj.id; }
        if (storageObj.text !== undefined) { theStorage.text = storageObj.text; }
        if (storageObj.tempText !== undefined) { theStorage.tempText = storageObj.tempText; }
        if (storageObj.isDone !== undefined) { theStorage.isDone = storageObj.isDone; }
        if (storageObj.isEdit !== undefined) { theStorage.isEdit = storageObj.isEdit; }
    } else {    // 無資料
        todoStorage.push(storageObj);
    }
    localStorage.setItem(storageKey, JSON.stringify(todoStorage));
}

// HTML載入資料
function loadData() {
    // 獲取庫資料
    const todoStorage = JSON.parse(localStorage.getItem(storageKey)) || [];

    dataContainer.innerHTML = "";
    todoStorage.forEach(data => {
        dataContainer.innerHTML += `<div class="input-group m-3" data-id=${data.id}>
                <div class="input-group-text">
                    <input class="form-check-input check-box" type="checkbox" ${data.isDone ? "checked" : ""} >
                </div>

                <input type="text" class="form-control edit-input" ${!data.isEdit ? "disabled" : ""} value=${data.tempText !== "" ? data.tempText : data.text} >
                <button type="button" class="btn btn-success storage-btn ${!data.isEdit ? "d-none" : ""}">保存</button>
                <button type="button" class="btn btn-warning edit-btn ${data.isEdit ? "d-none" : ""}">編輯</button>
                <button type="button" class="btn btn-danger delete-btn">刪除</button>
            </div>`;
    });

}

// 資料區click(事件委派)
dataContainer.addEventListener("click", (e) => {
    let idTarget = e.target.closest("[data-id]");
    const theId = Number(idTarget.dataset.id);

    // 編輯
    if (e.target.classList.contains("edit-btn")) {
        // 儲存資料
        const storageObj = {
            id: theId,
            isEdit: true,
        };
        saveData(storageObj);
        loadData();
    }

    // 儲存
    if (e.target.classList.contains("storage-btn")) {
        // 儲存資料
        const storageObj = {
            id: theId,
            text: idTarget.querySelector(".edit-input").value,
            tempText: "",
            isEdit: false,
        };
        saveData(storageObj);
        loadData();
    }

    // 刪除
    if (e.target.classList.contains("delete-btn")) {
        // 儲存資料
        // 獲取庫資料
        const todoStorage = JSON.parse(localStorage.getItem(storageKey)) || [];

        // 存入資料庫
        const idx = todoStorage.indexOf(todoStorage.find((e) => e.id === theId))

        if (idx !== -1) {
            todoStorage.splice(idx, 1);
        }
        localStorage.setItem(storageKey, JSON.stringify(todoStorage));
        loadData();
    }

    // 完成
    if (e.target.classList.contains("check-box")) {
        // 儲存資料
        console.log(e.target.getAttribute("checked"));
        const storageObj = {
            id: theId,
            isDone: e.target.checked,
        };
        saveData(storageObj);
        loadData();
    }
})

// 資料區input(事件委派)
dataContainer.addEventListener("input", (e) => {
    let idTarget = e.target.closest("[data-id]");
    const theId = Number(idTarget.dataset.id);

    // 暫存內容修改
    if (e.target.classList.contains("edit-input")) {
        // 儲存資料
        const storageObj = {
            id: theId,
            tempText: idTarget.querySelector(".edit-input").value,
        };
        saveData(storageObj);
    }
})


