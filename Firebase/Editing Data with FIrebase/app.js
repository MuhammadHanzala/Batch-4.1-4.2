var database = firebase.database().ref("/")
var input = document.getElementById("demo");
var list = document.getElementById("list");




//   Adding data
function add(){
    var user = {
        name: input.value,
    }
    database.child("users").push(user);
    input.value = '';
}


database.child("users").on("child_added", function(snapshot){
    var obj = snapshot.val();
    obj.id = snapshot.key;
    render(obj);
})
 
//  Data rendering

function render(user){
    var li = document.createElement("LI"); // creating li
    var span = document.createElement("SPAN");
    var text = document.createTextNode(user.name);
    span.appendChild(text);
    li.appendChild(span);
    li.setAttribute("id", user.id);

    var deleteBtn = document.createElement("BUTTON"); // creating delete button
    var btnText = document.createTextNode("Delete");
    deleteBtn.appendChild(btnText);
    deleteBtn.onclick = function() {
        remove(user.id);
    }
    li.appendChild(deleteBtn);

    var editBtn = document.createElement("BUTTON"); // creating edit button
    var editBtnText = document.createTextNode("Edit");
    editBtn.appendChild(editBtnText);
    editBtn.onclick = function() {
        edit(user.id, user.name);
    }
    li.appendChild(editBtn);
    
    
    list.appendChild(li);
}

// removing data

function remove(key){
    database.child("users/" + key).remove();
}
database.child("users").on("child_removed", function(data){
    var deletedLi = document.getElementById(data.key);
    deletedLi.remove();
})

// editing data

function edit(key, text){
    var newText = prompt("New Text", text); // taking new value from user
    var newData = {
        name: newText
    }
    database.child("users/" + key).update(newData); // updating data at database
}

database.child("users").on("child_changed", function(data){    // updating at ui
    var deletedLi = document.getElementById(data.key);
    var textSpan =  deletedLi.firstChild;
    textSpan.innerText = data.val().name;
})