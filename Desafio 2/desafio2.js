const input = require("readline-sync");

let valor = input.question("Informe o valor da compra: ");
console.log(valor);
let qntPaga = input.question("Informe o valor pago ao caixa: ");
console.log(qntPaga);
let totalNotas = 0;

troco = qntPaga - valor;


const notas = [100 , 10 , 1];

for (let nota of notas){
    let qntdNotas = parseInt(troco / nota);
    console.log(`São ${qntdNotas} nota(s) de R$ ${nota}`);
    totalNotas += qntdNotas;
    troco = troco % nota;
}


    console.log(`Total de notas é: ${totalNotas}`);








