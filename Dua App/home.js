var user = JSON.parse(localStorage.getItem('currentUser'));
var nameRow = document.getElementById('nameRow');
var emailRowail = document.getElementById('emailRow');
var sender = document.getElementById('sender');
var comment = document.getElementById('commentBox');
var database = firebase.database().ref();

nameRow.innerHTML = user.name;
emailRow.innerHTML = user.email;


function submit(){
    var post = {
        sender: sender.value,
        dua: comment.value
    }

    database.child('posts').push(post);
}