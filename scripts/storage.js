'use strict'

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

//converting from JS Object to Class Instance function:
function parseUser(userData) {
    const user = new User(
        userData.firstname,
        userData.lastname,
        userData.username,
        userData.password,
        userData.pageSize,
        userData.category
    )
    return user 
}

const users = getFromStorage("userArr") ? getFromStorage("userArr") : []

//Để quản lý người dùng, tạo một mảng gọi là userArr, mảng này sẽ chứa các Instance được tạo từ Class User.
//covert to class instance
const userArr = users.map((user) => parseUser(user))

//Ngoài ra, để kiểm tra người dùng đã login hay chưa, bạn phải lưu thêm 1 biến trong localStorage là currentUser - lưu thông tin user đăng nhập. Khi login thành công sẽ lưu currentUser vào localStorage.
let currentUser = getFromStorage("currentUser") ? parseUser(getFromStorage("currentUser")) : null

const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : []

//Sau đó, bạn cần tạo một mảng todoArr để chứa các Instance tượng trưng cho mỗi task. Và lưu dữ liệu đó xuống dưới LocalStorage.
const todoArr = todos.map((todo => parseTask(todo)))



//converting from JS Object to Class Instance of Task class function:
function parseTask(taskData) {
    const task = new Task(taskData.task, taskData.owner, taskData.isDone)
    return task
}



