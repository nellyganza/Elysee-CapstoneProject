
// Display of Blog



window.onload = function getBlogl(){
    var ref =  firebase.database().ref('Blog');
    ref.on('value',getData,errorData);
 }
 
 function getData(data) {
 
         var blogs = data.val();
         var keys = Object.keys(blogs);
         console.log(keys);
         for(var i=0; i < keys.length;i++){
             var k = keys[i];
             var title = blogs[k].Title;
             var desc = blogs[k].Descripttion;
             var date = blogs[k].Date;
             var intro = blogs[k].Introduction;
             var cont = blogs[k].Content;
             
             addblog(k,title,desc,date,intro,cont);
     
         }
     
    
 }
 function errorData(error){
     console.log(error.message);
 }
 
 function addblog(k,title,desc,date,intro,cont){
     firebase.storage().ref('BlogImage/' +k+'/blog.jpg').getDownloadURL().then(imgUrl =>{ 
     var blo = document.getElementById('blog-list');
     console.log(blo);
     var ldiv = document.createElement('div');
     ldiv.classList.add('art-item');
     blo.appendChild(ldiv);
 
       var limg = document.createElement('img');
     limg.setAttribute("src", imgUrl);
     limg.setAttribute("width", "100%");
     limg.setAttribute("height", "100px");
     limg.setAttribute("alt", "Blog  Image");
     ldiv.appendChild(limg);
     var lh = document.createElement('h1');
     lh.innerHTML = title;
     ldiv.appendChild(lh);
 
     }).catch(error=>{
         console.log(error);
     });
 }
