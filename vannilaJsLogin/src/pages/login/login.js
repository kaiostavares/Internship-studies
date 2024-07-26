import { loginUser } from "../../services/loginAuth.js";
import { navigate } from "../../router/router.js";

const form = document.getElementById("auth-form");

document.getElementById('register').addEventListener('click', async () => window.alert('Register feature is not available yet\nBut you can use the following credentials to login:\n' + await fetch('/data/fakeUsers.json').then(response => response.json()).then(data => data.map(user => user.email + ' - ' + user.password).join('\n'))));

form.addEventListener("submit", async (e) => {
  e.preventDefault();
   const formData = new FormData(form);
   const data = Object.fromEntries(formData.entries());

   await validateLoginForm(data);
});

async function  validateLoginForm(formData){
   const {email, password, remember = false} = formData;
   document.getElementById("email-error").textContent = "";
   document.getElementById("password-error").textContent = "";

   if(!validateEmail(email)){
      document.getElementById("email-error").textContent = "Invalid email address";
      return;
   }

   if(!validatePassword(password)){
      document.getElementById("password-error").textContent = "Invalid password";
      return;
   }

   await handleLogin(email, password, remember);
}

async function handleLogin(email, password, remember) {
   try {
      await loginUser(email, password, remember);
      navigate("/");
   } catch (e) {
      console.log(e.message);
      errorLoginTag(e.message);
   }
}

function errorLoginTag(errorMessage) {
   const errorTag = document.createElement("div");
   errorTag.id = "auth-error-tag";
   errorTag.textContent = errorMessage;
   document.body.appendChild(errorTag);
   setTimeout(() => {
      errorTag.style.opacity = "0";
      setTimeout(() => {
         errorTag.remove(); 
      }, 500);
   }, 3000);
}


function validateEmail(email){
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailRegex.test(String(email).toLowerCase());
}

function validatePassword(password){
   const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9!@#$%^&*])(?=.{6,})/;
   return passwordRegex.test(password);
}