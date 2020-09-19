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
    var op = document.getElementById('user-option');
    var ulElement = document.querySelector( "#user-option ul" );
    var style = document.querySelector( "#user-option ul" ).style.display;
    if(style=="none")
        ulElement.style.display = "inline";
    else
        ulElement.style.display = "none";
}

function singleBlog(event){
    var cont = event.target;
    console.log(cont);
    window.location.href = "sblog.html";
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

function ready() {

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
function signUp(){
    ready();
    if(checkpass()){
        if(nameV.checkValidity()){
            if(passV.checkValidity()){
                if(emailV.checkValidity()){
                    firebase.auth().createUserWithEmailAndPassword(emailV.value,passV.value).then(auth=>{
                        firebase.database().ref('Users/' + auth.user.uid).set({
                            Username: nameV.value,
                            Password: passV.value,
                            Email: emailV.value,
                        }).catch(e=>{
         
                            }
                        );
                        message("success","Account created successfully !!!");
                        clear();
                    }).catch(e=> {
                        if(e){
                            message("danger",e.message);
                        }
                    });
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


// Stage stanged

firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
        if(logger){
        console.log(firebaseUser);  
        firebase.storage().ref('Users/' +firebaseUser.uid+'/profile.jpg').getDownloadURL().then(imgUrl =>{
            putImage(imgUrl,"none","inline");
        }).catch(error=>{
            if(error){
                console.log(error.message);
            }
            putImage("https://as2.ftcdn.net/jpg/01/18/03/33/500_F_118033377_JKQA3UFE4joJ1k67dNoSmmoG4EsQf9Ho.jpg","none","inline");

        })
        firebase.database().ref('Users/' + firebaseUser.uid).on('value', function(snapshot) {
            putUsername(snapshot.val().Username,snapshot.val().Email);
        });  
        message("success","Logged in Successfully!!");
    }
	}
	else{
        message("info","Logged out Successfully!!");
        putImage("https://as2.ftcdn.net/jpg/01/18/03/33/500_F_118033377_JKQA3UFE4joJ1k67dNoSmmoG4EsQf9Ho.jpg","inline","none");
        putUsername("","","","");
    }
});

// Sign in Codes

function signin(){
	var email = document.getElementById('uname').value;
    var password = document.getElementById('pwd').value;
if(document.getElementById('uname').checkValidity()){
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        message("worning",errorMessage);
      });
    }
    else
    {
        message("danger",document.getElementById('uname').validationMessage);
    }
};


function putImage(imgUrl,st1,st2){
    var img = document.getElementById('user-img');
    var fimg = document.getElementById('edit-img');
    var signbtn = document.getElementById('signin-top');
    var photobtn = document.getElementById('user-option');
    img.src = imgUrl;
    fimg.src = imgUrl;
    signbtn.style.display = st1;
    photobtn.style.display = st2;
}
function putUsername(username,email){
    if(email=="nishimwelys@gmail.com"){
        document.getElementsByClassName('adminid')[0].style.display = "block";
    }
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

    function logout(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
           
           document.getElementsByClassName('adminid')[0].style.display = "none";
           message("info",'Logged Out');
          }).catch(function(error) {
            // An error happened.
           message("worning",error.message);
          });
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
             console.log(error.message);
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
var selectedFile={};
function onFileSelected(event) {
 selectedFile = event.target.files[0];
  var reader = new FileReader();

  var imgtag = document.getElementById("imageid");
  imgtag.title = selectedFile.name;

  reader.onload = function(event) {
      imgtag.src = event.target.result;
  };

  reader.readAsDataURL(selectedFile);
  }


var image,id,title,desc,date,intro,cont,subbtn;

function ready(){
  id =  document.getElementById('blogid').value;
  image =  document.getElementById('inpimg').value;
  title  =  document.getElementById('titleid').value;
  desc  =  document.getElementById('descid').value;
  date  =  document.getElementById('dateid').value;
  intro  =  document.getElementById('introid').value;
  cont  =  document.getElementById('contid').value;

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
    ready();
    console.log(id,image,title,desc,date,intro,cont);
    firebase.database().ref('Blog/' + id).set({
      Id: id,
      Image: image,
      Title: title,
      Descripttion: desc,
      Date:date,
      Introduction:intro,
      Content: cont
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
    firebase.storage().ref('BlogImage/'+ id+'/blog.jpg').put(selectedFile).then(function(){
      console.log('Successfully uploaded');
    }).catch(e=> {
      console.log(e.message)
    });
}

// Select The Blog
function searchBlog() {
    id =  document.getElementById('blogid').value;
    clearBlog();
    firebase.database().ref('Blog/' + id).on('value', function(snapshot) {
          document.getElementById('titleid').value=snapshot.val().Title;
          document.getElementById('descid').value=snapshot.val().Descripttion;
          document.getElementById('dateid').value=snapshot.val().Date;
          document.getElementById('introid').value=snapshot.val().Introduction;
          document.getElementById('contid').value=snapshot.val().Content;
          firebase.storage().ref('BlogImage/' +id+'/blog.jpg').getDownloadURL().then(imgUrl =>{
            document.getElementById("imageid").src = imgUrl;
          }).catch(e=>{
    
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
    ready();
    firebase.database().ref('Blog/' + id).update({
      Image: image,
      Title: title,
      Descripttion: desc,
      Date:date,
      Introduction:intro,
      Content: cont
    },error=>{
      if(error){
        alert("Data Not Updated!!");
      }
      else{
        alert("Data Updated !!");
        location.reload();
      }
    });
    firebase.storage().ref('BlogImage/'+ id+'/blog.jpg').put(selectedFile).then(function(){
      
    }).catch(e=> {
      console.log(e.message)
    });
    clearBlog();
}


 // This is the Delete Operation
function deleteBlog() {
    id =  document.getElementById('blogid').value;
    firebase.database().ref('Blog/' + id).remove();

    firebase.storage().ref('BlogImage/' +id+'/blog.jpg').delete().then(function() {
        console.log("Image Deleted !!")
    }).catch(function(error) {
        message("danger",error.message);
    });
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
    firebase.database().ref('Portfolio/' + pid).on('value', function(snapshot) {
  
          document.getElementById('ptitle').value=snapshot.val().Title;
          document.getElementById('plink').value=snapshot.val().Link;;
          document.getElementById('pexp').value=snapshot.val().Explanation;;
          firebase.storage().ref('Portfolio/'+ pid+'/port.jpg').getDownloadURL().then(imgUrl =>{
            document.getElementById("pimageid").src = imgUrl;
          }).catch(e=>{
    
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
        console.log("Portfolio not updated!!");
      }
      else
      {
        console.log("PortFolio Updated !!");
        location.reload();
      }
    });
    firebase.storage().ref('Portfolio/'+ pid+'/port.jpg').put(pselectedFile).then(function(){
      
    }).catch(e=> {
      console.log(e.message)
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

function ready() {
    cnameV = document.getElementById('name');
    cemailV = document.getElementById('email');
    phoneVar = document.getElementById('phoneid');
    caddressV = document.getElementById('address');
    commentV = document.getElementById('comment');
}

function clear() {
    document.getElementById('name').value="";
    document.getElementById('email').value="";
    document.getElementById('phoneid').value="";
    document.getElementById('address').value="";
    document.getElementById('comment').value="";
}

// This is the Insert Operation
function sendComment() {
    ready();
    if(cnameV.checkValidity() && cemailV.checkValidity() && phoneVar.checkValidity() && caddressV.checkValidity() && commentV.checkValidity()){
    console.log(cnameV.value,cemailV.value,phoneVar.value,caddressV.value,commentV.value);
        firebase.database().ref('Contact/' + cnameV.value).set({
            Name: cnameV.value,
            Email: cemailV.value,
            PhoneNumber: phoneVar.value,
            Address: caddressV.value,
            Comment: commentV.value
        });
        clear();
    }
    else
    {
        alert("Invalid Input");
    }
    clear();
}

