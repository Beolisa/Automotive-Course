'use strict'
const loginModal = document.getElementById("login-modal")
const mainContent = document.getElementById("main-content")

const welcomeMessage = document.getElementById("welcome-message")
const btnLogout = document.getElementById("btn-logout")

// gọi ở đây nè
var user = getFromStorage('user');
//Nếu người dùng chưa đăng nhập, bạn cần hiển thị màn hình gồm nút đăng nhập và đăng ký như sau:
displayHome()
console.log('user', user)
function displayHome() {
    if (user) { //Nếu người dùng đã đăng nhập, bạn sẽ hiển thị thông điệp chào mừng như sau: "Welcome + Firstname" và nút Logout.
        console.log('currentUser', currentUser)
        console.log('user', user)


        loginModal.style.display = "none"
        mainContent.style.display = "block"
        welcomeMessage.textContent = `Welcome ${user.firstname}`
    } else { 
        loginModal.style.display = "block"
        mainContent.style.display = "none"
    }
}
//Bạn cần thêm sự kiện click vào nút logout
btnLogout.addEventListener("click", function() {
    const isLogout = confirm("Are you sure?")
    if (isLogout) {
        currentUser = null; //chỉ cần xóa User hiện tại ở Localstorage và đưa người dùng trở lại trang Login.
        saveToStorage("user", user)
//Trở về page khi current user chưa login
        displayHome()
        window.location.href = 'pages/login.html'
   localStorage.removeItem('user');
    }
}
)