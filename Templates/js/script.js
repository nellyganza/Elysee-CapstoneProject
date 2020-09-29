  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBAFsqSLha1IbmidhjYdYZ8I82snlVauzY",
    authDomain: "elysee-capstone-project.firebaseapp.com",
    databaseURL: "https://elysee-capstone-project.firebaseio.com",
    projectId: "elysee-capstone-project",
    storageBucket: "elysee-capstone-project.appspot.com",
    messagingSenderId: "117960480433",
    appId: "1:117960480433:web:d34ba18728dcd2ff593490",
    measurementId: "G-8W7S92G424"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

function myFunction() {
    var x = document.getElementById("topnav");
    console.log(x)
    if (x.className === "topnavclass") {
        x.className += " responsive";
    } else {
        x.className = "topnavclass";
    }
}

function showoption(){
    var uuname = document.getElementById('top-username').innerText;
    console.log(uuname);
    if(uuname=='Username'){
      document.getElementById('id01').style.display='block';
    }
    else
    {
      var op = document.getElementById('user-option');
      var ulElement = document.querySelector( "#user-option ul" );
      var style = document.querySelector( "#user-option ul" ).style.display;
      if(style=="none")
          ulElement.style.display = "inline";
      else
          ulElement.style.display = "none";
    }
}

function getsblog() {
  var sb = document.getElementById('single-blog');
  console.log(sb);
}

function singleBlog(event){
  
  var info = event.currentTarget;
  console.log(info);  
  var img= info.querySelector('img').src;
  var title=info.querySelector(".title").innerText;
  var desc = info.querySelector('h3').innerText;
  var intro =info.querySelectorAll('p')[0].innerText;
  var cont =info.querySelectorAll('p')[1].innerText;
  var id = info.querySelector('h5').innerText;
  console.log(img);
  window.location.href = "sblog.html?img="+encodeURIComponent(img)+"&title="+title+"&desc="+desc+"&intro="+intro+"&cont="+cont+"&id="+id;
}


function openTab(evt, tabname) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabname).style.display = "block";
    evt.currentTarget.className += " active";
  }

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
// Messages 
function message(type,message){
	if(type=='success'){
      var div = document.getElementById('succ');
      div.getElementsByTagName('p')[0].innerText = message;
      div.style.display = "block";
       	document.getElementById("sclosebtn").onclick = ()=>{
       	document.getElementById('succ').style.display = 'none';
       }
    }
    else if(type=='danger'){
      var div =document.getElementById('dan');
      div.getElementsByTagName('p')[0].innerText = message;
      div.style.display = "block";
       	document.getElementById("dclosebtn").onclick = ()=>{
         document.getElementById('dan').style.display = 'none';
         }
    }
    else if(type=='info'){
      var div =document.getElementById('inf');
      div.getElementsByTagName('p')[0].innerText = message;
      div.style.display = "block";
       	document.getElementById("iclosebtn").onclick = ()=>{
         document.getElementById('inf').style.display = 'none';
         }
    }
    else if(type=='worning'){
      var div = document.getElementById('worn');
      div.getElementsByTagName('p')[0].innerText = message;
      div.style.display = "block";
       	document.getElementById("wclosebtn").onclick = ()=>{
         document.getElementById('worn').style.display = 'none';
         }
    }
}

// Sign Up Functions


var nameV, passV, cpassV, emailV;

function sready() {

    nameV = document.getElementById('userid');
    passV = document.getElementById('userpass');
    cpassV = document.getElementById('c-userpass');
    emailV = document.getElementById('useremail');
}
function clear() {
    document.getElementById('userid').value ="";
    document.getElementById('userpass').value ="";
    document.getElementById('useremail').value ="";
    document.getElementById('c-userpass').value ="";
}

function checkpass(){
    if(document.getElementById('userpass').value ==document.getElementById('c-userpass').value){
        return true;
    }
    else
    {
        return false;
    }
}
var logger = true;
async function signUp(){
    sready();
    if(checkpass()){
        if(nameV.checkValidity()){
            if(passV.checkValidity()){
                if(emailV.checkValidity()){
                  try {
                    const signin = await firebase.auth().createUserWithEmailAndPassword(emailV.value,passV.value);
                    const auth = firebase.auth(); 
                    const newdata = await firebase.database().ref('Users/' + auth.currentUser.uid).set({
                            Username: nameV.value,
                            Password: passV.value,
                            Email: emailV.value,
                        })
                        
                    if(!signin){
                      message("info","Account not created !!");
                    }
                    else
                    {
                      message("success","Account created successfully !!!");
                      clear();
                      
                    }
                  } catch (error) {
                    message("danger",error.message);
                  }
                }
                else{
                    message("danger",emailV.validationMessage);
                }

            }
            else{
                message("danger",passV.validationMessage);
            }
          
        }
        else{
            message("danger",nameV.validationMessage);
        }
    }
    else{
        message("worning","Passord Not Match!!");
    }
};

async function addAll(firebaseUser){
  console.log('here')
  const imgurl = await firebase.storage().ref('Users/' +firebaseUser.uid+'/profile.jpg').getDownloadURL();
  if(imgurl){
    putImage(imgurl);
  }
  else
  {
    putImage("https://as2.ftcdn.net/jpg/01/18/03/33/500_F_118033377_JKQA3UFE4joJ1k67dNoSmmoG4EsQf9Ho.jpg");
  }
  const usersigned = await firebase.database().ref('Users/' +firebaseUser.uid).on('value', function(snapshot) {
        putUsername(snapshot.val().Username,snapshot.val().Email);
    });
}

// Stage stanged

 firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
        console.log(firebaseUser);  
        console.log('There is a User ');
        addAll(firebaseUser)
	}
	else{
        console.log("No user logged in");
    }
});

// Sign in Codes

function clearSignIn(){
   document.getElementById('uname').value = "";
   document.getElementById('pwd').value = "";
}
async function signin(){
	var email = document.getElementById('uname').value;
    var password = document.getElementById('pwd').value;
  if(document.getElementById('uname').checkValidity()){
    try {
      const signed = await	firebase.auth().signInWithEmailAndPassword(email, password);
    if(!signed){
      message("info"," Not signed in !!");
    }
    else
    {
      message("success","Your logged in!!!");
      clearSignIn();
    }
    } catch (error) {
      message('error',error.message);
    }
    
  }
  else
  {
      message("danger",document.getElementById('uname').validationMessage);
  }
};


function putImage(imgUrl){
    var img = document.getElementById('user-img');
    var fimg = document.getElementById('edit-img');
    img.src = imgUrl;
    fimg.src = imgUrl;
}
function putUsername(username,email){
    console.log(username,email);
    document.getElementById('top-username').textContent = username;
    document.getElementById('updname').value = username;
    document.getElementById('updemail').value = email;
    getlocation();
}

// Slection a file 
var selectedFile;
function onFileSelected(event) {
    selectedFile = event.target.files[0];
    var reader = new FileReader();

    var imgtag = document.getElementById("edit-img");
    imgtag.title = selectedFile.name;

    reader.onload = function(event) {
        imgtag.src = event.target.result;
    };

    reader.readAsDataURL(selectedFile);
    }

    // Logout

    async function logout(){
      try {
        const logout = await firebase.auth().signOut();
        if(!logout){
          message('info',"Your are not logged out!!!");
        }
        else
        {
          document.getElementsByClassName('adminid')[0].style.display = "none";
          message("info","Logged out !!");
          putImage("https://as2.ftcdn.net/jpg/01/18/03/33/500_F_118033377_JKQA3UFE4joJ1k67dNoSmmoG4EsQf9Ho.jpg");
          putUsername("","","");
        }
      } catch (error) {
        message("worning",error.message);
      }       
    };


    // Admin user location 

    function initialize() {
        var ref =  firebase.database().ref('Locations');
        ref.on('value',getlocaData,locaErrorData);
            
        }
         function getlocaData(data) {
                var locations = [];
                 var locs = data.val();
                 var keys = Object.keys(locs);
                 console.log("Keys"+keys[0]);
                 for(var i = 0;i<keys.length;i++){
                    var k = keys[i];
                    var loca = locs[k].location;
                    locations.push(loca);
                 }
                 
                 
            console.log(locations);
        
            window.map = new google.maps.Map(document.getElementById('mapholder'), {
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
        
            var infowindow = new google.maps.InfoWindow();
        
            var bounds = new google.maps.LatLngBounds();
        
            for (i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                    map: map
                });
        
                bounds.extend(marker.position);
        
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent(locations[i][0]);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        
            map.fitBounds(bounds);
        
            var listener = google.maps.event.addListener(map, "idle", function () {
                map.setZoom(3);
                google.maps.event.removeListener(listener);
            });
                 
            
         }
         function locaErrorData(error){
          message("danger",error.message);
         }
      
        
        function loadScript() {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyADX_HVhXMO8IXWJRHzPpiEpNROmZhTBVw&callback=initialize&libraries=&v=weekly';
            document.body.appendChild(script);
            console.log(script);
        }
        function showmap(){
          document.getElementById('mapholder').style.display = 'inline';
          loadScript();
        }
        function closemap(){
          document.getElementById('mapholder').style.display = 'none';
        }

        // Client get User Location 

        function getlocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else { 
                console.log("Location not able to view");
            }
        }
    
        function showPosition(position) {
            var lname = document.getElementById('top-username').innerText;
            if(lname!=""){
                var latlon = [lname,position.coords.latitude,position.coords.longitude];
                console.log(latlon);
                firebase.database().ref('Locations/'+lname).set({
                    location: latlon
                  }).catch(e=>{
                    if(e){
                    
                    }
                    else{
                    location.reload();
                    }
                });
            }
            else
            {
                console.log("no name");
            }
    
        }


// Create a new Blog article


// getimge in view
var selectedBlog={};
function uploadBlogImg(event) {
  selectedBlog = event.target.files[0];
  var reader = new FileReader();

  var imgtag = document.getElementById("imageid");
  imgtag.title = selectedBlog.name;

  reader.onload = function(event) {
      imgtag.src = event.target.result;
  };

  reader.readAsDataURL(selectedBlog);
  }


var bimage,bid,btitle,bdesc,bdate,bintro,bcont,bsubbtn;

function bready(){
  bid =  document.getElementById('blogid').value;
  bimage =  document.getElementById('inpimg').value;
  btitle  =  document.getElementById('titleid').value;
  bdesc  =  document.getElementById('descid').value;
  bdate  =  document.getElementById('dateid').value;
  bintro  =  document.getElementById('introid').value;
  bcont  =  document.getElementById('contid').value;
  console.log(bid,bimage,btitle,bdesc,bdate,bintro,bcont);
}

function clearBlog(){
  document.getElementById('blogid').valu="";
  document.getElementById('inpimg').value="";
  document.getElementById('titleid').value="";
  document.getElementById('descid').value="";
  document.getElementById('dateid').value="";
  document.getElementById('introid').value="";
  document.getElementById('contid').value="";

}

function saveBlog(){
    bready();
    console.log(bid,bimage,btitle,bdesc,bdate,bintro,bcont);
    firebase.database().ref('Blog/' + bid).set({
      Id: bid,
      Image: bimage,
      Title: btitle,
      Descripttion: bdesc,
      Date:bdate,
      Introduction:bintro,
      Content: bcont,
      timestamp:new Date().getTime()
    }).catch(e=>{
        if(e){
          alert("Data Not Saved !!");
        }
        else{
          alert("Data Saved !!");
          location.reload();
        }
      });
    saveImageBlog();
    clearBlog();
};


function saveImageBlog(){
    firebase.storage().ref('BlogImage/'+ bid+'/blog.jpg').put(selectedBlog).then(function(){
      console.log('Successfully uploaded');
    }).catch(e=> {
      console.log(e.message)
    });
}

// Select The Blog
function searchBlog() {
    bid =  document.getElementById('blogid').value;
    clearBlog();
    firebase.database().ref('Blog/' + bid).on('value', function(snapshot) {
          document.getElementById('titleid').value=snapshot.val().Title;
          document.getElementById('descid').value=snapshot.val().Descripttion;
          document.getElementById('dateid').value=snapshot.val().Date;
          document.getElementById('introid').value=snapshot.val().Introduction;
          document.getElementById('contid').value=snapshot.val().Content;
          firebase.storage().ref('BlogImage/' +bid+'/blog.jpg').getDownloadURL().then(imgUrl =>{
            document.getElementById("imageid").src = imgUrl;
          }).catch(e=>{
            if(e){
              message("danger",e.message);
            }
            else{
              message("info","Data Found !!");
            }
          })
    },function(error){
        if(error){
          message("danger",error.message);
        }
        else{
          message("info","Data Found !!");
        }
    });
    
}
// This is the Update Operation
function updateBlog() {
    bready();
    firebase.database().ref('Blog/' + bid).update({
      Image: bimage,
      Title: btitle,
      Descripttion: bdesc,
      Date:bdate,
      Introduction:bintro,
      Content: bcont
    },error=>{
      if(error){
        message("danger","Data Not Updated!!");
      }
      else{
        message("success","Data Updated !!");
        location.reload();
      }
    });
    firebase.storage().ref('BlogImage/'+ bid+'/blog.jpg').put(selectedBlog).then(function(){
      
    }).catch(e=> {
      console.log(e.message)
    });
    clearBlog();
}


 // This is the Delete Operation
function deleteBlog() {
    bid =  document.getElementById('blogid').value;
    firebase.database().ref('Blog/' + bid).remove();

    firebase.storage().ref('BlogImage/' +bid+'/blog.jpg').delete().then(function() {
        console.log("Image Deleted !!")
    }).catch(function(error) {
        message("danger",error.message);
    });
      message("success","Blog Deleted!!");
    location.reload();
    clearBlog();
  }






// Portfolio

var pselectedFile={};
function onpFileSelected(event) {
 pselectedFile = event.target.files[0];
  var reader = new FileReader();

  var imgtag = document.getElementById("pimageid");
  imgtag.title = pselectedFile.name;

  reader.onload = function(event) {
      imgtag.src = event.target.result;
  };

  reader.readAsDataURL(pselectedFile);
  }



var pimage,pid,ptitle,pexp,plink,psubbtn;

function pready(){
  pid =  document.getElementById('ppotid').value;
  pimage =  document.getElementById('pinpimg').value;
  ptitle  =  document.getElementById('ptitle').value;
  plink  =  document.getElementById('plink').value;
  pexp  =  document.getElementById('pexp').value;
}

function pclear(){
  document.getElementById('ppotid').value="";
  document.getElementById('pinpimg').value="";
  document.getElementById('ptitle').value="";
  document.getElementById('plink').value="";
  document.getElementById('pexp').value="";
  document.getElementById("pimageid").src = "";

}

function savePortfolio() {
    pready();
    firebase.database().ref('Portfolio/' + pid).set({
      Id: pid,
      Image: pimage,
      Title: ptitle,
      Explanation:pexp,
      Link : plink

    }).catch(e=>{
      if(e)
        console.log(e.message);
      else
        {
          console.log("Portfolio Created !!");
          }
      }
    );
    saveImagePortfolio();
    pclear();
    // location.reload();
};


function saveImagePortfolio(){
    firebase.storage().ref('Portfolio/'+ pid+'/port.jpg').put(pselectedFile).then(function(){
      console.log('Successfully uploaded');
    }).catch(e=> {
      console.log(e.message)
    });
}


// Select The PortFolio
function searchPortfolio() {
    pid =  document.getElementById('ppotid').value;
    clearBlog();
    try{
      firebase.database().ref('Portfolio/' + pid).on('value', function(snapshot) {
  
        document.getElementById('ptitle').value=snapshot.val().Title;
        document.getElementById('plink').value=snapshot.val().Link;;
        document.getElementById('pexp').value=snapshot.val().Explanation;;
        firebase.storage().ref('Portfolio/'+ pid+'/port.jpg').getDownloadURL().then(imgUrl =>{
          document.getElementById("pimageid").src = imgUrl;
        }).catch(e=>{
          if(e)
             message("danger",error.message);
          else
             message("info","Data Found !!");
        })
  },function(error){
    if(error){
      message("danger",error.message);
    }
    else
    {
      message("info","Data Found !!");
    }
      
  });
    }
    catch(e){
      message("danger",e.message);
    }
    
    
  }

  // This is the Update Operation
function updatePortfolio() {
    pready();
    firebase.database().ref('Portfolio/' + pid).update({
        Image: pimage,
        Title: ptitle,
        Explanation:pexp,
        Link : plink
    },e=>{
      if(e){
        message("info","Portfolio not updated!!");
      }
      else
      {
        message("success","PortFolio Updated !!");
        location.reload();
      }
    });
    firebase.storage().ref('Portfolio/'+ pid+'/port.jpg').put(pselectedFile).then(function(){
      
    }).catch(e=> {
      message("danger",e.message)
    });
    pclear();
  }
  
  // This is the Delete Operation
function deletePortfolio() {
    pid =  document.getElementById('ppotid').value;
    firebase.database().ref('Portfolio/' + pid).remove();
  
    firebase.storage().ref('Portfolio/'+ pid+'/port.jpg').delete().then(function() {
      console.log("Image Deleted !!")
  }).catch(function(error) {
      message("danger",error.message);   
  });
  pclear();
  }
 
 


//   Comment or contact storing


var cnameV, cemailV, cphoneV, caddressV,commentV;

function cready() {
    cnameV = document.getElementById('name');
    cemailV = document.getElementById('email');
    phoneVar = document.getElementById('phoneid');
    caddressV = document.getElementById('address');
    commentV = document.getElementById('comment');
}

function cclear() {
    document.getElementById('name').value="";
    document.getElementById('email').value="";
    document.getElementById('phoneid').value="";
    document.getElementById('address').value="";
    document.getElementById('comment').value="";
}
function signedUser(){
   return document.getElementById('top-username').innerText !== 'Username';
}
// This is the Insert Operation
function sendComment() {
  console.log(signedUser())
  if(signedUser()){
    cready();
    if(cnameV.checkValidity() && cemailV.checkValidity() && phoneVar.checkValidity() && caddressV.checkValidity() && commentV.checkValidity()){
    console.log(cnameV.value,cemailV.value,phoneVar.value,caddressV.value,commentV.value);
        firebase.database().ref('Contact/' + cnameV.value).set({
            Name: cnameV.value,
            Email: cemailV.value,
            PhoneNumber: phoneVar.value,
            Address: caddressV.value,
            Comment: commentV.value
        });
        message("success","Message Sent Successfully!!");
        cclear();
    }
    else
    {
        message("danger","Invalid Input");
    }
    cclear();
  }
  else{
    document.getElementById('id01').style.display='block';
  }
}

// Slection a file 
var updatefile;
function onFileSelected(event) {
  updatefile = event.target.files[0];
    var reader = new FileReader();

    var imgtag = document.getElementById("edit-img");
    imgtag.title = updatefile.name;

    reader.onload = function(event) {
        imgtag.src = event.target.result;
    };

    reader.readAsDataURL(updatefile);
  }


function updatefrm(){
  var id =firebase.auth().currentUser.uid;
  if(updatefile!=undefined){
      firebase.storage().ref('Users/'+ id+'/profile.jpg').put(updatefile).then(function(){
      }).catch(e=> {
        message("danger",e.message);
      });
  }
  var nname = document.getElementById('updname').value;
  var nmai = document.getElementById('updemail').value;
  console.log(nname,nmai);
  firebase.database().ref('Users/' + id).update({
          Username: nname,
          Email: nmai
    },(error)=>{
          if(error){
              message("danger",error.message);
          }
          else{
              message("success","Data Updated");
              location.reload();
          }
    });
}




//   Login from JS
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//End of Login Form css



// Sign up From JS
// Get the modal
var modal = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function setImg(bufferer){
  var arrayBufferView = new Uint8Array(bufferer);
      var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL( blob );
      return imageUrl;
  }