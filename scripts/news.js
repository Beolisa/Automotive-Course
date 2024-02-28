'use strict'
var user = getFromStorage('user');
console.log(user)
if (user) {
    const newsContainer = document.getElementById("news-container")
    const btnPrev = document.getElementById("btn-prev")
    const pageNum = document.getElementById("page-num")
    const btnNext= document.getElementById("btn-next")

//The maximum number of news returns from API:
    let totalResults = 0 
    console.log(user.pageSize);
    getDataNews("us", 1) //tin tức từ US, trang đầu tiên là trang 1
//Để lấy được dữ liệu từ API, bạn sẽ sử dụng hàm fetch và goị API, chú ý là hàm này sẽ trả về một Promise nên bạn sẽ cần sử dụng await, async để xử lý bất đồng bộ cho thao tác này.
    async function getDataNews(country, page) {
        try { //connect with API and retrieve data
            const res = await fetch(
                `https://newsapi.org/v2/top-headlines?country=${country}&category=${user.category}&page=${page}&pageSize=${user.pageSize}&apiKey=bb2e6d7f6379469784b4758c18a90ca0` //check trong search thử
            )
            console.log("res "+`https://newsapi.org/v2/top-headlines?country=${country}&category=${user.category}&page=${page}&pageSize=${user.pageSize}&apiKey=bb2e6d7f6379469784b4758c18a90ca0`);
        const data = await res.json()
//vượt quá sô lần check error
        if (data.status === "error" & data.code === "rateLimited") {
            throw new Error(data.message)
        }
//chạy từ tập tin không qua localhost sẽ báo lỗi, trên server sẽ không báo
        if (data.code === "corsNotAllowed"){
            throw new Error(data.message)
        }
        displayNewList(data)
        } catch (err) {
            alert("Error: " + err.message)
        }
    }

//cần xử lý sự kiện khi click vào nút "Previous" hoặc "Next" để hiển thị các tin tức tương ứng. Chú ý:
    function checkBtnPrev() {
        if(pageNum.textContent == 1) { //Khi đang ở Page số 1 thì nút "Previous" sẽ bị ẩn đi.
            btnPrev.style.display = "none"
        } else {
            btnPrev.style.display = "block"
        }
    }
    
    console.log(user)
    function checkBtnNext() {
        //Tổng số news / 1 trang bn news => làm tròn đến số lớn hơn
        if(pageNum.textContent == Math.ceil(totalResults / user.pageSize)) { //Trong dữ liệu trả về từ API sẽ có trường totalResults - số lượng bài viết tối đa mà API có thể trả về. Nếu như không thể lấy thêm các bài viết nữa, nút "Next" sẽ bị ẩn đi.
            btnNext.style.display = "none"
        } else {
            btnNext.style.display = "block"
        }
    }
//Khi nhấn vào nút, số page hiện tại được cập nhật tương ứng.
    btnPrev.addEventListener("click", function() {
        getDataNews("us", --pageNum.textContent) //Chuyển sang trang có số thấp hơn / trang trước
    })

    btnNext.addEventListener("click", function() {
        getDataNews("us", ++pageNum.textContent) //Chuyển sang trang sau
    })

    function displayNewList(data) {
        totalResults = data.totalResults
        checkBtnPrev()
        checkBtnNext()
    
        let html = ""
        data.articles.forEach(function(article) {
            html += `
        <div class="new-content row my-3" >
            <div class="img-banner col"> <img style="height:auto; width: 100%; overflow:hidden;" src=${article.urlToImage}/>
            </div>

            <div class="content col">
                <h4 style="font-size: 26px; line-height:1.5em; margin-top: 11px;">${article.title}</h4>
                <p>${article.description}</p>
                <button><a href=${article.url} target="_blank">View</a></button>
            </div>

        </div>    
            `
        })
        newsContainer.innerHTML = html
    }
} else {
        alert("Please signup/login")
        window.location.assign("../index.html")
}




