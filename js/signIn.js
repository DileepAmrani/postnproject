document.getElementById(`logoutbtn`).addEventListener(`click`,()=>{
    window.location.href = `signUp.html`
})



var database = firebase.database().ref(`/`)



document.getElementById(`signinBtn`).addEventListener(`click`, ()=>{
    var emailAddress = document.getElementById(`emailAddress`);
    var password = document.getElementById(`password`);

    const user = {
        emailAddress: emailAddress.value,
        password: password.value,
    }

    firebase.auth().signInWithEmailAndPassword(user.emailAddress, user.password)
    .then((res)=>{
        alert(`login successfull`);

     database.child(`allUsers/${res.user.uid}`).on(`value`, (value)=>{

        var result = value.val()
        result.id = value.key;
     
       localStorage.setItem(`CurentUser`, JSON.stringify(result))

     window.location.href = `home.html`
})
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(`login unsuccessfull`)

      });
})