var database = firebase.database().ref("/")
var input = document.getElementById("demo");
var list = document.getElementById("list");

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

function render(user){
    var li = document.createElement("LI");
    var text = document.createTextNode(user.name);
    li.appendChild(text);
    li.setAttribute("class", "list-group-item");
    li.setAttribute("id", user.id);

    var deleteBtn = document.createElement("BUTTON");
    var btnText = document.createTextNode("Delete");
    deleteBtn.appendChild(btnText);
    deleteBtn.setAttribute("class", "btn btn-danger float-right");
    deleteBtn.onclick = function() {
        remove(user.id);
    }

    li.appendChild(deleteBtn);
    list.appendChild(li);
}


function remove(key){
    database.child("users/" + key).remove();
}
database.child("users").on("child_removed", function(data){
    var deletedLi = document.getElementById(data.key);
    deletedLi.remove();
})



