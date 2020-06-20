$(document).ready(function(){
    var score = 0;
    var run = true;
    // alert("GAME START");
    var obj =".fireball";
    $(".gameover").hide();
    $("#char").click(function(){
        console.log("JUMPING");
        $(this).attr("class","jump");
        setTimeout(function(){
            $("#char").removeAttr("class");
            console.log("JUMP ENDED");
        },3000);
    });
    function checkposition(element1,element2){
        // var top1 = $(element1).offset().top;
        // var left1 = $(element1).offset().left;
        // var bottom1 = top1 + $(element1).height();
        // var right1 = left1 + $(element1).width();
        // var top2 = $(element2).offset().top;
        // var left2 = $(element2).offset().left;
        // var bottom2 = top2 + $(element2).height();
        // var right2 = left2 + $(element2).width();
        // console.log("FIREBALL");
        // console.log("TOP : "+top1+" LEFT: "+left1+" BOTTOM: "+bottom1+" RIGHT: "+right1);
        // console.log("CHARACTER");
        // console.log("TOP : "+top2+" LEFT: "+left2+" BOTTOM: "+bottom2+" RIGHT: "+right2);		
        var r1 = $(element1);
        var r2 = $(element2);
        var r1x = r1.offset().left;
        var r1w = r1.width();
        var r1y = r1.offset().top;
        var r1h = r1.height();
        
        var r2x = r2.offset().left;
        var r2w = r2.width();
        var r2y = r2.offset().top;
        var r2h = r2.height();
        
        if( r1y+r1h < r2y ||
            r1y > r2y+r2h ||
            r1x > r2x+r2w ||
            r1x+r1w < r2x ){
            // return false;
            // console.log("FALSE");
            setTimeout(function(){ checkposition(element1,element2); },1000);
        }else{
            // return true;   
            $(element2).css("animation", "none");
            $(element1).css("animation", "none");
            $("#animatedBackground").css("animation", "none");
            // alert("NUBRUK");
            run = false;
            // alert(localStorage.currentHighscore);
            // alert(score);
            if(localStorage.currentHighscore < score){
                alert("New Highscore");
                localStorage.currentHighscore = score;
                var db = firebase.firestore();
                db.collection("leaderboard").doc(localStorage.userid).set({
                    name: localStorage.playername,
                    highscore: parseInt(localStorage.currentHighscore)
                })
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
                $(".myscore").text(score);
                $(".highscore").text(localStorage.currentHighscore);

            }
            $(".plays").fadeOut("200",function(){
                $(".gameover").fadeIn("200");
              });
            console.log("NUBRUK");
        }
    }
    checkposition(obj,"#char");
    // if()
    // setTimeout(function(){
    //     console.log("OBTACLES CHANGE");
    //     $("#obj").removeAttr("class");
    //     $("#obj").attr("class","snake")
    //     obj =".snake";
    // },10000);
    scoreup();
    function scoreup(){
        if(run == true){
            score++;
            $(".myscore").text(score);
            $(".highscore").text(localStorage.currentHighscore);
            $("#myscore").text(score);
            setTimeout(function(){
                scoreup();
            },500);
        }
    }

});