song = "";
song2 = "";
song_status = "";
song2_status = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;
function preload(){
    song = loadSound("musica1.mp3");
    song2 = loadSound("musica2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("PoseNet inicializado!!!(confetes)");
}

function draw(){
    image(video ,0, 0, 600, 500);
    fill("#7FB3D5"); //"#EC7063"
    stroke("#7FB3D5"); //"#EC7063"
    if (scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if(song_status == false){
            song.play();
            document.getElementById("song").innerHTML = "Tocando Drop the Tapes";
        }
    }
    if (scoreLeftWrist > 0.2){
        
    
        circle(leftWristX, leftWristY, 20);
        song.stop();
        if(song2_status == false){
        song2.play();
        document.getElementById("song").innerHTML = "Tocando Is This Really Heappening";
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX: " + rightWristX + "rightWristY :" + rightWristY)
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX: " + leftWristX + "leftWristY :" + leftWristY)
    }
}
