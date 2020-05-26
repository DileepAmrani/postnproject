setTimeout(()=>{

    
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
        location.href = "./pages/home.html";
        // ...
    } else {
        location.href = "./pages/signup.html"
        // User is signed out.
        // ...
    }
});
},3000)
