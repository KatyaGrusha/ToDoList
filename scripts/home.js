var body            = document.getElementsByTagName('body')[0];
var hello           = body.querySelector("#hello");
var form            = body.querySelector(".page-form");
var groupBtn        = body.querySelector(".buttonGroup");
var exit            = body.querySelector("#exit").addEventListener("click", ExitClick);
var btnAdd          = groupBtn.querySelector("#btnAdd").addEventListener("click", AddClick);
var btnClear        = groupBtn.querySelector("#btnClear").addEventListener("click", ClearClick);
var btnClearDone    = groupBtn.querySelector("#btnClearDone").addEventListener("click", ClearDoneClick);
var listTasks       = form.querySelector("#tasks");
var task            = form.querySelector("#task");
    task.addEventListener("keyup",EnterClick);
var login           = sessionStorage['login'];          //хранение в сессии login пользователя, который вошел 

var textDecoration = "line-through black";
if(typeof login != "undefined"){
    hello.innerText = "Hello " + login + "!";
    ReadClick();
}
else{
    hello.innerText = "Hello Friend!";
}
/////////////Функция-конструтор для объектов созданных заданий/////////////
function List(login, msg, flag){
    this.login = login;
    this.msg = msg;
    this.flag = flag;
}
function EnterClick(e) {
    e = e || window.event;
    if(e.keyCode === 13){
        AddClick();
    }
}
/////////////Нажатие на кнопку добавить задание///////////////////////////
function AddClick(){
    if(task.value==""){
        alert("Enter task please");
    }
    else{
        createList(task.value, 0); 
        task.value=""; 
    }
    if(typeof login != "undefined"){
        SaveClick();
    }
}
///////////////Очистить поле с заданиями//////////////////////
function ClearClick(){
    while (listTasks.firstChild){
        listTasks.removeChild(listTasks.firstChild);
    }
    if(typeof login != "undefined"){
        SaveClick();
    }
}
////////////////////Очистить сделанное//////////////////////
function ClearDoneClick(){
    var y = document.getElementsByClassName("list__task");
    for (var i = 0; i < y.length; i++){
        if((y[i].style.textDecoration) == textDecoration){     //проверка на перечеркнутость
            y[i].parentNode.parentNode.removeChild(y[i].parentNode);
            --i;
        }
    }
    if(typeof login != "undefined"){
        SaveClick();
    }
}
//////////////Сохранение списка заданий/////////////////////////
function SaveClick(){
    if(typeof login == "undefined"){
      if(confirm("Необходимо авторизоваться")){
          document.location.href = "Login.html";
      }
    }
    $.ajax({                                       //очистка на сервере всех заданий данного пользователя
        type: "POST",                                     
        url: "server/serverlist.php",                           
        data: "del=" + login,
        success : function(response){
                var x = document.getElementsByClassName("list__task");
                for (var i = 0; i < x.length; i++){
                    var b = new List(login, x[i].innerText, 0);           //создание объекта с заданием
                    if((x[i].style.textDecoration) == textDecoration){     //проверка на перечеркнутость
                        b.flag = 1;
                    }
                    masTask.push(b); ////////добавление в массив нового объекта с заданием
                    // var c =  JSON.stringify(masTask);
                    // console.log(JSON.parse(c));
                    $.ajax({                                               //Отправка на сервер объекта 
                        type: "POST",                                     
                        url: "server/serverlist.php",                           
                        // data: {result:JSON.stringify(b)},
                        data: {result:b},
                        success : function(response){
                        }
                    });
                }
            }   
    });
}
///////////////Загрузка списка заданий/////////////////////////
function ReadClick(){
    ClearClick();
    $.ajax({
        type: "POST",                                     
        url: "server/readlist.php",                           
        data:"read=" + login,
        success : function(response){
                var c = JSON.parse(response);
                for(var i=0; i<c.length;i++){
                    createList(c[i][0], c[i][1]);                         //отрисовка заданий с базы данных
                }         
            }
    });
}
////////////////////////Создание Div (Div с текстом + кнопка DEL)/////////////////
function createList(task, flag){
    var newTask               = document.createElement('div');            //DIV
        newTask.className     = "list";
        newTask.id            = 'list';

    var newDivTask            = document.createElement('div');            //DIV с текстом
        newDivTask.className  = "list__task";
        newDivTask.id         = "listTask";
        newDivTask.onclick    = function(){
                                  if((this.style.textDecoration) == textDecoration){
                                      this.style.textDecoration = "";
                                      this.parentElement.style.backgroundColor = "";
                                  }
                                  else{
                                      this.style.textDecoration = textDecoration;
                                  }
                                  if(typeof login != "undefined"){
                                        SaveClick();
                                    }
                                };
        if(flag==1){
            newDivTask.style.textDecoration   = "line-through black";
        }

    var newBtnDel             = document.createElement('div');           //Кнопка DEL
        newBtnDel.className   = "list__del";
        newBtnDel.id          = "listDel";
        newBtnDel.innerHTML       = "X";
        newBtnDel.onclick     = function(){
                                    this.parentNode.parentNode.removeChild(this.parentNode);
                                    if(typeof login != "undefined"){
                                        SaveClick();
                                    }
                                };
          /////////////В DIV в BODY вложить Div (Div с текстом + кнопка DEL)
          // var g = document.getElementById('form');
          // var f = document.getElementById('tasks');
          // var height = window.getComputedStyle(g, null).height;
          // var heighttt = window.getComputedStyle(f, null).height;
          
          listTasks.appendChild(newTask);    
          newTask.appendChild(newDivTask); 
          newTask.appendChild(newBtnDel);
          newDivTask.innerHTML =  task;
         }
//////////////////Ссылка Exit, очитска sessionStorage///////////////////////////////
function ExitClick(){
    sessionStorage.clear();
}