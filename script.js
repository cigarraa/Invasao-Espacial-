const botaoIniciar = document.getElementById("StartGame");
const cenario = document.getElementById("cenario");
const vida = document.getElementById("vida");
const pontos = document.getElementById("pontos");
const nave = document.getElementById("nave");

const audioJogo = new Audio("missaoespaco.mp3");

const larguraCenario = cenario.offsetWidth;
const alturaCenario = cenario.offsetHeight;

const larguraNave = nave.offsetWidth;
const alturaNave = nave.offsetHeight;

const velocidadeNave  = 15;
const velocidadeTiro = 20;
const velocidadeNaveInimigas = 6;

let estaAtirando = false;
let tiroAtual;
let vidaAtual;
let pontosAtual;
let checaMoveNaveInimigas;
let checaNaveInimigas;
let checaMoveNave;
let checaColisao
let checaTiros;
let posicaoHorizontal = larguraCenario / 2 - 50;
let posicaoVertical = alturaCenario - alturaNave;
let direcaoHorizontal = 0;
let direcaoVertical = 0;

const teclaPressionada = (tecla) =>{
    if (tecla.key === "ArrowRight"){
        direcaoHorizontal = 1;
    }else if (tecla.key === "ArrowLeft"){
        direcaoHorizontal = -1;
    }else if (tecla.key === "ArrowDown"){
        direcaoVertical = 1;
    }else if (tecla.key === "ArrowUp"){
        direcaoVertical = -1;
    }
}

const teclaSolta = (tecla) =>{
    if(tecla.key === "ArrowRight" || tecla.key ==="ArrowLeft"){
      direcaoHorizontal = 0;  
    }else if (tecla.key === "ArrowDown" || tecla.key === "ArrowUp"){
        direcaoVertical = 0;
    }
}

const moveNave = () => {
    posicaoHorizontal += direcaoHorizontal * velocidadeNave;
    posicaoVertical += direcaoVertical * velocidadeNave;
    if(posicaoHorizontal <0){
        posicaoHorizontal= - 0;
    }else if (posicaoHorizontal + larguraNave > larguraCenario){
        posicaoHorizontal= larguraCenario - larguraNave
    }
    if (posicaoVertical < 0){
        posicaoVertical = 0;
    }else if ( posicaoVertical + alturaNave>alturaCenario){
        posicaoVertical = alturaCenario - alturaNave;
    }
    nave.style.left = posicaoHorizontal + "px";
    nave.style.top = posicaoVertical = "px";
    
}

const atirar = () => {
    const delayTiro = Date.now();
    const atrasoTiro = delayTiro - tiroAtual;
    if (estaAtirando && atrasoTiro >= 100 ) {
        tiroAtual = Date.now();
        criaTiros (posicaoHorizontal +45, posicaoVertical -10);
    }

}

document.addEventListener("keydown", (tecla) => {
    if (tecla.key === " "){
        estaAtirando = true;
    }

} );

document.addEventListener("keyup", (tecla) => {
    if (tecla.key === " "){
        estaAtirando = false;
    }

} );

const criaTiros = (posicaoLeftTiro, posicaoTopTiro) => {
    const tiro = document.createElement("div");
    tiro.className = "tiro";
    tiro.style.position = "absolute";
    tiro.style.width = "10px";
    tiro.style.height = "10px";
    tiro.style.backgroundColor = "yellow";
    tiro.style.left = posicaoLeftTiro + "px";
    tiro.style.top = posicaoTopTiro + "px";
    cenario.appendChild(tiro);
}

const audioTiros = () => {
    const audioDoTiro = document.createElement("audio");
    audioDoTiro.className = "audiotiro";
    audioDoTiro.setAttribute("src", "/src/audio/tiro.mp3");
    audioDoTiro.play();
    cenario.appendChild(audioDoTiro);
    audioDoTiro.addEventListener("ended", () =>{
        audioDoTiro.remove();
    })
}

const moveTiros = () => {
    const tiros = document.querySelectorAll(".tiro");
    for(let i = 0; i < tiros.length; i++){
        if(tiros[i]){
            let posicaoTopTiro = tiros[i].offsetTop;
            posicaoTopTipo -= velocidadeTiro;
            tiros[i].style.top = posicaoTopTiro + "px";
            if(posicaoTopTiro < -10) {
                tiros[i].remove();
            }
        }
    }
}
const naveInimigas = () => {
    const inimigo = document.createElement("div");
    inimigo.classNave = "inimigo";
    inimigo.style.position = "absolute";
    inimigo.setAttribute("data-vida", 5);
    inimigo.style.width = "100px";
    inimigo.style.height = "100px";
    inimigo.style.backgroundImage = "url(enemy.gif)";
    inimigo.style.backgroundPosition = "center";
    inimigo.style.backgroundRepeat = "no-repeat";
    inimigo.style.backgroundSize = "contain";
    inimigo.style.left = Math.floor(Math.random() * (larguraCenario - larguraNave)) + "px";
    inimigo.style.top = "-100";
    inimigo.appendChild(inimigo);
}

    const moveNaveInimigas = () => {
        const naveInimigas = document.querySelectorAll(".inimigo");
        for (let i = 0; i < naveInimigas.length; i++){
            if(naveInimigas[i]) {
                let posicaoTopNavaInimiga = naveInimigas[i].offsetTop;
                let posicaoleftNavaInimiga = naveInimigas[i].offsetLeft
                posicaoTopNavaInimiga += velocidadeNaveInimigas;
                naveInimigas[i].style.top = posicaoTopNavaInimiga + "px";
                if(posicaoTopNavaInimiga > alturaCenario) {
                    vidaAtual -= 5;
                    vida.textContent = `Vida: ${vidaAtual}`;
                    explosaoNaveInimigaDestruida(posicaoleftNavaInimiga);
                    if (vidaAtual <= 0){
                        gameOver();
                    }
                    
                    naveInimigas[i].remove();
                }
            }   
        }
    }

const NaveInimigaDestruida = (posicaoleftNavaInimiga, posicaoTopNavaInimiga) => {
    const NaveInimigaDestruida = document.createElement("div")
        NaveInimigaDestruida.className = "naveinimigadestruida";
        NaveInimigaDestruida.style.position = "absolute";
        NaveInimigaDestruida.style.width = "100px";
        NaveInimigaDestruida.style.height = "100px";
        NaveInimigaDestruida.style.backgroundImage = "url(eliminado.gif)";
        NaveInimigaDestruida.style.backgroundPosition = "center";
        NaveInimigaDestruida.style.backgroundRepeat = "no-repeat";
        NaveInimigaDestruida.style.backgroundSize = "contain";
        NaveInimigaDestruida.style.left = posicaoleftNavaInimiga  + "px";
        NaveInimigaDestruida.style.top = posicaoTopNavaInimiga + "px";  
        cenario.appendChild(NaveInimigaDestruida);
        audioExplosoes();
        setTimeout(() => {cenario.removerChild(naveInimigaDastruida);}, 1000);  
}


const explosaoNaveInimigaDestruida = (posicaoleftNavaInimiga) => {
    const explosaoNaveInimigaDestruida = document.createElement("div")
        explosaoNaveInimigaDestruida.className = "esplosaonaveinimiga";
        explosaoNaveInimigaDestruida.style.position = "absolute";
        explosaoNaveInimigaDestruida.style.width = "100px";
        explosaoNaveInimigaDestruida.style.height = "100px";
        explosaoNaveInimigaDestruida.style.backgroundImage = "url(explosao.gif)";
        explosaoNaveInimigaDestruida.style.backgroundPosition = "center";
        explosaoNaveInimigaDestruida.style.backgroundRepeat = "no-repeat";
        explosaoNaveInimigaDestruida.style.backgroundSize = "contain";
        explosaoNaveInimigaDestruida.style.left = posicaoleftNavaInimiga  + "px";
        explosaoNaveInimigaDestruida.style.top = (alturaCenario -100) + "px";  
        cenario.appendChild(explosaoNaveInimiga);
        audioExplosoes();
        setTimeout(() => {cenario.removerChild(explosaoNaveInimiga);}, 1000);  
}

const audioExplosoes = () => {
    const audioExplosoeNaveInimiga = document.createElement("audio");
    audioExplosaoNaveInimiga.className = "audioexplosoes";
    audioExplosoeNaveInimiga.serAttribute("src", "destruido.mp3");
    audioExplosoeNaveInimiga.play();
    cenario.appendChild(audioExplosaoNaveInimiga);
    audioExplosoeNaveInimiga.addEventListener("ended", () => {
        audioExplosaoNaveInimiga.remove()   
     })
}

const colisao = () => {
    const todasNavesInimigas = document.querySelectorAll(".inimigo");
    const todosTiros = Document.querySelectorAll(".tiro");
    todasNavesInimigas.forEach((naveInimiga) => {
        todosTiros.forEach((tiro) => {
            const colisaoNaveInimiga = naveInimiga.getBoundingClientRect();
            const colisaoTiro = tiro.getBoundingClientRect();
            const posicaoNaveInimigaLeft = naveInimiga.offsetLeft;
            const posicaoNaveInimigaTop = naveInimiga.offsetTop;
            let vidaAtualNave
        })
        
    }
}


9]