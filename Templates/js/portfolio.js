

window.onload = function getPortfolio(){
    var ref =  firebase.database().ref('Portfolio');
    ref.on('value',getData,errorData);
 }
 
 function getData(data) {
 
         var ports = data.val();
         var keys = Object.keys(ports);
         console.log(keys);
         for(var i=0; i < keys.length;i++){
             var k = keys[i];
             var title = ports[k].Title;
             var exp = ports[k].Explanation;
             var link = ports[k].Link;
             
             addblog(k,title,exp,link);
     
         }
     
    
 }
 function errorData(error){
     console.log(error.message);
 }

 function addblog(k,title,exp,link){
     firebase.storage().ref('Portfolio/' +k+'/port.jpg').getDownloadURL().then(imgUrl =>{
     var pcontainer = document.getElementsByClassName('p-content')[0];
    var div1 = document.createElement('div');
    div1.classList.add('p-item');
    div1.style.backgroundImage = `url('${imgUrl}')`;
    div1.style.backgroundRepeat= "no-repeat";
    div1.style.backgroundSize= "100% 100%";
    pcontainer.appendChild(div1);
    var h3 = document.createElement('h3');
    h3.innerText = title;
    div1.appendChild(h3);
    var p = document.createElement('p');
    p.innerText = exp;
    div1.appendChild(p);

    var a = document.createElement('a');
    a.setAttribute("target","blank-page");
    a.href = link;
    div1.appendChild(a);
    var b1 = document.createElement('button');
    b1.innerText = "Click here to view";
    a.appendChild(b1);


     
     }).catch(error=>{
         console.log(error);
     });
 }
 
 
 