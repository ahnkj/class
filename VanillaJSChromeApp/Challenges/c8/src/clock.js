const DAY_MILLISECONDS = 86400000;
const NINE_HOURS_MILLISECONDS = 32400000;
const HOUR_MILLISECONDS =3600000;
const MINUTE_MILLISECONDS =60000;
const SECOND_MILLISECONDS =1000;


const clock = document.querySelector('#clock');

function addZero(num){
    num=Math.floor(num);
    const ret = num<10 ? `0${num}` : `${num}`;
    return ret;
}

function getTime() {
  // Don't delete this.
  const present = new Date(),
    year = present.getFullYear(),
    month = present.getMonth(),
    day = present.getDate(),
    hour = addZero(present.getHours()),
    minute = addZero(present.getMinutes()),
    second=addZero(present.getSeconds());
  

  clock.innerText=`${hour}:${minute}:${second}`;
  
}

function clockInit() {
    console.log('init');
    getTime();
    setInterval(getTime,100);
}
clockInit();