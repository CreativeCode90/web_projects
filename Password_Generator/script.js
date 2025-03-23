import Variables from "./Variables.js";

const variables = new Variables();

document.querySelector(".gen").addEventListener("click", () => {
   let length = document.querySelector(".length").value;
  let allowChars = variables.lowerCaseChars;
  if (variables.uppercase) allowChars += variables.upperCaseChars;
  if (variables.number) allowChars += variables.numberChars;
  if (variables.Symbol) allowChars += variables.SymbolChar;
    let password = "";
  for (let i = 0; i <= length; i++) {
    const randomIndex = Math.floor(Math.random() * allowChars.length);
    password += allowChars[randomIndex];
  }
  document.getElementById("pass").value = password;
});

document.querySelector(".copy").addEventListener("click",()=>{
    const password = document.getElementById("pass");
    password.select();
    document.execCommand('copy');
    alert("password copied to clipboard")
})