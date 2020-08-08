// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>


const select = document.querySelector('select');
const key = "country";


function loadData(event){
    const data = localStorage.getItem(key);
    if(data !== null){
        for(let i=0; i<select.options.length; i++){
            if(select.options[i].value===data){
                select.options.selectedIndex=i;
                break;
            }
        }
    }
}

function saveData(event){
    event.preventDefault();
    const selected = select.options[select.selectedIndex].value;
    //console.log(selected);
    localStorage.setItem(key,selected);
}

function init(){
    loadData();
    select.addEventListener("input",saveData);
}

init();