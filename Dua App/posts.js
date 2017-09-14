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
    renderComment(obj);
})

function render(dua){
    var mainDiv = document.createElement("DIV");
    mainDiv.setAttribute("id", dua.id);
    mainDiv.setAttribute("class", "card dua");
    
    var div = document.createElement("DIV");
    div.setAttribute("class", "card-body");

    var span = document.createElement("SPAN");
    var senderTag = document.createElement("H4");
    senderTag.setAttribute("class", "card-title");
    var sender = document.createTextNode(dua.sender);
    senderTag.appendChild(sender);

    var duaTag = document.createElement("H6");
    duaTag.setAttribute("class", "card-text");    
    var duaText = document.createTextNode(dua.dua);
    duaTag.appendChild(duaText);

    span.appendChild(senderTag);
    span.appendChild(duaTag);
    div.appendChild(span);

    var commentBox = document.createElement("INPUT");
    commentBox.setAttribute("class", "form-control");
    commentBox.setAttribute("id", "comment" + dua.id);
    
    var btn = document.createElement("BUTTON");
    btn.setAttribute("class", "btn btn-primary");
    var btnText = document.createTextNode("Comment");
    btn.onclick = function(){
        submitComment(dua.id);
    }

    div.appendChild(commentBox);
    div.appendChild(btn);

    btn.appendChild(btnText);
    var commentsDiv = document.createElement("DIV");
    mainDiv.appendChild(commentsDiv);
    mainDiv.appendChild(div);
    posts.appendChild(mainDiv);
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
function renderComment(comment){
    var duaDiv = document.getElementById(comment.duaId);
    var commentsDiv = duaDiv.lastElementChild;
    
    var card = document.createElement("DIV");
    card.setAttribute("class", "card");
    
    var cardBody = document.createElement("DIV");
    cardBody.setAttribute("class", "card-body");

    var senderTag = document.createElement("H5");
    senderTag.setAttribute("class", "card-title");
    var sender = document.createTextNode(comment.sender);
    senderTag.appendChild(sender);

    var commentTag = document.createElement("H6");
    commentTag.setAttribute("class", "card-text");
    var commentText = document.createTextNode(comment.comment);
    commentTag.appendChild(commentText);

    cardBody.appendChild(senderTag);
    cardBody.appendChild(commentTag);

    card.appendChild(cardBody);

    commentsDiv.appendChild(card);
}