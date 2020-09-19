
// Display of Blog



window.onload = function getBlogl(){
    var ref =  firebase.database().ref('Blog');
    ref.on('value',getData,errorData);

 }
 
 function getData(data) {
 
         var blogs = data.val();
         var keys = Object.keys(blogs);
         console.log(keys);
         var j=0;
         for(var i=0; i < keys.length;i++){
             var k = keys[i];
             var title = blogs[k].Title;

             
             addblog(k,title,i);
         }
     
    
 }
 function errorData(error){
     console.log(error.message);
 }
 var j=0;
 function addblog(k,title,id){
     firebase.storage().ref('BlogImage/' +k+'/blog.jpg').getDownloadURL().then(imgUrl =>{ 
     var blo = document.getElementById('blog-list');
     console.log(blo);
     console.log(k+title+id);
        var dtab;
    if(id%5==0){
        j++;
        console.log('1');
        dtab = document.createElement('div');
        dtab.setAttribute('id',`tab${j}`);
        dtab.setAttribute('class','tab-list');
        blo.appendChild(dtab);
    }
    else
    {
        dtab = document.getElementById(`tab${j}`);
        console.log(dtab);
    }
    

     var ldiv = document.createElement('div');
     ldiv.classList.add('art-item');
     dtab.appendChild(ldiv);
 
        var limg = document.createElement('img');
     limg.setAttribute("src", imgUrl);
     limg.setAttribute("width", "80px");
     limg.setAttribute("height", "60");
     limg.setAttribute("alt", "Blog  Image");
     ldiv.appendChild(limg);
     var lh = document.createElement('h1');
     lh.style.fontSize = "16px";
     lh.innerHTML = `<strong style="margin-right:5px,">ID :${k}</strong> <br>Title  :${title}`;
     ldiv.appendChild(lh);

     

    if(id%5==0){
        var butab = document.getElementsByClassName('number-tabs')[0];
        var label  = document.createElement('label');
        label.setAttribute("onclick",`nextTab(event, 'tab${j}')`);
        label.setAttribute('class','nextlinks');
        label.innerHTML =  `${j}`;
        butab.appendChild(label);
    }
    

     }).catch(error=>{
         console.log(error);
     });
 }

 function nextTab(event,tannum){
    var i, tablist, nextlinks;
    tablist = document.getElementsByClassName("tab-list");
    for (i = 0; i < tablist.length; i++) {
      tablist[i].style.display = "none";
    }
    nextlinks = document.getElementsByClassName("nextlinks");
    for (i = 0; i < nextlinks.length; i++) {
      nextlinks[i].className = nextlinks[i].className.replace(" active", "");
    }
    document.getElementById(tannum).style.display = "block";
    event.currentTarget.className += " active";
 }


 