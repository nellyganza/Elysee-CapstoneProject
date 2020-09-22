
// Display of Blog



window.onload = function getBlogl(){
    var ref =  firebase.database().ref('Blog');
    ref.on('value',getData,errorData);


    var ref2 =  firebase.database().ref('Contact');
    ref2.on('value',getcData,errorcData);


    var ref3 =  firebase.database().ref('Portfolio');
    ref3.on('value',getfData,errorfData);

    
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
 var j=0;var i=1;
 function addblog(k,title,id){
     firebase.storage().ref('BlogImage/' +k+'/blog.jpg').getDownloadURL().then(imgUrl =>{ 
     var blo = document.getElementById('blog-list');
     console.log("Blog-List ==> ",blo);
     console.log("Item :",k+title+id);
    let dtab;
    console.log("ID =",id);
    console.log("J =",j);
    let ch = j%5===0;
    console.log('Choice = ',ch)
    if(ch){
        console.log('1');
        dtab = document.createElement('div');
        dtab.setAttribute('id',`tab${i}`);
        dtab.setAttribute('class','tab-list');
        blo.appendChild(dtab);
        console.log("In CH True :",dtab)
        i++;
    }
    else
    {
        console.log("J IN Else ",j);
        console.log("I IN Else ",i);
        dtab = document.getElementById(`tab${i-1}`);
        console.log("Value :",dtab);
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

     
    
    if(ch){
        var butab = document.getElementsByClassName('number-tabs')[0];
        var label  = document.createElement('label');
        label.setAttribute("onclick",`nextTab(event, 'tab${i-1}')`);
        label.setAttribute('class','nextlinks');
        label.innerHTML =  `${i-1}`;
        butab.appendChild(label);
    }
    
    j++;
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


 
// Contact from to read Messages


  function getcData(data) {
  
         var conacts = data.val();
         var keys = Object.keys(conacts);
         console.log(keys);
         for(var i=0; i < keys.length;i++){
             var k = keys[i];
             var Name = conacts[k].Name;
             var email = conacts[k].Email;
             var Phone = conacts[k].PhoneNumber;
             var address = conacts[k].Address;
             var comment = conacts[k].Comment;
             
             addComment(Name,email,Phone,address,comment);
     
         }
     
    
  }
  function errorcData(error){
     console.log(error.message);
  }
  
  function addComment(Name,email,Phone,address,comment){
    console.log(Name,email,Phone,address,comment);
     var ccontainer = document.getElementById('contact-list');
      var innerMessage = document.createElement('div');
      innerMessage.classList.add('message-item');
  
      ccontainer.appendChild(innerMessage);
  
     var namelbl = document.createElement('label');
     namelbl.innerText = "Full Name : "+Name;
     innerMessage.appendChild(namelbl);
  
     var emaillbl = document.createElement('label');
      emaillbl.setAttribute('id','button1');
      emaillbl.setAttribute('value',`${email}`);
      emaillbl.setAttribute('role','button');
      emaillbl.setAttribute('onclick',`parent.location="mailto:${email}"`);
     emaillbl.innerText = "Email Address : "+email;
     innerMessage.appendChild(emaillbl);
     var phonelbl = document.createElement('label');
     phonelbl.innerText = "Phone Number : "+Phone;
     innerMessage.appendChild(phonelbl);
     var addresslbl = document.createElement('label');
     addresslbl.innerText = "Physical Address : "+address;
     innerMessage.appendChild(addresslbl);
     var commentlbl = document.createElement('textarea');
     commentlbl.innerText = comment;
     innerMessage.appendChild(commentlbl);
  
  }
  


  function getfData(data) {
 
    var ports = data.val();
    var keys = Object.keys(ports);
    console.log(keys);
    for(var i=0; i < keys.length;i++){
        var k = keys[i];
        var title = ports[k].Title;

        
        addPort(k,title,i);  
    }


}
function errorfData(error){
    console.log(error.message);
}
var t=0,m=1;
function addPort(k,title,id){
    firebase.storage().ref('Portfolio/' +k+'/port.jpg').getDownloadURL().then(imgUrl =>{ 
        var blo = document.getElementById('port-listid');
        console.log(blo);
        console.log(k+title+id);
    let dtab;
    if(t%5===0){
        console.log('1');
        dtab = document.createElement('div');
        dtab.setAttribute('id',`ftab${m}`);
        dtab.setAttribute('class','ftab-list');
        blo.appendChild(dtab);
        m++;
    }
    else
    {
        dtab = document.getElementById(`ftab${m-1}`);
        console.log(dtab);
    }


    var ldiv = document.createElement('div');
    ldiv.classList.add('art-item');
    dtab.appendChild(ldiv);

    var limg = document.createElement('img');
    limg.setAttribute("src", imgUrl);
    limg.setAttribute("width", "80px");
    limg.setAttribute("height", "60");
    limg.setAttribute("alt", "Portfolio  Image");
    ldiv.appendChild(limg);
    var lh = document.createElement('h1');
    lh.style.fontSize = "16px";
    lh.innerHTML = `<strong style="margin-right:5px,">ID :${k}</strong> <br>Title  :${title}`;
    ldiv.appendChild(lh);



    if(t%5==0){
        var butab = document.getElementById('fnumber-tabs');
        var label  = document.createElement('label');
        label.setAttribute("onclick",`fnextTab(event, 'ftab${m-1}')`);
        label.setAttribute('class','fnextlinks');
        label.innerHTML =  `${m-1}`;
        butab.appendChild(label);
    }

    t++;
}).catch(error=>{
    console.log(error);
});
}

function fnextTab(event,tannum){
    var i, tablist, nextlinks;
    tablist = document.getElementsByClassName("ftab-list");
    for (i = 0; i < tablist.length; i++) {
        tablist[i].style.display = "none";
    }
    nextlinks = document.getElementsByClassName("fnextlinks");
    for (i = 0; i < nextlinks.length; i++) {
        nextlinks[i].className = nextlinks[i].className.replace(" active", "");
    }
    document.getElementById(tannum).style.display = "block";
    event.currentTarget.className += " active";
}