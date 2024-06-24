// select inputs
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var btn = document.getElementById("btn");
var signupAlert1 = document.getElementById("signupAlert1");
var signupAlert2 = document.getElementById("signupAlert2");
var allUsers = [];

if (JSON.parse(localStorage.getItem("users")) != null) {
  allUsers = JSON.parse(localStorage.getItem("users"));
}

// user singup
// add users

function addUser() {
  if (
    nameInput.value == "" ||
    emailInput.value == "" ||
    passwordInput.value == ""
  ) {
    signupAlert1.classList.remove("d-none");
  } else {
    signupAlert1.classList.add("d-none");
    if (
      validateName() == true &&
      validateEmail() == true &&
      validatePassword() == true
    ) {
      var user = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      };
      signupAlert1.classList.add("d-none");
      signupAlert2.classList.remove("d-none");
      allUsers.push(user);
      localStorage.setItem("users", JSON.stringify(allUsers));
      console.log(allUsers);
      clearData();
    }
  }
}

// clear data from input
function clearData() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}

// user login
var loginAlert = document.getElementById("loginAlert");
function userLogin() {
  if (emailInput.value == "" || passwordInput.value == "") {
    loginAlert.classList.remove("d-none");
  } else {
    var userLogin = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    console.log(userLogin);
    for (var i = 0; i < allUsers.length; i++) {
      if (
        allUsers[i].email === userLogin.email &&
        allUsers[i].password === userLogin.password
      ) {
        loginAlert.classList.add("d-none");
        localStorage.setItem("loginUser", JSON.stringify(allUsers[i]));
        location.href = "./home.html";
      } else {
        loginAlert.classList.remove("d-none");
        loginAlert.innerHTML = `incorrect email or password
      `;
      }
    }
  }
}

// home page
function logoutBtn() {
  location.href = "./index.html";
}

// validate signup inputs
function validateName() {
  var nameRegex = /^[A-ZA-z][a-zA-Z\s]{2,15}$/;
  if (nameRegex.test(nameInput.value) == true) {
    document.getElementById("nameAlert").classList.replace("d-block", "d-none");
    return true;
  } else {
    document.getElementById("nameAlert").classList.replace("d-none", "d-block");
    return false;
  }
}
function validateEmail() {
  var emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
  if (emailRegex.test(emailInput.value) == true) {
    for (var i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email === emailInput.value) {
        document
          .getElementById("emailAlert")
          .classList.replace("d-block", "d-none");
        signupAlert1.classList.remove("d-none");
        signupAlert1.innerHTML = `email already exists
`;
        return false;
      }
    }
    document
      .getElementById("emailAlert")
      .classList.replace("d-block", "d-none");
    return true;
  } else {
    document
      .getElementById("emailAlert")
      .classList.replace("d-none", "d-block");
    return false;
  }
}
function validatePassword() {
  var passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/; // . means any thingggg == digit . / ? kol da yo3tbr digit 7rf 7aga wa7da except new line but \. means dot only that match
  if (passwordRegex.test(passwordInput.value) == true) {
    document
      .getElementById("passwordAlert")
      .classList.replace("d-block", "d-none");
    return true;
  } else {
    document
      .getElementById("passwordAlert")
      .classList.replace("d-none", "d-block");
    return false;
  }
}
