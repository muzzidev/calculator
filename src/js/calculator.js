const botones = document.querySelectorAll(".button");
const display = document.querySelector(".display");
const displayContainer = display.parentElement;
let digits = document.createElement("P");
let flag = 0; // Display vacío -> flag = 0
let err = false; // Salta un error -> err = true
let res = ""; // Resultado
document.addEventListener("DOMContentLoaded", () => iniciarApp());
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
          try {
            let replaces = {
              "x": "*",
              "÷": "/",
            };
            eval((digits.innerText + boton.innerText).replace(/[x÷]/g, matched => replaces[matched]));
          } catch {return};
          addOne(boton);
        });
        break;
      case "del":
        boton.addEventListener("click", () => err ? resetDisplay() : dlt());
        break;
      case "c":
        boton.addEventListener("click", () => resetDisplay());
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
            err = false;
            return;
          }
          operate();
          display.scrollLeft = 0;
          flag = digits.innerText.length;
        });
        break;
      default:
        boton.addEventListener("click", () => addOne(boton));
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
  res = eval(digits.innerText);
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
  console.log(flag);
  if (flag < 0) {
    flag = 0;
  }
  if (flag === 0){
    flag++;
    digits.innerText += "0";
    display.appendChild(digits);
  } else if (flag > 0 && digits.innerText[0] === "0" && !(/[.x/*+-]/.test(digits.innerText))) {
    digits.innerText = digits.innerText.slice(-1);
    flag--;
  }
}