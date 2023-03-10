current_user=JSON.parse(localStorage.getItem('current_user'));
var name=current_user.firstname;

const username_div= document.getElementById('hello_user');
username_div.innerHTML="Hello "+name;

var all_record_participant_div=document.getElementById('all_record_participants');

var link_to_memory_level=document.getElementById('memory_game_level');
link_to_memory_level.addEventListener("click", memory_level);

function memory_level(){
    const total_points_memory=current_user.all_points_memorie;
    if(total_points_memory==0){
      window.location="./index.html";
    }
    else{
      if(total_points_memory==1){
        window.location="./memorie_level2.html";
       }
      else{
       window.location="./memorie_level3.html";
     }
    }
}

var log_out_icone=document.getElementById("log_out_icone")
log_out_icone.addEventListener("click",log_out);
function log_out(){
    var current_user="";
    localStorage.removeItem('current_user');
    localStorage.setItem('current_user', JSON.stringify(current_user));

}

var last_connect=document.getElementById('last_connection')
let cookie = {};
document.cookie.split(';').forEach(function(el) {
  let [key,value] = el.split('=');
  cookie[key.trim()] = value;
}) // trim enleve les espace 
var last_connec_date= cookie[current_user.email]
last_connect.innerHTML=last_connec_date;

// SET THE TABLE ID.
// WE WOULD NEED THE ID TO TRAVERSE AND EXTRACT DATA FROM THE TABLE.
//table.setAttribute('id', 'recordTable');
  
var arrHead = new Array();
arrHead = ['Name', 'Email', 'Total Points Hangman Game', 'Total Points Memory Game', 'Level in Memory Game'];

var values2 = [],
    keys = Object.keys(localStorage),
    i = keys.length;

while ( i-- ) {
    if(keys[i]!="current_user"){
      values2.push( localStorage.getItem(keys[i]) );
    }
}


var table = document.createElement("TABLE");  //makes a table element for the page

     
for(var i = 0; i < values2.length; i++) {
    var row = table.insertRow(i);
    var user=JSON.parse(values2[i]);
    row.insertCell(0).innerHTML = user.firstname;
    row.insertCell(1).innerHTML =user.email;
    row.insertCell(2).innerHTML = user.all_points_hangman;
    row.insertCell(3).innerHTML = user.all_points_memorie;
    if(user.all_points_memorie==0)
    {
      row.insertCell(4).innerHTML = 'level 1';
    }
    else{
      if(user.all_points_memorie==1){
        row.insertCell(4).innerHTML = 'level 2';
    }
      else{
        row.insertCell(4).innerHTML = 'level 3';
    }
   }
}

var header = table.createTHead();
var headerRow = header.insertRow(0);
for(var i = 0; i <arrHead.length; i++) {
    headerRow.insertCell(i).innerHTML = arrHead[i];
}
all_record_participant_div.appendChild(table)


