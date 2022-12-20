
var sign_up_button = document.getElementById("submit_sign_up_button")
// var button_login=document.getElementById("button_login")

sign_up_button.addEventListener("click",sign_up);
// button_login.addEventListener("click", login);
 
function sign_up(){
   localStorage.removeItem('user1')
    
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
        localStorage.setItem(email_sign_up.value, JSON.stringify(user));

    }
    else{

            if(password_sign_up.value!=password_sign_up_conf.value){
                alert("password don't match")

            }
  
    }
    

    
}

// function login(){
//     var email_login=document.getElementById("email_login");
//     var password=document.getElementById("password_login");


// }







