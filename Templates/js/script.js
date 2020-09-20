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

document.getElementById('insert').onclick = function signupWithEmailAndPass(){
    ready();
    if(checkpass()){
        if(nameV.checkValidity() && passV.checkValidity() && emailV.checkValidity()){
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
            message("worning","Invalid Input !!! (Email or Name)");
        }
    }
    else{
        message("worning","Passord Not Match!!");
    }
}


// Stage stanged
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

firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
        console.log(firebaseUser);  
	}
	else{

    }
});
