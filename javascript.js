const display = document.getElementById('display')
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

//calcular operação
const calcular = () => {
    if(operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`)
        atualizarDisplay(resultado)
    }
}

//incrementar no display
const atualizarDisplay = (texto) => {
    if(novoNumero) {
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false
    }else {
        display.textContent += texto.toLocaleString('BR');
    }
}
//inserir dados no display
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent)

//pegar todas as teclas do display
numeros.forEach(numero => numero.addEventListener('click', inserirNumero))


//selecionar operação e novo numero
const selecionarOperador = (evento) => {
    if(!novoNumero){
        calcular()
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'))
    }
}

//pegar os operadores
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador))


//calcular clicando no simbolo '='
const ativarIgual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', ativarIgual)

//limpar display
const limparDisplay = () => display.textContent = '';


//limpar display com o botao reset
const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined
}
document.getElementById('operadorReset').addEventListener('click', limparCalculo)

//del -> deletar o ultimo numero
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('deletar').addEventListener('click', removerUltimoNumero)

//inseri decimal
const existeDecimal = () => display.textContent.indexOf(',') !== - 1;
const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () => {
    if(!existeDecimal()) {
        if(existeValor()) {
            atualizarDisplay(',')
        }else {
            atualizarDisplay('0,')
        }    
    }        
}
document.getElementById('decimal').addEventListener('click', inserirDecimal)
//troca de tema
let radio1 = document.querySelector("#radio1");
let radio2 = document.querySelector("#radio2");
let radio3 = document.querySelector("#radio3");
let body = document.body

radio1.addEventListener("change", function (){
    if(radio1.checked){
        body.classList.remove("theme2", "theme3");
        body.classList.add("theme1")
    }
});

radio2.addEventListener("change", function (){
    if(radio2.checked) {
        body.classList.remove("theme1", "theme3");
        body.classList.add("theme2")
    }
});

radio3.addEventListener("change", function (){
    if(radio3.checked) {
        body.classList.remove("theme2", "theme1");
        body.classList.add("theme3")
    }
})
