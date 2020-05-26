document.getElementById(`logoutbtn`).addEventListener(`click`, () => {

    firebase.auth().signOut().then((res) => {

        localStorage.removeItem("CurentUser")

        console.log(res, `signout`)
        window.location.href = `signUp.html`

    }), (err) => {
        console.log(err, `signout error`)


    }
})


var userCurrent = JSON.parse(localStorage.getItem(`CurentUser`))
console.log(userCurrent)
document.getElementById(`username`).innerHTML = `@` + userCurrent.userName;
document.getElementById(`mail`).innerHTML = userCurrent.emailAddress;
document.getElementById(`birth`).innerHTML = userCurrent.dataOfBirth;
document.getElementById(`address`).innerHTML = userCurrent.Address;


var postText = document.getElementById(`postBox`)
var database = firebase.database().ref(`/`)


document.getElementById(`makePost`).addEventListener(`click`, () => {
    const postObj = {
        post: postText.value,
        userName: userCurrent.userName,
        postId:userCurrent.id
    }

    database.child(`Post`).push(postObj);

})

database.child(`Post`).on("child_added", (pram) => {
    let data = (pram.val())
    data.id = pram.key
    console.log(data)


    var middleDiv = document.getElementById(`middle_area`);
    var boxDiv = document.createElement(`div`)
    boxDiv.setAttribute(`id`, `postBoxDiv`)
    middleDiv.appendChild(boxDiv)
    var userIcon = document.createElement(`img`)
    userIcon.setAttribute(`src`, `../images/user.png`)
    boxDiv.appendChild(userIcon)
    var userName = document.createElement(`label`)
    var userNameText = document.createTextNode(data.userName)
    userName.appendChild(userNameText)
    boxDiv.appendChild(userName);


    var post = document.createElement(`p`)
    post.setAttribute(`id`, `postText`)
    var postTextNode = document.createTextNode(data.post)
    post.appendChild(postTextNode)
    boxDiv.appendChild(post);
if(data.postId === userCurrent.id){
    
    var deleteBtn = document.createElement(`input`)
    deleteBtn.setAttribute(`class`, `postEditDeleteBtn`)
    deleteBtn.setAttribute(`type`, `button`)
    deleteBtn.setAttribute(`value`, `Delete`)
    boxDiv.appendChild(deleteBtn)

    deleteBtn.addEventListener(`click`,()=>{
        database.child(`Post/${data.id}`).remove();
        boxDiv.remove();
    })
    
    var editBtn = document.createElement(`input`)
    editBtn.setAttribute(`class`, `postEditDeleteBtn`)
    editBtn.setAttribute(`type`, `button`)
    editBtn.setAttribute(`value`, `Edit`)
    boxDiv.appendChild(editBtn)
    
    editBtn.addEventListener(`click`,()=>{
        alert(`hello`);
        var newPost = prompt(`Enter Edit Text`)
        database.child(`Post/${data.id}`).update({post:newPost});
        post.innerHTML = newPost
    })
}
    
    var inputComeent = document.createElement(`input`)
    inputComeent.setAttribute(`type`, `text`);
    inputComeent.setAttribute(`id`, `inputComeent`);
    inputComeent.setAttribute(`placeholder`, `Comment here.....`);
    boxDiv.appendChild(inputComeent)
    
    var CommentBtn = document.createElement(`input`)
    CommentBtn.setAttribute(`id`, data.id)
    CommentBtn.setAttribute(`type`, `button`)
    CommentBtn.setAttribute(`value`, `Comment`)
    boxDiv.appendChild(CommentBtn)
    

    var likeBtn = document.createElement(`button`)
    likeBtn.setAttribute(`id`, data.id)
    // var like = document.createElement(`img`)
    // like.setAttribute(`src` , `../images/icons8-heart-outline-32.png`)
    var like = document.createTextNode("like")
    likeBtn.appendChild(like)
    boxDiv.appendChild(likeBtn)


    // var showComment = document.createElement(`button`)
    // showComment.setAttribute(`id`, `showBtn`)
    // var showBtnText = document.createTextNode("Show Comments")
    // showComment.appendChild(showBtnText)
    // boxDiv.appendChild(showComment)

    // showComment.addEventListener(`click`, () => {
    //     document.getElementById(`commentDiv`).style.display = "block"
    // })

    database.child(`Post/${CommentBtn.id}/comment`).on(`child_added`,(com)=>{
        var coment = com.val();
        coment.id = com.key;
            console.log(coment)

        var comDiv = document.createElement(`div`)
        comDiv.setAttribute(`id`, `commentDiv`)

        var ComuserName = document.createElement(`h3`)
        var ComuserNameText = document.createTextNode(`@` + coment.commentUser)
        ComuserName.appendChild(ComuserNameText)
        comDiv.appendChild(ComuserName)


        var com = document.createElement(`span`)
        com.setAttribute(`id`, `comtext`)
        var comTxt = document.createTextNode(coment.comment)
        com.appendChild(comTxt)
        comDiv.appendChild(com)

        var br = document.createElement(`br`)
        comDiv.appendChild(br)
        
if(coment.comentId === userCurrent.id){

    var CommentDeleteBtn = document.createElement(`input`)
    CommentDeleteBtn.setAttribute(`type`, `button`)
    CommentDeleteBtn.setAttribute(`value`, `Delete`)
    comDiv.appendChild(CommentDeleteBtn)

    CommentDeleteBtn.addEventListener(`click` , ()=>{
        database.child(`Post/${CommentBtn.id}/comment`).remove()
        comDiv.remove()
    })

    var CommentEditBtn = document.createElement(`input`)
    CommentEditBtn.setAttribute(`type`, `button`)
    CommentEditBtn.setAttribute(`value`, `Edit`)
    comDiv.appendChild(CommentEditBtn)

    CommentEditBtn.addEventListener(`click` , ()=>{
        var comEdit = prompt("Enter Editing")
        database.child(`Post/${CommentBtn.id}/comment/ ${coment.id}/` ).update(
           {
            comment:comEdit
           } 
        )
        
    })
    
    
}

boxDiv.appendChild(comDiv)

    })

    CommentBtn.addEventListener(`click`, () => {
        const comment = {
            comment: inputComeent.value,
            commentUser:userCurrent.userName,
            comentId:userCurrent.id
        }
        database.child(`Post/${CommentBtn.id}/comment`).push(comment);
    })




    likeBtn.addEventListener(`click`,()=>{  
    database.child(`Post/${CommentBtn.id}/likes`).on(`child_added`,(a)=>{
        var likeData = a.val();
               const likes={
                    userName:userCurrent.userName,
                    id:userCurrent.id
                }
    
                database.child(`Post/${CommentBtn.id}/likes/${userCurrent.id}`).set(likes)
        

        
     
            console.log(likeData.emailUser)
            
            if(likeData.like == 1){
                
                database.child(`Post/${CommentBtn.id}/likes/${userCurrent.id}`).update({like:--likeData.like, emailUser:""})
                // alert(`hello`);
                
            }
            else{
                likeBtn.style.backgroundColor = "yellow";
                database.child(`Post/${CommentBtn.id}/likes/${userCurrent.id}`).update({like:++likeData.like, emailUser:userCurrent.emailAddress})
        }
        })

    })
})

