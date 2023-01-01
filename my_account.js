
var current_user=JSON.parse(localStorage.getItem('current_user'));
const firstname = document.getElementById('firstname'); 
firstname.innerHTML=current_user.firstname;

const lastname = document.getElementById('lastname'); 
lastname.innerHTML=current_user.lastname;

const email = document.getElementById('email'); 
email.innerHTML=current_user.email;

const password = document.getElementById('password'); 
password.innerHTML=current_user.password;

const last_connection = document.getElementById('last_connection'); 
var index=current_user.connection.length-1;
var last_connec=current_user.connection[index];

last_connection.innerHTML=last_connec;

const total_points_memory = document.getElementById('total_points_memory'); 
total_points_memory.innerHTML=current_user.all_points_memorie;

const total_points_hangman = document.getElementById('total_points_hangman'); 
total_points_hangman.innerHTML=current_user.all_points_hangman;
