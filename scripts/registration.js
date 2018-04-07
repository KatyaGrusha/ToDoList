var body                = document.getElementsByTagName('body')[0];
var form                = body.querySelector(".page-form");
var btnRegistration     = form.querySelector("#btnRegistration").addEventListener("click", SendClick);
var namee               = form.querySelector("#namee");
var login               = form.querySelector("#login");
var email               = form.querySelector("#email");
var password            = form.querySelector("#password");
var password_again      = form.querySelector("#password_again");

var name_error          = form.querySelector("#nameError");
var login_error         = form.querySelector("#loginError");
var email_error         = form.querySelector("#emailError");
var password_error      = form.querySelector("#passwordError");
var passwordAgain_error = form.querySelector("#passwTwoError");

namee.addEventListener('blur', ValidateName, true);
login.addEventListener('blur', ValidateLogin, true);
email.addEventListener('blur', ValidateEmail, true);
password.addEventListener('blur', ValidatePassword, true);
password_again.addEventListener('blur', ValidatePasswordAgain, true);
var v = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;

function ValidateName(){
  if (namee.value == ""){
    namee.style.border = "1px solid red";
    name_error.style.color = "#FA8072";
    name_error.textContent = "Username is required";
    namee.focus();
  }
  else if(namee.value.length < 3){
    namee.style.border = "1px solid red";
    name_error.style.color = "#FA8072";
    name_error.textContent = "Username must be at least 3 characters";
    namee.focus();
  }
  else{
   namee.style.border = "1px solid #5e6e66";
   name_error.innerHTML = "";
   return true;
  }
return false;
}

function ValidateLogin(){
  if (login.value == ""){
    login.style.border = "1px solid red";
    login_error.style.color = "#FA8072";
    login_error.textContent = "Login is required";
    login.focus();
  }
  else if(login.value.length < 4){
    login.style.border = "1px solid red";
    login_error.style.color = "#FA8072";
    login_error.textContent = "Login must be at least 3 characters";
    login.focus();
  }
  else{
    login.style.border = "1px solid #5e6e66";
    login_error.innerHTML = "";
    return true;
  }
return false;  
}

function ValidateEmail(){
  if (email.value == "") {
    email.style.border = "1px solid red";
    email_error.style.color = "#FA8072";
    email_error.textContent = "Email is required";
    email.focus();
  }
  else if( !v.exec(email.value)){
    email.style.border = "1px solid red";
    email_error.style.color = "#FA8072";
    email_error.textContent = "Email is no";
    email.focus();
  }
  else{
    email.style.border = "1px solid #5e6e66";
    email_error.style.color = "#5e6e66";
    email_error.innerHTML = "";
    return true;
  }
return false;  
}

function ValidatePassword(){
  if (password.value == "") {
    password.style.border = "1px solid red";
    password_error.style.color = "#FA8072";
    password_error.textContent = "Password is required";
    password.focus();
  }
  else if(password.value.length < 8){
    password.style.border = "1px solid red";
    password_error.style.color = "#FA8072";
    password_error.textContent = "Password must be at least 8 characters";
    password.focus();
  }
  else{
    password.style.border = "1px solid #5e6e66";
    password_error.style.color = "#5e6e66";
    password_error.innerHTML = "";
    return true;
  }
  return false;
}

function ValidatePasswordAgain(){
  if (password_again.value == "") {
    password_again.style.border = "1px solid red";
    passwordAgain_error.style.color = "#FA8072";
    passwordAgain_error.textContent = "Password is required";
    password_again.focus();
  }
  else if(password_again.value!=password.value){
    password_again.style.border = "1px solid red";
    passwordAgain_error.style.color = "#FA8072";
    passwordAgain_error.textContent = "The two passwords do not match";
    password_again.focus();
  }
  else{
    password.style.border = "1px solid #5e6e66";
    password_error.style.color = "#5e6e66";
    password_error.innerHTML = "";
    return true;
  }
return false;
}

function Validate(){
    if(ValidateName() & ValidateLogin() & ValidateEmail() & ValidatePassword() & ValidatePasswordAgain()){
      return true;
    }
    return false;
}
function SendClick(){
    if(Validate()){
        var myRequest       = new XMLHttpRequest();
        
        myRequest.open('GET', "server/server.php?save=save&name=" + namee.value + "&login=" + login.value + "&email=" + email.value + "&password=" + password.value , false);
        myRequest.send();
        myRequest.onreadystatechange = GetFromServer;

        function GetFromServer() {
          if (myRequest.readyState != 4) {
         }
          if (myRequest.status != 200) {
          } 
          else {
            if (myRequest.responseText === 'yes login') {
                alert("Есть такой login");
            } else if(myRequest.responseText === 'yes email'){
                alert("Есть такой email");
            } else if(myRequest.responseText === 'good') {
                 document.location.href = "Login.html";
            }
          }
        }
    }
}