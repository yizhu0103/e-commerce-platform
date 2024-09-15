$(function () {
    /* 切換註冊登入 */
    var register = document.querySelectorAll(".register");
    register.forEach((button) => {
        button.addEventListener("click", () => {
            console.log('按下囉');
            var login = document.getElementById('login');
            var signup = document.getElementById('signup');
    
            // 切換顯示狀態
            if (login.style.display === "none") {
                login.style.display = "flex";
                signup.style.display = "none";
            } else {
                login.style.display = "none";
                signup.style.display = "flex";
            }
        });
    });

     


});
