const botones = document.querySelectorAll(".button");
const display = document.querySelector(".display");
const displayContainer = display.parentElement;
let digits = document.createElement("P");
let flag = 0; // Display vacío -> flag = 0
let err = false; // Salta un error -> err = true
let operadoresRepetidos = 0; // Operadores en total
let points = 0; // Puntos en total
document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});
function iniciarApp() {
  botones.forEach((boton) => {
    switch (boton.id) {
      case "operator":
        boton.addEventListener("click", () => {
          addOne(boton);
          operadoresRepetidos++;
        });
        break;
      case "dot":
        boton.addEventListener("click", () => {
          if (points > operadoresRepetidos) {
            return;
          } else {
            addOne(boton);
            points++;
          }
        });
        break;
      case "c":
        boton.addEventListener("click", () => {
          if (err || typeof res !== String) {
            resetDisplay();
          } else {
            dlt();
          }
        });
        break;
      case "ac":
        boton.addEventListener("click", () => {
          resetDisplay();
        });
        break;
      case "equals":
        boton.addEventListener("click", () => {
          // Si el último o primer caracter es un operador, no se hace nada.
          if (["x", "÷", "-", "+", "."].includes(digits.innerText[digits.innerText.length - 1]) ||["x", "÷", "+"].includes(digits.innerText[0])) {
            digits.innerText = "Syntax Error";
            err = true;
            display.appendChild(digits);
            return;
          }
          if (err) {
            resetDisplay();
            return;
          }
          operate();
          display.scrollLeft = 0;
        });
        break;
      default:
        boton.addEventListener("click", () => {
          addOne(boton);
        });
        break;
    }
  });
  defaults();
}
// RESETEA TODO
function resetDisplay() {
  digits.innerText = "";
  operadoresRepetidos = [];
  err = false;
  points = 0;
  flag = 0;
  defaults();
}
// Convierte la expresión completa del display en código y realiza el cálculo
function operate() {
  let replaces = {
    x: "*",
    "÷": "/",
  };
  digits.innerText = digits.innerText.replace(/[x÷]/g, matched => replaces[matched]);
  let res = eval(digits.innerText);
  if (res === Infinity) {
    res = "Math Error";
    err = true;
    digits.innerText = res;
  } else if (isNaN(res)) {
    res = "Syntax Error";
    err = true;
    digits.innerText = res;
  } else {
    digits.innerText = Math.round(res * 10000) / 10000;
  }
  display.appendChild(digits);
}
function addOne(boton) {
  err ? resetDisplay() : null;
  // Este if hace que no se puedan poner dos operadores seguidos o un punto seguido de otro punto.
  if ((["x", "÷", "+"].includes(boton.innerText) && digits.innerText.length === 0) ||(["x", "÷", "+", "-", "."].includes(boton.innerText) && ["x", "÷", "-", "+", "."].includes(digits.innerText[digits.innerText.length - 1]))) {
    defaults();
    return;
  }
  flag++;
  digits.innerText += boton.innerText;
  display.appendChild(digits);
  defaults();
  display.scrollLeft = display.scrollWidth - display.clientWidth; // Ajustar el scroll cuando se añade un nuevo carácter al display
}
function dlt() {
  flag--;
  digits.innerText = digits.innerText.slice(0, -1);
  defaults();
}
function defaults() {
  if (flag === 0) {
    flag++;
    digits.innerText += "0";
    display.appendChild(digits);
  } else if (flag > 0 && digits.innerText[0].includes("0")) {
    digits.innerText = digits.innerText.slice(1);
    flag--;
  }
  operadoresRepetidos = digits.innerText.match(/[x÷+-]/g) !== null ? digits.innerText.match(/[x÷+-]/g).length : 0; // Se le asigna la cantidad de operadores que hay en la expresión completa a operadoresRepetidos
  points = digits.innerText.match(/\./g) !== null ? digits.innerText.match(/\./g).length : 0; // Se le asigna la cantidad de puntos que hay en la expresión completa a points
}