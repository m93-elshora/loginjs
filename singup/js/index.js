let registerForm = document.getElementById("registerForm");

let signName = document.getElementById("signName");
let signEmail = document.getElementById("signEmail");
let signPassword = document.getElementById("signPassword");

let nameAlert = document.getElementById("nameAlert");
let emailAlert = document.getElementById("emailAlert");
let passwordAlert = document.getElementById("passwordAlert");
let existAlert = document.getElementById("existAlert");
let successAlert = document.getElementById("successAlert");

let allUsers = [];

 if (localStorage.getItem("allUsers") != null) {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
}

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (checkIfAllValid()) {
    console.log("Form Submitted");
    addUser();
  }
});

function addUser(){

    let newUsers = {
    name: signName.value,
    email: signEmail.value,
    password: signPassword.value
  }

  if (isExit(newUsers) ) {
    console.log("User already exists");
    existAlert.classList.replace("d-none", "d-block");
    successAlert.classList.replace("d-block", "d-none");
  } else {

  console.log(newUsers);
  allUsers.push(newUsers);
  localStorage.setItem("allUsers", JSON.stringify(allUsers));
  successAlert.classList.replace("d-none", "d-block");
  existAlert.classList.replace("d-block", "d-none");
  setTimeout(function () {
    window.location.href="../singin/index.html";
  }, 2000);

  

  
  }
 
}

function isExit(newUsers) {
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email.toLowerCase() === newUsers.email.toLowerCase()) {
      
      return true;
    }
  }
  return false;
}

function validateAllInputs(regex, element, alertMsg) {
  let pattern = regex;
  if (pattern.test(element.value) == true) {
    console.log("validate");
    alertMsg.classList.replace("d-block", "d-none");
    return true;
  } else {
    console.log("invalidate");
    alertMsg.classList.replace("d-none", "d-block");
    return false;
  }
}
 function checkIfAllValid() {
    if (
      validateAllInputs(/^[a-zA-Z ]{2,30}$/, signName, nameAlert) &&
      validateAllInputs(
        /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        signEmail,
        emailAlert
      ) &&
      validateAllInputs(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        signPassword,
        passwordAlert
      )
    ) {
      console.log("All Inputs are valid");
      return true;
    } else {
      console.log("Some Inputs are invalid");
      return false;
    }
  }
