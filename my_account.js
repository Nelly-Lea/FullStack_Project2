
var current_user=JSON.parse(localStorage.getItem('current_user'));
const firstname = document.getElementById('firstname'); 
firstname.innerHTML=current_user.firstname;

const lastname = document.getElementById('lastname'); 
lastname.innerHTML=current_user.last_name;

const email = document.getElementById('email'); 
email.innerHTML=current_user.email;

const password = document.getElementById('password'); 
password.innerHTML=current_user.password;

// const last_connection = document.getElementById('last_connection'); 
// var index=current_user.connection.length-1;
// var last_connec=current_user.connection[index];

var last_connect=document.getElementById('last_connection')
let cookie = {};
document.cookie.split(';').forEach(function(el) {
  let [key,value] = el.split('=');
  cookie[key.trim()] = value;
})
var last_connec_date= cookie[current_user.email]
last_connect.innerHTML=last_connec_date;

//last_connection.innerHTML=last_connec;

const total_points_memory = document.getElementById('total_points_memory'); 
const total_point_mem=current_user.all_points_memorie
total_points_memory.innerHTML=total_point_mem;

const level_memory = document.getElementById('level_memory'); 
if(total_point_mem==0)
{
    level_memory.innerHTML = 'level 1';
}
else{
  if(total_point_mem==1){
    level_memory.innerHTML = 'level 2';
}
  else{
    level_memory.innerHTML = 'level 3';
}
}
const number_win_memory = document.getElementById('num_win_memory'); 
const number_lost_memory=document.getElementById('num_lost_memory');

const number_win_hangman = document.getElementById('num_win_hangman'); 
const number_lost_hangman=document.getElementById('num_lost_hangman');
var array_win=current_user.records;
console.log(array_win)
var counter_win_memory=0;
var counter_lost_memory=0;
var counter_win_hangman=0;
var counter_lost_hangman=0;
for(const item of array_win){
    if(item.win=="win"&& item.game_id==1){
        counter_win_memory++;
    }
    else{
        if(item.win=="lost"&& item.game_id==1){
            counter_lost_memory++;
        }
        else{
            if(item.win=="win"&&item.game_id==2){
               counter_win_hangman++;
            }
            else{
                counter_lost_hangman++;
            }
        }
        
    }
}
number_win_memory.innerHTML=counter_win_memory;
number_lost_memory.innerHTML=counter_lost_memory;

number_win_hangman.innerHTML=counter_win_hangman;
number_lost_hangman.innerHTML=counter_lost_hangman;

const total_points_hangman = document.getElementById('total_points_hangman'); 
total_points_hangman.innerHTML=current_user.all_points_hangman;
