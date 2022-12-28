current_user=JSON.parse(localStorage.getItem('current_user'));
var name=current_user.firstname;

const username_div= document.getElementById('hello_user');
username_div.innerHTML="Hello "+name;

var all_record_participant_div=document.getElementById('all_record_participants');

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
})
var last_connec_date= cookie[current_user.email]
last_connect.innerHTML=last_connec_date;
// const items={...localStorage}
// console.log(items)

// var values = [],
//     keys = Object.keys(localStorage),
//     i = keys.length;
// var ul = document.createElement("ul");
// while ( i-- ) {
//     if(keys[i]!="current_user"){
//       //values.push( localStorage.getItem(keys[i]) );
//       let li = document.createElement("li");
//       var user=JSON.parse(localStorage.getItem(keys[i]));
//       var name_user=user.firstname; 
//       var email=user.email;
//       var all_points=user.all_points;
//       li.innerHTML = name_user+" "+email+" wins "+all_points+" games"; 
//       ul.appendChild(li); 
//     }
// }

// console.log(values)


// // for (let i of values) { 
// //     let li = document.createElement("li");
// //     var user=i;
// //     var name_user=i["firstname"]; 
// //     li.innerHTML = name_user; 
// //     ol.appendChild(li); 
// // }
// all_record_participant_div.appendChild(ul)


//var table = document. createElement('table');

// SET THE TABLE ID.
// WE WOULD NEED THE ID TO TRAVERSE AND EXTRACT DATA FROM THE TABLE.
//table.setAttribute('id', 'recordTable');

var arrHead = new Array();
arrHead = ['Name', 'Email', 'Total Points Hangman Game', 'Total Points Memorie Game'];

var values2 = [],
    keys = Object.keys(localStorage),
    i = keys.length;

while ( i-- ) {
    if(keys[i]!="current_user"){
      values2.push( localStorage.getItem(keys[i]) );
    //   let li = document.createElement("li");
    //   var user=JSON.parse(localStorage.getItem(keys[i]));
    //   var name_user=user.firstname; 
    //   var email=user.email;
    //   var all_points=user.all_points;
    //   li.innerHTML = name_user+" "+email+" wins "+all_points+" games"; 
    //   ul.appendChild(li); 
    }
}


// var arrValue = new Array();
// arrValue. push(['1', 'Green Field', 'Accountant']);
// arrValue.push(['2', 'Arun Banik', 'Project Manager']);
// arrValue.push(['3', 'Dewane Paul', 'Programmer']);

var table = document.createElement("TABLE");  //makes a table element for the page


        
for(var i = 0; i < values2.length; i++) {
    var row = table.insertRow(i);
    var user=JSON.parse(values2[i]);
    row.insertCell(0).innerHTML = user.firstname;
    row.insertCell(1).innerHTML =user.email;
    row.insertCell(2).innerHTML = user.all_points_hangman;
    row.insertCell(3).innerHTML = user.all_points_memorie;
}

var header = table.createTHead();
var headerRow = header.insertRow(0);
for(var i = 0; i <arrHead.length; i++) {
    headerRow.insertCell(i).innerHTML = arrHead[i];
}
all_record_participant_div.appendChild(table)

