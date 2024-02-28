"use strict";

const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");

btnSubmit.addEventListener("click", function () {
  const isValidate = validate();
  if (isValidate) {
    //Bạn cũng cần validate dữ liệu ở bước này, hãy kiểm tra xem người dùng đã nhập đủ Username và Password hay chưa.
    const user = userArr.find(
      (item) =>
        item.username === inputUsername.value &&
        item.password === inputPassword.value
    );
    if (user) {
      //Nếu người dùng đăng nhập thành công,
      alert("Đăng nhập thành công!");
      console.log("User " + user);
      console.log("CurrentUser " + currentUser);
      //cần lưu thông tin người dùng hiện tại xuống dưới LocalStorage, để sau các trang khác có thể lấy được dữ liệu về người dùng đã đăng nhập.
      saveToStorage("user", user);
      //Sau đó sẽ chuyển về trang Home.
       window.location.href = '../index.html'
    } else {
      alert("Thông tin đăng nhập không đúng, vui lòng kiểm tra lại!");
    }
  }
});

function validate() {
  let isValidate = true;
  if (inputUsername.value === "") {
    alert("Vui lòng nhập Username!");
    isValidate = false;
  }
  return isValidate;
}
