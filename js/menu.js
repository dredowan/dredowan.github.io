$(document).ready(function(){
    if(localStorage.playername){
        $("#nama").text(localStorage.playername);
        // document.getElementById("nama").innerHTML = "localStorage.playername";
        console.log(localStorage.playername);
    }else{
        console.log("USER NOT SIGNED");
        window.location.href="index.html";
    }
});
