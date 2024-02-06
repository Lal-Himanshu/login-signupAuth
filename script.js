"use strict";
function hidebtn0() {
  let pwd = document.getElementById("myPass");
  if (pwd.type === "password") {
    pwd.type = "text";
  } else {
    pwd.type = "password";
  }
}
function hidebtn1() {
  let pwd = document.getElementById("mySignPass");
  if (pwd.type === "password") {
    pwd.type = "text";
  } else {
    pwd.type = "password";
  }
}
function hidebtn2() {
  let pwd = document.getElementById("confirmPass");
  if (pwd.type === "password") {
    pwd.type = "text";
  } else {
    pwd.type = "password";
  }
}

function signup() {
  const myName = document.getElementById("myName");
  const usernameInput = document.getElementById("mySignId");
  const passwordInput = document.getElementById("mySignPass");
  const secuQues = document.getElementById("securityQues");
  const secuAns = document.getElementById("securityAnswer");
  if (!validateEmail(usernameInput.value)) {
    alert("Invalid email");
    return;
  }
  if (passwordInput.value) {
    if (passwordInput.value.length < 8) {
      alert("Password is too small, enter at least 8 character💻🔍🔓");
      return;
    }
  } else {
    alert("Please enter password⚠️⚠️");
    return;
  }
  const confirmPass = document.getElementById("confirmPass");
  if (passwordInput.value != confirmPass.value) {
    alert("Password does not match⚠️⚠️");
    return;
  }
  const obj1 = {
    name: myName.value,
    username: usernameInput.value,
    password: passwordInput.value,
    secuQues: secuQues.value,
    secuAns: secuAns.value,
  };


  const addressFields = document.querySelectorAll('input[name="addressLine"]');
    // Create an array to store the values of address fields
    const addressValues = [];

    // Iterate through each address field and push its value to the array
    addressFields.forEach(function (addressField) {
      addressValues.push(addressField.value);
    });

    // Join the array elements into a single string, separated by a newline character
  const addressString = addressValues.join("\n");
  obj1["Address:"] = addressString;
    // Log or use the addressString as needed
    // console.log(addressString);





  localStorage.setItem(usernameInput.value, JSON.stringify(obj1));
  alert("User added successfully🎉🎉");
  localStorage.setItem("UserData", usernameInput.value);
        sessionStorage.setItem("redirectedFromPage1", "true");
  window.location.href = "home.html";
}

function login() {
  const usernameInput = document.getElementById("myId");
  const passwordInput = document.getElementById("myPass");
  if (!validateEmail(usernameInput.value)) {
    alert("Invalid email");
    return;
  }
  const isUser = localStorage.getItem(usernameInput.value);
  console.log(usernameInput.value)
  if (isUser) {
    const storedPass = JSON.parse(isUser).password;
    if (storedPass == passwordInput.value) {
      alert("Login Successful🎉🎉");
      sessionStorage.setItem("redirectedFromPage1", "true");
      window.location.href = "home.html";
      localStorage.setItem("UserData", usernameInput.value);
    } else {
      alert("Wrong Password, Please try again⚠️⚠️");
    }
  } else {
    alert("User not exist, Please Sign up 🙃 ");
  }
}
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
  return emailRegex.test(email);
}
function setCookie() {
  const uname = document.getElementById("myId").value;
  const pwd = document.getElementById("myPass").value;
  document.cookie =
    "username=" + uname + ";path=http://127.0.0.1:5501/Dev/faltu/";
  document.cookie =
    "password=" + pwd + ";path=http://127.0.0.1:5501/Dev/faltu/";
}
function getCookieData() {
  const cookies = document.cookie;
  const uPart = cookies.split(";")[0];
  const pPart = cookies.split(";")[1];
  let uname;
  let pwd;
  for (let i = 0; i < uPart.length; i++) {
    if (uPart[i] == "=") {
      uname = uPart.substring(i + 1);
      break;
    }
  }
  for (let i = 0; i < pPart.length; i++) {
    if (pPart[i] == "=") {
      pwd = pPart.substring(i + 1);
      break;
    }
  }
  document.getElementById("myId").value = uname;
  document.getElementById("myPass").value = pwd;
}

function getPassword() {
  const secuE = document.getElementById("securityEmail").value;
  const secuQ = document.getElementById("securityQues").value;
  const secuA = document.getElementById("securityAnswer").value;
  const storedEmail = localStorage.getItem(secuE);
  if (storedEmail) {
    const secuObj = JSON.parse(storedEmail);
    if (secuObj.secuQues == secuQ && secuObj.secuAns == secuA) {
      alert(`Your password is : ${secuObj.password}`);
    } else {
      console.log(secuObj.password,secuA);
      console.log(secuObj.secuQues,secuQ);
      alert("Either security Question or answer is wrong");
    }
  } else {
    alert("No user found");
  }
}
function insertUserData() {
  if (
    document.referrer === "http://127.0.0.1:5501/Dev/faltu/login.html" ||
    document.referrer === "http://127.0.0.1:5501/Dev/faltu/signup.html"
  ) {
    if (sessionStorage.getItem("redirectedFromPage1") === "true") {
      const user = localStorage.getItem("UserData");
      const userDetails = localStorage.getItem(user);
      const myArray = userDetails.split(",");
      const str = myArray.join(" ");
      let ans = `
    ${myArray[0].substring(1)}
    ${myArray[1]}
    ${myArray[2]}
    ${myArray[3]}
    ${myArray[4]}
    ${myArray[5].substring(0,myArray[5].length-1)}
    `;
      document.getElementById("userDetails").innerHTML = `<pre>${ans}</pre>`;
      document.getElementById("userDetails").style.fontSize = "3rem";
      sessionStorage.removeItem("redirectedFromPage1");
    }
  }
}
// document.getElementById("addAddress").addEventListener("click",
  function addFeild () {
  let newAddressField = document.createElement("input");
  newAddressField.type = "text";
  newAddressField.name = "addressLine";
  newAddressField.placeholder =
    "Address Line " +
    (document.querySelectorAll('input[name="addressLine"]').length + 1);
  document.getElementById("addressFields").appendChild(newAddressField);
}
// );