
var sign_up_button = document.getElementById("submit_sign_up_button")
var button_login=document.getElementById("button_login")
let essai=1;
sign_up_button.addEventListener("click",sign_up);
button_login.addEventListener("click", login);
var link=document.getElementById("link_to_menu_page");

var current_user=null;

 
function sign_up(){
    var first_name=document.getElementById('fname_sign_up');
    var last_name=document.getElementById('lname_sign_up');
    var email_sign_up=document.getElementById('email_sign_up');
    var password_sign_up=document.getElementById('password_sign_up');
    var password_sign_up_conf=document.getElementById('confirm_password_sign_up');
    if(first_name.value !=''&& last_name.value!=''&&email_sign_up.value!='' && password_sign_up.value!='' && password_sign_up.value==password_sign_up_conf.value){
        let user=new Object();
        user.firstname=first_name.value;
        user.last_name=last_name.value;
        user.email=email_sign_up.value;
        user.password=password_sign_up.value;
        user.connection=[];
        user.records=[]
        var all_points_hangman=0;
        user.all_points_hangman=all_points_hangman;
        var all_points_memorie=0;
        user.all_points_memorie=all_points_memorie;
        localStorage.setItem(email_sign_up.value, JSON.stringify(user));
        current_user=user;
        //rentrer dans la page jeux 
        localStorage.setItem('current_user', JSON.stringify(current_user));
        //link.href="./menupage.html";
        window.location="./menupage.html";
        //document.cookie=user;
    }
    else{
          if(first_name.value ==''|| last_name.value==''||email_sign_up.value=='' || password_sign_up.value=='' || password_sign_up_conf==''){// a enlever si submit button
            alert("please fill all fields")
          }

            if(password_sign_up.value!=password_sign_up_conf.value){
                alert("password don't match")

            }
  
    }
    

    
}

function login(){
   
    let max_essai=3;
    var email_login=document.getElementById("email_login");
    var password=document.getElementById("password_login");
    var user=JSON.parse(localStorage.getItem( email_login.value));
    if(essai==max_essai) //si on a est arrive a 3 essais on bloque les fields
    { 
        setTimeout(blocking,  15000);
        alert("you are blocked for 15 seconds");
        document.getElementById("email_login").disabled = true;
        document.getElementById("password_login").disabled = true;
        document.getElementById("button_login").disabled = true;

    }
    let essai_again=max_essai-essai;
    essai++;
    if(user!=null)//si le user existe ds la local storage
    {
        if(password.value!=user.password)// si le user s'est trompe de password
        {
            if(essai_again!=0){
              var s="error in password,you have "+essai_again+" tries left ";
              alert(s)
            }
        }
        else{ // bon user 
            var d=new Date();
            user.connection.push(d);
            // var connec=new Date(user.connection[0]);
            // console.log(connec)
            
        //    let time = connec.getHours() + ":" + connec.getMinutes() + ":" + connec.getSeconds();
        //     console.log(time);
            

            localStorage.removeItem(email_login.value);
            localStorage.setItem(email_login.value,JSON.stringify(user));
            current_user=user;
            localStorage.setItem('current_user', JSON.stringify(current_user));
            var now = new Date();
            var time = now.getTime();
            var expireTime = time + 1000*36000;
            now.setTime(expireTime);
            //document.cookie = 'cookie=ok;expires='+now.toUTCString()+';path=/';
            //console.log(document.cookie);  // 'Wed, 31 Oct 2012 08:50:17 UTC'
            document.cookie=email_login.value+"="+d+";expires="+now.toUTCString()+';path=/';
            // link.href="./menupage.html";
            window.location="./menupage.html";
            //ouvrir une autre page -page des jeux
        }
    }
    else{
        if(email_login.value!='')// erreur ds le mail/username
        {
            alert("Your username doesn't exist, please sign up before , you have "+essai_again+" tries left")
        }
        if(email_login.value==''|| password.value=='')// oublie de taper mail ou password
        {
            alert("please fill fields")
            essai--;
        }
       
    }
    
}

function blocking(){
    alert("you can try to login");
    document.getElementById("email_login").disabled = false;
    document.getElementById("password_login").disabled = false;
    document.getElementById("button_login").disabled = false;
   
}


//nellylea@gmail.com
//Password1!