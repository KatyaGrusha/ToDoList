var btnEnter          = document.getElementById('btnEnter').addEventListener("click", SendClick, false);
var btnRegistration   = document.getElementById('btnRegistration').addEventListener("click", RegistrationClick, false);
function SendClick(){
    var login                     = document.getElementById('login');
    var password                  = document.getElementById('password');
    var myRequest                 = new XMLHttpRequest();
    myRequest.onreadystatechange  =   GetFromServer;
    myRequest.open('GET', "server/server_enter.php?save=save&login=" + login.value + "&password=" + password.value , false);
    myRequest.send();
 
    function GetFromServer(){
        if (myRequest.readyState != 4){
        }
        if (myRequest.status != 200){
        } 
        else{
            if(myRequest.responseText === 'yes login'){
                sessionStorage['login'] = login.value;
                document.location.href  = "Home.html";
            }
            if(myRequest.responseText === 'no password'){
                alert("Неверно введен пароль!");
            }
            if(myRequest.responseText === 'no login'){
                alert("Неверно введен логин!");
            }
        }
    }
}
function RegistrationClick(){
    document.location.href = "Registration.html";
}