
document.getElementById(`logoutbtn`).addEventListener(`click`,()=>{
    window.location.href = `signin.html`
})

var database = firebase.database().ref(`/`)

document.getElementById(`signUpBtn`).addEventListener(`click`, () =>{
    
    var userName = document.getElementById(`userName`);
    var emailAddress = document.getElementById(`emailAddress`);
    var password = document.getElementById(`password`);
    var dataOfBirth = document.getElementById(`dataOfBirth`);
    var Address = document.getElementById(`Address`)

    const userData = {
        userName:userName.value,
        emailAddress:emailAddress.value,
        password:password.value,
        dataOfBirth:dataOfBirth.value,
        Address:Address.value,
    }
    console.log(userData)
    firebase.auth().createUserWithEmailAndPassword(userData.emailAddress, userData.password).then((userObj)=>{
        database.child(`allUsers/${userObj.user.uid}`).set(userData)
        window.location.href = `signIn.html`
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        // ...
      });
})