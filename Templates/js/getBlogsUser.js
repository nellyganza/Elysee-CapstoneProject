

// Display of Blog



// window.onload = function getBlog(){
//     var ref =  firebase.database().ref('Blog');
//     ref.on('value',getData,errorData);
//  }
 
 fetch('http://localhost:3500/blogs')
 .then(res => res.json())
 .then(res =>{
   console.log(res);
   res.data.blogs.forEach(element => {
     console.log(element.photo.data)
    //  setImg(element.photo.data);
     getData(element);
   });
 });

 function getData(data) {
 
         var blogs = data;
         var keys = Object.keys(blogs);
         console.log('Keys ==>',keys);
             var id = blogs._id;
             var title = blogs.Title;
             var desc = blogs.Description;
             var date = blogs.createdAt;
             var intro = blogs.Introduction;
             var cont = blogs.Content;
             var imgurl = blogs.photo.data;
             console.log(id,title,desc,date,intro,cont,imgurl);
             addblog(id,title,desc,date,intro,cont,setImg(imgurl));
       
 }
 function errorData(error){
     console.log(error.message);
 }
 
 function addblog(id,title,desc,date,intro,cont,imgUrl){
     console.log("Img URL ==>",imgUrl);
    //  firebase.storage().ref('BlogImage/' +k+'/blog.jpg').getDownloadURL().then(imgUrl =>{
     var otherblogcontainer = document.getElementById('other-blog');
     console.log(otherblogcontainer);
     var figure = document.createElement('figure');
     figure.classList.add('single-blog');
     figure.setAttribute('onclick','singleBlog(event)');
     otherblogcontainer.appendChild(figure);
     var img = document.createElement('img');
     img.setAttribute("src", imgUrl);
     img.setAttribute("width", "100%");
     img.setAttribute("height", "200px");
     img.setAttribute("alt", "This is The Image of the Blog post");
     figure.appendChild(img);
     var figcap = document.createElement('figcaption');
     figure.appendChild(figcap);
     var h1= document.createElement('h1');
     h1.classList.add('title');
     h1.innerHTML = title;
     figcap.appendChild(h1);
     var h3 = document.createElement('h3');
     figcap.appendChild(h3);
     var p1 = document.createElement('p');
     p1.classList.add('desc');
     p1.value = desc;
     var p2 = document.createElement('p');
     p2.classList.add('date');
     p2.value= date;
     h3.append(p1.value+" , "+p2.value);
     var p = document.createElement('p');
     p.width = "100%";
     figcap.appendChild(p);
     p.innerText = intro;
     var pp = document.createElement('p');
     pp.setAttribute('hidden',true);
     pp.innerText = cont;
     figcap.appendChild(pp);

     var h5= document.createElement('h5');
     h5.setAttribute('hidden',true);
     h5.innerText = id;
     figcap.appendChild(h5);
    //  }).catch(error=>{
    //      console.log(error);
    //  });
     motionPicture();
 }
 var i=0;
 var tid = setInterval(motionPicture, 5000);
 function motionPicture(){
     try{
     var x = document.getElementsByClassName("single-blog");
         if(i==x.length)
             i=0;
       var y =x[i].lastChild;
       var blo = document.getElementById('main-blog');
       blo.firstElementChild.innerHTML = y.firstChild.innerHTML;
       blo.getElementsByTagName('img')[0].src = x[i].firstChild.src;
       var into = blo.lastElementChild;
       into.firstElementChild.innerText = y.getElementsByTagName('p')[0].innerText;
       i++;
     }catch(e){
 
     }
 }
 