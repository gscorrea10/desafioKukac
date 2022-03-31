const input = require("readline-sync");

const stringInicial = input.question("Informe um Valor: ");
const valorInicial = Number(stringInicial);
const stringFinal = input.question("Informe outro Valor: ");
const valorFinal = Number(stringFinal);



for(let i = valorInicial; i <= valorFinal; i++){
const original = String(i); 
const reverse = original.split('').reverse().join('');

if (original === reverse){
    console.log(original);
    
}   
    
}