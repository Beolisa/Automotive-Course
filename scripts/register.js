'use strict'
const inputFirstname = document.getElementById("input-firstname")
const inputLastname = document.getElementById("input-lastname")
const inputUsername = document.getElementById("input-username")
const inputPassword = document.getElementById("input-password")
const inputPasswordConfirm = document.getElementById("input-password-confirm")
const btnSubmit = document.getElementById("btn-submit") // is register btn

//Sau khi nhấn nút Register, phải xử lý sự kiện click vào nút Register và thực hiện các bước sau: 
btnSubmit.addEventListener("click", function(){
    
    const user = new User( //Lấy dữ liệu nhập vào từ form 
        inputFirstname.value,
        inputLastname.value,
        inputUsername.value,
        inputPassword.value
    )
// validation and adding users:  
//lưu userArray này xuống localStorage
    const isValidate = validate(user) //Gọi hàm validate để kiểm tra form hợp lệ
    if (isValidate) { 
        userArr.push(user) //Thêm user vào mảng
        console.log("userArr "+userArr)
        saveToStorage("userArr", userArr) //lưu mảng vào localStorage
        alert("Đăng ký thành công!")
        window.location.href = './login.html' //Chuyển trang đến màn hình login
    }
})

function validate(user) {
    let isValidate = true
if (user.firstname.trim().length === 0) {
    alert("Vui lòng nhập First Name!")
    isValidate = false;
}
if (user.lastname.trim().length === 0) {
    alert("Vui lòng nhập Last Name!")
    isValidate = false;
}
if (user.username.trim().length === 0) { //Username không được trùng với Username của các người dùng trước đó.
    alert("Vui lòng nhập Username!")
    isValidate = false;
}
if (user.password === "") {
    alert("Vui lòng nhập password!")
    isValidate = false;
}
if (inputPasswordConfirm.value === "") {
    alert("Please confirm password!")
    isValidate = false;
}
for(let i = 0; i< userArr.length; i++) {//Username không được trùng với Username của các người dùng trước đó.
    if(userArr[i].username === user.username){
        alert("Your Username has been used!")
        isValidate = false;
        break
    }
}

if (user.password !== inputPasswordConfirm.value) { 
    alert("Password và Confirm Password phải giống nhau.")
    isValidate = false;
}
if (user.password.length <= 8) { //Password phải có nhiều hơn 8 ký tự.
    alert("Password phải có nhiều hơn 8 ký tự.")
    isValidate = false;
}
    return isValidate
}

