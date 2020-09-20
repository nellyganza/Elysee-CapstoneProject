var ropend = false;
var nopend = false;
function openrem(){
    if(!ropend){
        document.getElementById('rem').style.display = "flex";
        ropend = true;
    }
    else
    {
        document.getElementById('rem').style.display = "none";
        ropend = false;
    }
}
