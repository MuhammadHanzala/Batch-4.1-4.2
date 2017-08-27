var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var nameInput = document.getElementById("name");
var database = firebase.database();
var auth = firebase.auth();  // access authentication service

function signup() {
    var email = emailInput.value;
    var password = passwordInput.value;
    var name = nameInput.value;

    auth.createUserWithEmailAndPassword(email, password) //promise
        .then(function (user) {
            return user.updateProfile({ displayName: name }) // updating info of user
                .then(function () {
                    location = 'login.html';
                })
        })
        .catch(function (error) {
            console.log(error.message);
        })


}

function login() {
    var email = emailInput.value;
    var password = passwordInput.value;

    auth.signInWithEmailAndPassword(email, password)
        .then(function(user){
            location = 'home.html';
        })
        .catch(function(error){
            alert(error.message);
        })
}