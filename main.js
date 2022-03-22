status="";
objects=[];
song=""

function preload(){
song=loadSound("ringing_old_phone.mp3");
}

function setup(){
canvas=createCanvas(500,500)
canvas.center()
video.Capture(VIDEO)
video.hide()
video.size(500,500)
objectDetector = ml5.objectDetector("cocossd", modelLoaded)
document.getElementById("objects").innerHTML = "Baby is not found";
document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model is loaded")
    status=true;
}

function gotResult(error,results){
    if(error){
        console.error(error)
    }
    console.log(results)
    objects=results;
}

function draw(){
    image(video,0,0,500,500)
    if(status!=""){
        r=random(255)
        g=random(255)
        b=random(255)
        objectDetector.detect(video,gotResult)
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill(r,g,b)
            noFill()
            stroke(r,g,b)
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
            percent=floor(objects[i].confidence*100)
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15)
            if(objects[i].label=="person"){
                document.getElementById("objects").innerHTML = "Baby is found"
                song.stop()
            }
            else{
                document.getElementById("objects").innerHTML = "Baby is not found"
                song.play()
            }
        }
        if(objects.length==0){
            document.getElementById("objects").innerHTML = "Baby is not found"
            song.play()
        }
    }
}

