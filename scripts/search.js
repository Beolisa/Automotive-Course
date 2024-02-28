'use strict';
var user = getFromStorage('user');
if (user) {
    const navPageNum = document.getElementById("nav-page-num")
    const inputQuery = document.getElementById("input-query")
    const btnSubmit = document.getElementById("btn-submit")

    const newsContainer = document.getElementById("news-container")
    const btnPrev = document.getElementById("btn-prev")
    const pageNum = document.getElementById("page-num")
    const btnNext = document.getElementById("btn-next")

    let totalResults = 0
    let keywords = ""
    navPageNum.style.display = "none"


    btnSubmit.addEventListener("click", function () {
        pageNum.textContent = "1"
        newsContainer.innerHTML = ""
        //Nếu người dùng chưa nhập thì ẩn nút chuyển
        if (inputQuery.value.trim().length === 0) {
            navPageNum.style.display = "none"
            alert("Please enter keywords")
        } else { //ngược lạy sẽ display news from this function below
            keywords = inputQuery.value
            getDataNewsByKeyWords(keywords, 1)
        }
    })
    
    //Get news from keywords function
    async function getDataNewsByKeyWords(keywords, page) {
        try {
            const res = await fetch(`https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy&pageSize=${user.pageSize}&page=${page}&apiKey=bb2e6d7f6379469784b4758c18a90ca0`
            )
            const data = await res.json()
            //vượt quá số lần check lỗi trong ngày thì báo lỗi
            if (data.status === "error" && data.code === "rateLimited") {
                navPageNum.style.display = "none"
                throw new Error(data.message)
            }
            if (data.totalResults == 0) {
                navPageNum.style.display = "none"
                throw new Error(
                    "Please try again"
                )
            }
            //Display buttons again if get news is accomplished, sau đó list news ra
            navPageNum.style.display = "block"
            displayNewList(data)

        } catch (err) { //thông báo current user
            alert(err.message)
        }
    }

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

    btnPrev.addEventListener("click", function () {
        getDataNewsByKeyWords("us", --pageNum.textContent) //Chuyển sang trang có số thấp hơn / trang trước
    })

    btnNext.addEventListener("click", function () {
        getDataNewsByKeyWords("us", ++pageNum.textContent) //Chuyển sang trang sau
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
    alert("Please signup/login before searching")
    window.location.href = '../index.html'
}
