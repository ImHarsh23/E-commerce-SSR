let navbar_login_overlay = document.querySelector(".navbar-login-overlay");
let navbar_user_logo = document.querySelector(".navbar-user-logo");

navbar_user_logo.addEventListener("click",(e)=>{
    e.preventDefault();
    navbar_login_overlay.classList.toggle("flex");
})