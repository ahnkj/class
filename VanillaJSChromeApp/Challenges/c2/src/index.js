// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>


const body = document.querySelector('body');
const screenWidth = window.screen.width;


function resize(event){
    const width = window.innerWidth;
    console.log(screenWidth/3, width);
    if(screenWidth*2/3 > width && screenWidth/3 < width)  {body.className="s2";}
    else if(screenWidth/3 > width){body.className="s1";}
    else {body.className="s0";}
}

function init(){
    console.log("init");
    body.className="s0";
    window.addEventListener("resize",resize);
}

init();


