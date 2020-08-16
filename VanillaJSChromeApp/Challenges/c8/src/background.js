const BACKGOURND_NUMBER = 5,
wrapper= document.querySelector('.wrapper');



function getRandomNumber(){
    const randomNumber=Math.floor(Math.random()*BACKGOURND_NUMBER)+1;
    return randomNumber;
}

function printImage(number){
    //const image = new Image();
    //image.src =`image/${number}.jpg`;
    wrapper.style.backgroundImage=`url(image/${number}.jpg)`
    wrapper.style.backgroundSize='100% 100%';
}


function backgroundInit(){
    randomNumber=getRandomNumber();
    printImage(randomNumber);
}

backgroundInit();