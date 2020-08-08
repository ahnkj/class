//import "./styles.css";

// You're gonna need this
const DAY_MILLISECONDS = 86400000;
const NINE_HOURS_MILLISECONDS = 32400000;
const HOUR_MILLISECONDS =3600000;
const MINUTE_MILLISECONDS =60000;
const SECOND_MILLISECONDS =1000;


const time = document.querySelector('h2');

function addZero(num){
    num=Math.floor(num);
    const ret = num<10 ? `0${num}` : `${num}`;
    return ret;
}

function getTime() {
  // Don't delete this.
  const present = new Date();
  const present_year = present.getFullYear();
  const present_Month = present.getMonth();
  const present_day = present.getDay();
  
  const target_year = (present_Month>10 && present_day>22)? present_year +1 : present_year;

  const xmasDay = new Date(`${target_year}-12-24:00:00:00+0900`);
  const gap = xmasDay-(new Date());

  const day = addZero(gap/DAY_MILLISECONDS);
  const hour = addZero((gap%DAY_MILLISECONDS)/HOUR_MILLISECONDS);
  const minute = addZero((gap%HOUR_MILLISECONDS)/MINUTE_MILLISECONDS);
  const second = addZero((gap%MINUTE_MILLISECONDS)/SECOND_MILLISECONDS);

  time.innerText=`${day}d ${hour}h ${minute}m ${second}s`;
  
}

function init() {
    console.log('init');
    getTime();
    setInterval(getTime,100);
}
init();
