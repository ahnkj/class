const nameKey = 'name',
    nameForm = document.querySelector('.nameForm'),
    nameInput = nameForm.querySelector('input');
    namePrint = document.querySelector('.namePrint'),
    nameSpan = namePrint.querySelector('span');
    renameButton = namePrint.querySelector('button'),
    VISIBLE = 'block',
    INVISIBLE ='none';



function setName(name){
    if(name===null){
        nameForm.style.display= VISIBLE;
        namePrint.style.display= INVISIBLE;
    }
    else{
        nameForm.style.display= INVISIBLE;
        namePrint.style.display= VISIBLE;
        nameSpan.innerHTML=`Hello! ${name}`
    }
}

function handleNameSubmit(event){
    event.preventDefault();
    const value= nameInput.value;
    nameInput.value="";
    if(value === "")return;
    
    setName(value);
    localStorage.setItem(nameKey,JSON.stringify(value));
}

function handleRename(event){
    setName(null);
    localStorage.setItem(nameKey,JSON.stringify(null));
}

function initName(){
    const name = JSON.parse(localStorage.getItem(nameKey));
    setName(name);
    nameForm.addEventListener('submit',handleNameSubmit);
    renameButton.addEventListener('click',handleRename);
}

initName();