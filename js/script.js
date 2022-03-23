/*
Author: João Rafael
Date: 10/03/2022
Name: SnakeGame
*/

const somDeFundo = new Audio("../music/music.mp3");
const somGameOver = new Audio("../music/gameover.mp3");
const somMover = new Audio("../music/move.mp3");
const somComer = new Audio("../music/food.mp3");

var direcao = { x: 0, y: 0 }

var cobrinha = [
    { x: 10, y: 10 }
]

var fruta = {
    x: Math.floor(Math.random() * 16) + 1,
    y: Math.floor(Math.random() * 16) + 1 
}

var pontos = 0;

var verificaEnter = true;

var ultimaVezAtualizada = 0;
var velocidade = 5;

function main(tempoAtual) {
    window.requestAnimationFrame(main);
    if ((tempoAtual - ultimaVezAtualizada) / 1000 < (1 / velocidade)) {
        return;
    }
    ultimaVezAtualizada = tempoAtual;

    atualizaGame();
}

function verificaColisao() {
    for(var i = 1; i < cobrinha.length; i++) {
        if(cobrinha[i].x == cobrinha[0].x && cobrinha[i].y == cobrinha[0].y){
            return true;
        }
    }

    if (cobrinha[0].x >= 19 || cobrinha[0].x <= 0 || cobrinha[0].y >= 19 || cobrinha[0].y <= 0) {
        return true
    }

    return false;
}

function verificaComeuFruta() {
    if(cobrinha[0].x == fruta.x && cobrinha[0].y == fruta.y){
        somComer.play();
        pontos = pontos + 10;
        score.innerHTML = pontos + " pontos";
        cobrinha.unshift({x: cobrinha[0].x + direcao.x, y: cobrinha[0].y + direcao.y})
        fruta.x = Math.floor(Math.random() * 16) + 1;
        fruta.y = Math.floor(Math.random() * 16) + 1;
        velocidade = velocidade + 0.1;
    }
}

function atualizaGame() {

    var colidiu = verificaColisao();
    if (colidiu == true) {
        somDeFundo.pause();
        somGameOver.play();
        alert("Game Over");
        cobrinha = [{x: 5, y: 5}];
        direcao.x = 0; direcao.y = 0;
        velocidade = 5;
        pontos = 0;
        score.innerHTML = pontos + " pontos"
        verificaEnter = true;
    }

    verificaComeuFruta();

    for (var i = cobrinha.length - 2; i >= 0; i--) {
        cobrinha[i + 1] = { ...cobrinha[i] };
    }

    cobrinha[0].y += direcao.y;
    cobrinha[0].x += direcao.x;

    board.innerHTML = "";
    for (var i = 0; i < cobrinha.length; i++) {
        var parteCobrinha = document.createElement('div')
        parteCobrinha.style.gridRowStart = cobrinha[i].y;
        parteCobrinha.style.gridColumnStart = cobrinha[i].x;

        if (i == 0) {
            parteCobrinha.classList.add("head");
        } else {
            parteCobrinha.classList.add("snake");
        }

        board.appendChild(parteCobrinha);
    }

    var frutinha = document.createElement("div");
    frutinha.style.gridColumnStart = fruta.x;
    frutinha.style.gridRowStart = fruta.y;
    frutinha.classList.add("fruta");
    board.appendChild(frutinha);
}

function direcionaCobrinha(e) {

    if(e.code=="Enter" && verificaEnter==true) {
        verificaEnter = false;
        direcao.x = 1;
        direcao.y = 0;
        somDeFundo.play();
    } else {
        somMover.play();
        switch (e.code) {
            case "KeyW":
                direcao.x = 0;
                direcao.y = -1;
                break;
            case "KeyA":
                direcao.x = -1;
                direcao.y = 0;
                break;
            case "KeyS":
                direcao.x = 0;
                direcao.y = 1;
                break;
            case "KeyD":
                direcao.x = 1;
                direcao.y = 0;
                break;
        }
    }
}

window.addEventListener('keydown', (e) => direcionaCobrinha(e))



main();