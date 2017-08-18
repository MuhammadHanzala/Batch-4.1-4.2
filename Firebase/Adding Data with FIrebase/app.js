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
    li.setAttribute("id", user.id);

    list.appendChild(li);
}




