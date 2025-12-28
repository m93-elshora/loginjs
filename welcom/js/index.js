let welcomMsg = document.getElementById("welcomMsg");

window.addEventListener("load", function () {
  displayUsername();
});

function displayUsername() {
  if (localStorage.getItem("username") !== null) {
    welcomMsg.innerHTML = `Hello, ${localStorage.getItem("username")}`;
  } else {
    welcomMsg.innerHTML = `Hello, Guest`;
  }
}
