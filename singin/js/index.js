let loginForm = document.getElementById("loginForm");
let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");

let loginEmailAlert = document.getElementById("loginEmailAlert");
let loginPasswordAlert = document.getElementById("loginPasswordAlert");
let invalidAlert = document.getElementById("invalidAlert");
let successAlert = document.getElementById("successAlert");

let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

loginForm.addEventListener("submit", function (e) {
    e.preventDefault(); 
    
    login();
  });
  function login () {
    let userData ={
      email: loginEmail.value,
      password: loginPassword.value
    }
  

    if (isLoginvalid(userData)) {
      console.log("Login successful");
      successAlert.classList.replace("d-none", "d-block");
      invalidAlert.classList.replace("d-block", "d-none");
      setTimeout(function () {
        window.location.href="../welcome/index.html";
      }, 2000);
    } else {
      console.log("Invalid credentials");
      invalidAlert.classList.replace("d-none", "d-block");
      successAlert.classList.replace("d-block", "d-none");
    }
  }

  function isLoginvalid(userData) {
    for (let i = 0; i < allUsers.length; i++) {
      if (
        allUsers[i].email.toLowerCase() == userData.email.toLowerCase() &&
        allUsers[i].password.toLowerCase() == userData.password.toLowerCase()) {
          localStorage.setItem("userName", allUsers[i].name);
        return true;
      
      }
    }
    
  }