$(document).ready(function(){
    alert("GAME START");
    var obj =".fireball";
    $("#char").click(function(){
        console.log("JUMPING");
        $(this).attr("class","jump");
        setTimeout(function(){
            $("#char").removeAttr("class");
            console.log("JUMP ENDED");
        },3000);
    });
    function checkposition(element1,element2){
        var top1 = $(element1).offset().top;
        var left1 = $(element1).offset().left;
        var bottom1 = top1 + $(element1).height();
        var right1 = left1 + $(element1).width();
        var top2 = $(element2).offset().top;
        var left2 = $(element2).offset().left;
        var bottom2 = top2 + $(element2).height();
        var right2 = left2 + $(element2).width();
        console.log("FIREBALL");
        console.log("TOP : "+top1+" LEFT: "+left1+" BOTTOM: "+bottom1+" RIGHT: "+right1);
        console.log("CHARACTER");
        console.log("TOP : "+top2+" LEFT: "+left2+" BOTTOM: "+bottom2+" RIGHT: "+right2);
        setTimeout(function(){ checkposition(element1,element2); },1000);
        // return [top,left,bottom,right];
    }
    checkposition(obj,"#char");
    // if()
    setTimeout(function(){
        console.log("OBTACLES CHANGE");
        $("#obj").removeAttr("class");
        $("#obj").attr("class","snake")
        obj =".snake";
    },10000);

});