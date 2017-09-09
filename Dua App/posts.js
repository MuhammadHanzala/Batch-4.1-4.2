var database = firebase.database().ref();
var posts = document.getElementById("posts");
var currentUser = JSON.parse(localStorage.getItem('currentUser'));

database.child("posts").on("child_added", function(snapshot){
    var obj = snapshot.val();
    obj.id = snapshot.key;
    render(obj);
})
database.child("comments").on("child_added", function(snapshot){
    var obj = snapshot.val();
    // renderComment(obj);
})

function render(dua){
    var div = document.createElement("DIV");
    div.setAttribute("id", dua.id);

    var span = document.createElement("SPAN");
    var sender = document.createTextNode("Name: " + dua.sender +  ' ');
    var duaText = document.createTextNode("Dua: " + dua.dua);

    span.appendChild(sender);
    span.appendChild(duaText);
    div.appendChild(span);

    var commentBox = document.createElement("INPUT");
    commentBox.setAttribute("id", "comment" + dua.id);
    var btn = document.createElement("BUTTON");
    var btnText = document.createTextNode("Comment");
    btn.onclick = function(){
        submitComment(dua.id);
    }
    div.appendChild(commentBox);
    div.appendChild(btn);

    btn.appendChild(btnText);


    posts.appendChild(div);
}
function submitComment(duaId){
    var commentInput = document.getElementById("comment" + duaId);
    var commentObj = {
        sender: currentUser.name,
        comment: commentInput.value,
        duaId: duaId
    }
    database.child("comments").push(commentObj);
    commentInput.value = '';
}