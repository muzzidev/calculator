/* // Asigno los elementos botones y el display a variables
const botones = document.querySelectorAll('.button');
const display = document.querySelector('.display')
let  nums = [];// nums es un array que contiene cada valor de cada dígito que se muestra ACTUALMENTE en el display (la expresión se guarda en nums hasta que se oprime alguna tecla operatoria, entonces se guarda en ex1 y la nueva expresión se guarda en nums, como si fuera una ex2)
let ex1 = [];// ex1 guarda la primera expresión que se va a calcular
let ex2 = [];// ex1 guarda la segunda expresión que se va a calcular
let res = 0;
let digits;
let flag = 0;// flag determina qué calculo se va a realizar
// Este método ejecuta la función iniciarApp cuando se termina de cargar el HTML
document.addEventListener('DOMContentLoaded', ()=> {
  iniciarApp();
});
// Esta función básicamente se encarga de que la calculadora funcione llamando a diferentes funciones :v
function iniciarApp(){
  
  botones.forEach(boton => {
    // En base al botón presionado se ejecuta una función diferente
    switch (boton.id) {
      case 'c':
        boton.addEventListener('click', () => {
          dlt();
        })
      break;
      case 'ac':
        boton.addEventListener('click', () => {
          dlt('all');
          ex1 = [];
          ex2 = [];
          nums = [];
          res = 0;
          flag = 0;
        })
      break;
      case 'operator':
        boton.addEventListener('click', () => {
          
          // Este if asegura que no puedas empezar con + o ÷ o x
          if (['-', 'x', '+', '÷', '.'].includes(nums[nums.length - 1]) || nums.length === 0 && ['+', 'x', '÷'].includes(boton.innerText)) return;
          
          if (boton.innerText !== '.' && boton.innerText !== undefined && flag !== 0){
            console.log('entre al if');
            
            calculus('temp');
            ex2 = [];
          }
          operate(boton);
        })
      break;
        case 'equals':
          boton.addEventListener('click', () => {
          operate(boton);
        })
      break;
      default:
        boton.addEventListener('click', () => {
          addOne(boton);
        })
      break;
        
      }
    });

    
  // Si no se introdució ningún dígito marca 0 en la pantalla
  defaultZero();
  
}
// Esta función introduce el dígito presionado al display
function addOne(boton, rmv) {
  ex2.shift()
  if (flag !== 0) ex2.push(boton.innerText);
  nums.push(boton.innerText);
  update();
}
// Esta función elimina elementos del array
function dlt(total) {
  total === 'all' ?  nums = [] : nums.pop();
  update();
}
// Esta función es la calculadora
function operate(a){
  switch (a.innerText) {
    case '+':
      if (flag === 0) {
        ex1 = [...nums]; // Esta línea le asigna el valor de nums a ex1
      }
      addOne(a, false); // Esta línea le agrega el número al display. EL FALSE LE INDICA QUE NO BORRE LOS DEMÁS NÚMEROS
      flag = 1;      
      break;
    case '-':
      
      if (nums.length === 0 & ex1.length === 0){
        addOne(a, false);
        return;
      }
      if (flag === 0) {
        ex1 = [...nums]; // Esta línea le asigna el valor de nums a ex1
      }
      addOne(a, false);
      flag = 2;
      break;
    case 'x':
      if (flag === 0) {
        ex1 = [...nums]; // Esta línea le asigna el valor de nums a ex1
      }
      addOne(a, false);
      flag = 3;
      break;
    case '÷':
      if (flag === 0) {
        ex1 = [...nums]; // Esta línea le asigna el valor de nums a ex1
      }
      addOne(a, false);
      flag = 4;
      break;
    case '.':
      if ((nums.includes('.') && ex1.length === 0) || ex2.includes('.')) break;
        
      
      addOne(a, false);
      break;
    case '=': 
    calculus('final');
    break;
  }
  
}
function calculus(type){
  switch (flag){
    case 1:
      ex1 = Array.from(String(Math.round((parseFloat(ex1.join('')) + parseFloat(ex2.join(''))) * 10000) / 10000), String);
      if (type === 'final') update(ex1);
      break;
      case 2: 
      ex1 = Array.from(String(Math.round((parseFloat(ex1.join('')) - parseFloat(ex2.join(''))) * 10000) / 10000), String);
      console.log('ex1 vale: ', ex1);
      console.log('ex2 vale: ', ex2);
      
      if (type === 'final') update(ex1);
      break;
      case 3: 
      ex1 = Array.from(String(Math.round((parseFloat(ex1.join('')) * parseFloat(ex2.join(''))) * 10000) / 10000), String);
      if (type === 'final') update(ex1);
      break;
      case 4:
        ex1 = Array.from(String(Math.round((parseFloat(ex1.join('')) / parseFloat(ex2.join(''))) * 10000) / 10000), String);
        if (type === 'final') update(ex1);
        break;
      }
    }
function update (array = nums){
  const paragraphs = document.querySelectorAll('.display p')
  for (const iterator of paragraphs) {  
    display.removeChild(iterator);
  }
  array.forEach(element => {
    
    digits = document.createElement('P');
    digits.innerText = element;
    display.appendChild(digits);    
  });
defaultZero();
}
function defaultZero (){
  
  if (nums.length === 0  && ex1.length === 0 && ex2.length === 0){
    digits = document.createElement('P');
    digits.innerText = '0'
    display.appendChild(digits);
  }

} */