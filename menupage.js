current_user=JSON.parse(localStorage.getItem('current_user'));
var name=current_user.firstname;

const username_div= document.getElementById('hello_user');
username_div.innerHTML="Hello "+name;

var all_record_participant_div=document.getElementById('all_record_participants');
// const items={...localStorage}
// console.log(items)

var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;
var ol = document.createElement("ol");
while ( i-- ) {
    if(keys[i]!="current_user"){
      //values.push( localStorage.getItem(keys[i]) );
      let li = document.createElement("li");
      var user=JSON.parse(localStorage.getItem(keys[i]));
      var name_user=user.firstname; 
      var email=user.email;
      var all_points=user.all_points;
      li.innerHTML = name_user+" "+email+" wins "+all_points+" games"; 
      ol.appendChild(li); 
    }
}

console.log(values)


// for (let i of values) { 
//     let li = document.createElement("li");
//     var user=i;
//     var name_user=i["firstname"]; 
//     li.innerHTML = name_user; 
//     ol.appendChild(li); 
// }
all_record_participant_div.appendChild(ol);