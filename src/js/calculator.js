// Asigno los elementos botones y el display a variables
const botones = document.querySelectorAll('.button');
const display = document.querySelector('.display');
let digits = document.createElement('P');
let flag = 0;

document.addEventListener('DOMContentLoaded', ()=> {
  iniciarApp();
});
function iniciarApp(){
  
  botones.forEach(boton => {
    switch (boton.id) {
      case 'c':
        boton.addEventListener('click', () => {
          dlt();
        })
      break;
      case 'ac':
        boton.addEventListener('click', () => {
          dlt(true);
        })
      break;
        case 'equals':
          boton.addEventListener('click', () => {
            if (['x', '÷', '-', '+'].includes(digits.innerText[digits.innerText.length - 1])){
              return;
            }
          operate();
        })
        break;
        default:
          boton.addEventListener('click', () => {
            if ((['x', '÷', '+'].includes(boton.innerText) && digits.innerText.length === 0) || (['x', '÷', '+', '-', '.'].includes(boton.innerText) && ['x', '÷', '-', '+', '.'].includes(digits.innerText[digits.innerText.length - 1]))){
              return;
            }
            
            addOne(boton);
          })
          break;
        }
      });
      defaultZero();

    }
  function operate(){
    let replaces = {
      'x': '*',
      '÷': '/',
    };
    digits.innerText = digits.innerText.replace(/[x÷]/g, function(matched) {
      return replaces[matched];
    });
    let res = eval(digits.innerText)
    
    if (res === Infinity) res = "Error" ;
    digits.innerText = res
    display.appendChild(digits);

  }
  function addOne(boton){
    flag++;
    digits.innerText += boton.innerText;
    display.appendChild(digits);
    console.log(flag);
    defaultZero();
    
  }
  function dlt(type = false){
    if (!type){
      digits.innerText = digits.innerText.slice(0, -1);
      flag--;
    }else{
      digits.innerText = [];
      flag = 0;
    }
    console.log(flag);
    defaultZero();
  }
  function defaultZero(){
    if(flag === 0){
    flag++;
    digits.innerText += '0';
    display.appendChild(digits);
    
  }else if (flag > 0 && digits.innerText[0].includes('0')){
    digits.innerText = digits.innerText.slice(1);
    flag--;
  }
  
}