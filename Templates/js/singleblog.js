var getParams = function (url) {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};
var params =getParams(document.URL);
var id = params["id"];
fetch(`http://localhost:3500/blogs/${id}`)
 .then(res => res.json())
 .then(res =>{
   console.log(res);
     var singleblog = document.getElementById('single-blog');
     var img = setImg(res.data.blog.photo.data);
     singleblog.querySelector('img').src = img;
     var title = res.data.blog.Title;
     singleblog.querySelector('h1').innerText = title;
     var desc = res.data.blog.Description;
     singleblog.querySelectorAll('p')[0].innerText = desc;
     var intro = res.data.blog.Introduction;
     singleblog.querySelectorAll('p')[1].innerText = intro;
     var cont = res.data.blog.Content;
     singleblog.querySelectorAll('p')[2].innerText = cont;
 });


// var id = params["id"];
// console.log(id);


function commentBlog() {
    if(signedUser()){
    var comment = document.getElementById('textareacomment').value;
    if(comment!=""){
        firebase.database().ref('Comment/'+id+`/${new Date()}`).set({
            Id:id,
            Username:document.getElementById('top-username').innerText,
            Comment: comment
          }).catch(e=>{
            if(e){
            
            }
            else{
            }
        }).then(e=>{
            message("success","Comment Sent !!");
            location.reload();
        })
    }
    else
    {
        console.log("no Comment");
    }
    }
    else
    {
        document.getElementById('id01').style.display= 'block';
    }
}

window.onload = function getComments(){

    var comm =  firebase.database().ref('Comment/'+id);
    comm.on('value',getcommentdata,commenterror);

    
 }
 
 function getcommentdata(data) {
 
         var comments = data.val();
         var keys = Object.keys(comments);
         console.log(keys);
         for(var i=0; i < keys.length;i++){
             var k = keys[i];
             console.log(k);
             var name = comments[k].Username;
             var comment = comments[k].Comment;
             addcomments(comment,name);
         }
     
    
 }
 function commenterror(error){
     console.log(error.message);
 }
 var j=0;
 function addcomments(comment,name){
    console.log(comment);
    var com = document.getElementById('comments');
    var fs = document.createElement('div');
    fs.setAttribute('id','comment-field');
    com.appendChild(fs);
    var lg = document.createElement('legend');
    lg.innerText = name;
    fs.appendChild(lg);
    var p = document.createElement('p');
    p.innerText = comment;
    fs.appendChild(p);

 }
 var lastPlayerRef = firebase.database().ref('Blog/').orderByValue().limitToLast(5);

 lastPlayerRef.on("value", function(data) {
     var blos =data.val();
     var keys= Object.keys(blos);
     console.log(keys);
   console.log(data.val());

   for(var i=keys.length-1;i<keys.length;i--){
       var k = keys[i];
       var title = blos[k].Title;
       var ul = document.querySelector('.recent >ul');
       var li = document.createElement('li');
       li.innerText = title;
       ul.appendChild(li);
       console.log(title);
   }
 }, function (error) {
   console.log("Error: " + error.code);
 });
