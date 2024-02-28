'use strict'

var user = getFromStorage('user');
if (user) {
    const inputPageSize = document.getElementById("input-page-size")
    const inputCategory = document.getElementById("input-category")
    const btnSubmit = document.getElementById("btn-submit")

    btnSubmit.addEventListener("click", function() {
        if (validate()) {
            user.pageSize = Number.parseInt(inputPageSize.value);
            user.category = inputCategory.value;
            saveToStorage("user", user);
    /////Update userArr array:
            const index = userArr.findIndex(
                (userItem) => userItem.username === user.username
            )
            userArr[index] = user
            
    ////Let users know their form has been updated
            alert("Cài đặt thành công!")
            inputPageSize.value = ""
            inputCategory.value = "General"
            saveToStorage("userArr", userArr)
        }
    })

    function validate() {
        let isValidate = true
        if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
            alert("News per page is not valid!")
            isValidate = false
        }
        if(inputCategory.value === "") {
            alert("Vui lòng nhập News Category!")
            isValidate = false
        }
        return isValidate
    } 


} else {
        alert("Please signup/login")
        window.location.href("../index.html")
    }