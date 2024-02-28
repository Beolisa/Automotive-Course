'use strict'

var user = getFromStorage('user');
if(user) {
    const todoList = document.getElementById("todo-list")
    const btnAdd = document.getElementById("btn-add")
    const inputTask = document.getElementById("input-task")

    displayTodoList()
    function displayTodoList() {
        let html = "" 

        todoArr
        .filter((todo) => todo.owner === user.username) //Lưu ý: Bạn chỉ hiển thị các Task có owner trùng với username của người dùng hiện tại.
        .forEach(function(todo) { 
            html += `
            <li class=${todo.isDone ? "checked" : ""} >${todo.task}
            <span class="close">x</span></li>
            `;
        })
        todoList.innerHTML = html
        
        eventToggleTasks()
        eventDeleteTasks()        
    }

btnAdd.addEventListener("click", function() {
    if (inputTask.value.trim().length === 0) { 
        alert("Vui lòng nhập nhiệm vụ!")
    } else { 
        const todo = new Task(inputTask.value, user.username, false)
        todoArr.push(todo)
        saveToStorage("todoArr", todoArr)
        displayTodoList()
        inputTask.value = ""
    }

    
})
function eventToggleTasks() { //Khi click vào một Task thì bạn có thể đánh dấu là Task đó đã hoàn thành hoặc chưa hoàn thành, dữ liệu này cũng được cập nhật vào LocalStorage tương ứng. 
    document.querySelectorAll("#todo-list li").forEach(function (liEl) {
        liEl.addEventListener("click", function (e) {
            if(e.target !== liEl.children[0]) {
                liEl.classList.toggle("checked")
                const todo = todoArr.find(
                    (todoItem) => 
                    todoItem.owner === user.username &&
                    todoItem.task === liEl.innerText.slice(0, -2))
console.log(liEl.textContent)
        //Đổi thuộc tính isDone
                    todo.isDone = liEl.classList.contains("checked") ? true : false
                    saveToStorage("todoArr", todoArr)
            }})})
}

function eventDeleteTasks() { //Khi click vào nút Delete ở bên cạnh các Task, xóa task tương ứng ra khỏi danh sách.
    document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
        closeEl.addEventListener("click", function() {
            const isDelete = confirm("Bạn xác nhận chắc chắn muốn xóa chứ?")
            if(isDelete) {
                const index = todoArr.findIndex(
                    (item) =>
                    item.owner === user.username &&
                    item.task === closeEl.parentElement.textContent.slice(0, -1)
                )
                todoArr.splice(index, 1)
                saveToStorage("todoArr", todoArr)
                displayTodoList()
            }})})
}
} else {
    alrt("Vui lòng đăng nhập / đăng ký để truy cập ứng dụng")
    window.location.assign("/index.html")  
}