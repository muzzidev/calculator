// Asigno los elementos botones y el display a variables
const botones = document.querySelectorAll(".button");
const display = document.querySelector(".display");
const displayContainer = display.parentElement;
let digits = document.createElement("P");
let flag = 0;
let res = 0;
let err = 0;
let operadoresRepetidos = [];
let dots = 0;

document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});
function iniciarApp() {
  botones.forEach((boton) => {
    switch (boton.id) {
      case "operator":
        boton.addEventListener("click", () => {
          addOne(boton);
          operadoresRepetidos = (digits.innerText.match(/[x÷+-]/g)).length;

          if (err === 1) {
            digits.innerText = "";
            err = 0;
            flag = 0;
            addOne(boton);
          }
        })
        
        break;
      case "dot":
        boton.addEventListener("click", () => {
          console.log(operadoresRepetidos);
          if (dots > operadoresRepetidos) {
            return;
          }
          if (err === 1) {
            digits.innerText = "";
            err = 0;
            flag = 0;
            addOne(boton);
          }else{
            addOne(boton);
            dots++;
          }
        });
        break;
      case "c":
        boton.addEventListener("click", () => {
          dlt();
        });
        break;
      case "ac":
        boton.addEventListener("click", () => {
          dlt(true);
        });
        break;
      case "equals":
        boton.addEventListener("click", () => {
          // Si el último caracter es un operador, no se hace nada.
          if (
            ["x", "÷", "-", "+", "="].includes(
              digits.innerText[digits.innerText.length - 1]
            ) ||
            ["x", "÷", "-", "+", "="].includes(digits.innerText[0])
          ) {
            digits.innerText = "Syntax Error";
            err = 1;
            display.appendChild(digits);
            return;
          }
          if (err === 1) {
            digits.innerText = "";
            err = 0;
            flag = 0;
            defaultZero();
          }else{
            operate();
            display.scrollLeft = 0;
          }
        });
        break;
      default:
        boton.addEventListener("click", () => {
          //este if hace que no se puedan poner dos operadores seguidos o un punto seguido de otro punto.
          if (
            (["x", "÷", "+"].includes(boton.innerText) &&
              digits.innerText.length === 0) ||
            (["x", "÷", "+", "-", "."].includes(boton.innerText) &&
              ["x", "÷", "-", "+", "."].includes(
                digits.innerText[digits.innerText.length - 1]
              ))
          ) {
            return;
          }
          if (err === 1) {
            digits.innerText = "";
            err = 0;
            flag = 0;
          }
          addOne(boton);
        });
        break;
    }
  });
  defaultZero();
}
function operate() {
  let replaces = {
    x: "*",
    "÷": "/",
  };
  digits.innerText = digits.innerText.replace(/[x÷]/g, function (matched) {
    return replaces[matched];
  });
  let res = eval(digits.innerText);
  
  if (res === Infinity) {
    res = "Cannot divide by zero";
    err = 1;
    digits.innerText = res;
  } else if (isNaN(res)) {
    res = "Syntax Error";    
    err = 1;
    digits.innerText = res;
  } else{
    digits.innerText = Math.round(res * 10000) / 10000;
  }

  display.appendChild(digits);
}
function addOne(boton) {
  flag++;
  digits.innerText += boton.innerText;
  display.appendChild(digits);
  defaultZero();
  // Ajustar el scroll cuando se añade un nuevo carácter al display
  display.scrollLeft = display.scrollWidth - display.clientWidth;
}
function dlt(type = false) {
  if (!type) {
    digits.innerText = digits.innerText.slice(0, -1);
    flag--;
  } else {
    digits.innerText = [];
    flag = 0;
  }
  defaultZero();
}
function defaultZero() {
  if (flag === 0) {
    flag++;
    digits.innerText += "0";
    display.appendChild(digits);
  } else if (flag > 0 && digits.innerText[0].includes("0")) {
    digits.innerText = digits.innerText.slice(1);
    flag--;
  }
}
