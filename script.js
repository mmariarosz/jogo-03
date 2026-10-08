// ==========================================
// NEON MATH - ARCADE 86
// Jogo educativo de Matemática - 6º ano
// ==========================================


// ===============================
// ELEMENTOS
// ===============================

const inicio = document.getElementById("inicio");
const jogo = document.getElementById("jogo");
const final = document.getElementById("final");

const fase = document.getElementById("fase");

const scoreElement = document.getElementById("score");
const coinsElement = document.getElementById("coins");
const livesElement = document.getElementById("lives");

const faseNome = document.getElementById("faseNome");
const progress = document.getElementById("progress");

const finalScore = document.getElementById("finalScore");
const finalCoins = document.getElementById("finalCoins");
const finalAcertos = document.getElementById("finalAcertos");
const rank = document.getElementById("rank");

const btnStart = document.getElementById("btnStart");
const btnRestart = document.getElementById("btnRestart");


// ===============================
// VARIÁVEIS DO JOGO
// ===============================

let score = 0;
let coins = 0;
let lives = 3;
let acertos = 0;

let faseAtual = 0;

let respondida = false;

let timer;
let tempo = 30;

let bossVida = 100;

let cartasAbertas = [];
let paresEncontrados = 0;


// ===============================
// INÍCIO
// ===============================

btnStart.addEventListener("click", iniciarJogo);

btnRestart.addEventListener("click", iniciarJogo);


function iniciarJogo() {

    score = 0;
    coins = 0;
    lives = 3;
    acertos = 0;

    faseAtual = 0;

    atualizarHUD();

    inicio.classList.remove("ativa");
    final.classList.remove("ativa");

    jogo.classList.add("ativa");

    carregarFase();
}


// ===============================
// ATUALIZAR HUD
// ===============================

function atualizarHUD() {

    scoreElement.textContent = String(score).padStart(4, "0");

    coinsElement.textContent = String(coins).padStart(3, "0");

    livesElement.textContent =
        "❤️".repeat(lives) +
        "🖤".repeat(3 - lives);
}


// ===============================
// CARREGAR FASE
// ===============================

function carregarFase() {

    respondida = false;

    clearInterval(timer);

    fase.innerHTML = "";

    progress.style.width = ((faseAtual + 1) / 6 * 100) + "%";


    if (faseAtual === 0) {
        faseQuickMath();
    }

    else if (faseAtual === 1) {
        faseMultiplaEscolha();
    }

    else if (faseAtual === 2) {
        faseNeonRun();
    }

    else if (faseAtual === 3) {
        faseMemoria();
    }

    else if (faseAtual === 4) {
        faseLoja();
    }

    else if (faseAtual === 5) {
        faseBoss();
    }
}


// ===============================
// FASE 1
// QUICK MATH
// ===============================

function faseQuickMath() {

    faseNome.textContent = "FASE 1 - QUICK MATH ⚡";

    fase.innerHTML = `
        <h2>⚡ QUICK MATH ⚡</h2>

        <p class="pergunta">
            Resolva o cálculo antes que o tempo acabe!
        </p>

        <div class="numero-grande">
            24 + 18
        </div>

        <input 
            type="number"
            id="resposta"
            class="input-neon"
            placeholder="Digite aqui..."
        >

        <div id="timer" class="feedback">
            ⏱️ 10 segundos
        </div>

        <button class="proximo" id="verificar">
            CONFIRMAR
        </button>

        <div id="feedback" class="feedback"></div>
    `;

    const input = document.getElementById("resposta");

    input.focus();

    iniciarTimer();

    document.getElementById("verificar").addEventListener("click", () => {

        if (respondida) return;

        verificarQuickMath(input.value);
    });

    input.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            verificarQuickMath(input.value);
        }

    });
}


function iniciarTimer() {

    tempo = 10;

    timer = setInterval(() => {

        tempo--;

        const timerElement = document.getElementById("timer");

        if (timerElement) {
            timerElement.textContent = `⏱️ ${tempo} segundos`;
        }

        if (tempo <= 0) {

            clearInterval(timer);

            if (!respondida) {

                respondida = true;

                perderVida();

                mostrarFeedback(
                    "⏰ TEMPO ESGOTADO! A resposta era 42.",
                    false
                );

                mostrarBotaoProximo();
            }
        }

    }, 1000);
}


function verificarQuickMath(resposta) {

    clearInterval(timer);

    respondida = true;

    if (Number(resposta) === 42) {

        ganharPontos(100);

        mostrarFeedback(
            "⚡ PERFECT! +100 XP +50 COINS",
            true
        );

    } else {

        perderVida();

        mostrarFeedback(
            "💥 QUASE! A resposta correta era 42.",
            false
        );
    }

    mostrarBotaoProximo();
}


// ===============================
// FASE 2
// MULTIPLA ESCOLHA
// ===============================

function faseMultiplaEscolha() {

    faseNome.textContent = "FASE 2 - NUMBER ATTACK 👾";

    fase.innerHTML = `
        <h2>👾 NUMBER ATTACK 👾</h2>

        <p class="pergunta">
            Qual é o resultado de:
        </p>

        <div class="numero-grande">
            7 × 8
        </div>

        <div class="opcoes">

            <button class="opcao" data-resposta="54">
                A) 54
            </button>

            <button class="opcao" data-resposta="56">
                B) 56
            </button>

            <button class="opcao" data-resposta="64">
                C) 64
            </button>

            <button class="opcao" data-resposta="48">
                D) 48
            </button>

        </div>

        <div id="feedback" class="feedback"></div>
    `;


    const botoes = document.querySelectorAll(".opcao");

    botoes.forEach(botao => {

        botao.addEventListener("click", () => {

            if (respondida) return;

            respondida = true;

            const resposta = Number(botao.dataset.resposta);

            if (resposta === 56) {

                botao.classList.add("correta");

                ganharPontos(150);

                mostrarFeedback(
                    "🎉 ACERTOU! +150 XP",
                    true
                );

            } else {

                botao.classList.add("errada");

                perderVida();

                mostrarFeedback(
                    "💥 ERROU! A resposta era 56.",
                    false
                );
            }

            mostrarBotaoProximo();
        });
    });
}


// ===============================
// FASE 3
// NEON RUN
// ===============================

function faseNeonRun() {

    faseNome.textContent = "FASE 3 - NEON RUN 🚀";

    fase.innerHTML = `
        <h2>🚀 NEON RUN 🚀</h2>

        <p class="pergunta">
            O carro precisa encontrar o caminho certo!
        </p>

        <p class="pergunta">
            Quanto é o perímetro de um quadrado
            com lados de 5 cm?
        </p>

        <div class="opcoes">

            <button class="opcao" data-resposta="10">
                🛣️ 10 cm
            </button>

            <button class="opcao" data-resposta="15">
                🛣️ 15 cm
            </button>

            <button class="opcao" data-resposta="20">
                🛣️ 20 cm
            </button>

            <button class="opcao" data-resposta="25">
                🛣️ 25 cm
            </button>

        </div>

        <div id="feedback" class="feedback"></div>
    `;


    document.querySelectorAll(".opcao").forEach(botao => {

        botao.addEventListener("click", () => {

            if (respondida) return;

            respondida = true;

            if (Number(botao.dataset.resposta) === 20) {

                botao.classList.add("correta");

                ganharPontos(200);

                mostrarFeedback(
                    "🚀 CAMINHO CERTO! +200 XP",
                    true
                );

            } else {

                botao.classList.add("errada");

                perderVida();

                mostrarFeedback(
                    "💥 CAMINHO ERRADO! 5 × 4 = 20.",
                    false
                );
            }

            mostrarBotaoProximo();
        });
    });
}


// ===============================
// MEMORY GLITCH
// ===============================

const paresMemoria = [
    { pergunta: "6 + 6", resposta: "12" },
    { pergunta: "12", resposta: "6 + 6" },

    { pergunta: "12 × 2", resposta: "24" },
    { pergunta: "24", resposta: "12 × 2" },

    { pergunta: "6 × 1", resposta: "6" },
    { pergunta: "6", resposta: "6 × 1" },

    { pergunta: "6 × 6", resposta: "36" },
    { pergunta: "36", resposta: "6 × 6" }
];

let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let paresEncontrados = 0;

function iniciarMemoria() {
    const tabuleiro = document.getElementById("memory-board");

    if (!tabuleiro) return;

    tabuleiro.innerHTML = "";
    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;
    paresEncontrados = 0;

    // Embaralha as cartas
    const cartas = [...paresMemoria].sort(() => Math.random() - 0.5);

    cartas.forEach((carta, index) => {
        const elemento = document.createElement("button");

        elemento.classList.add("memory-card");
        elemento.dataset.valor = carta.resposta;
        elemento.dataset.id = index;

        elemento.innerHTML = `
            <span class="card-front">?</span>
            <span class="card-back">${carta.pergunta}</span>
        `;

        elemento.addEventListener("click", () => virarCarta(elemento));

        tabuleiro.appendChild(elemento);
    });
}

function virarCarta(carta) {
    if (
        bloqueado ||
        carta.classList.contains("virada") ||
        carta.classList.contains("encontrada")
    ) {
        return;
    }

    carta.classList.add("virada");

    if (!primeiraCarta) {
        primeiraCarta = carta;
        return;
    }

    segundaCarta = carta;
    bloqueado = true;

    verificarParMemoria();
}

function verificarParMemoria() {
    const valor1 = primeiraCarta.dataset.valor;
    const valor2 = segundaCarta.querySelector(".card-back").textContent;

    const resultado1 = primeiraCarta.querySelector(".card-back").textContent;

    const acertou =
        (resultado1 === valor2) ||
        (segundaCarta.dataset.valor === resultado1);

    if (acertou) {
        primeiraCarta.classList.add("encontrada");
        segundaCarta.classList.add("encontrada");

        paresEncontrados++;

        atualizarPlacar(10);

        primeiraCarta = null;
        segundaCarta = null;
        bloqueado = false;

        if (paresEncontrados === 4) {
            setTimeout(() => {
                alert("🎉 VOCÊ ENCONTROU TODOS OS PARES!");
                proximaFase();
            }, 500);
        }

    } else {
        setTimeout(() => {
            primeiraCarta.classList.remove("virada");
            segundaCarta.classList.remove("virada");

            primeiraCarta = null;
            segundaCarta = null;
            bloqueado = false;
        }, 1000);
    }
}


// ===============================
// FASE 5
// LOJA
// ===============================

function faseLoja() {

    faseNome.textContent = "FASE 5 - NEON SHOP 🛍️";

    fase.innerHTML = `
        <h2>🛍️ NEON SHOP 🛍️</h2>

        <p class="pergunta">
            Você tem 350 moedas.
        </p>

        <p class="pergunta">
            Compre um item e descubra quanto vai sobrar!
        </p>

        <div class="loja">

            <div class="item" data-preco="120">
                <div class="emoji">🕶️</div>
                <h3>Óculos Neon</h3>
                <p>120 🪙</p>
            </div>

            <div class="item" data-preco="200">
                <div class="emoji">🎧</div>
                <h3>Fone Arcade</h3>
                <p>200 🪙</p>
            </div>

            <div class="item" data-preco="300">
                <div class="emoji">🛹</div>
                <h3>Skate Neon</h3>
                <p>300 🪙</p>
            </div>

        </div>

        <div id="feedback" class="feedback"></div>
    `;


    document.querySelectorAll(".item").forEach(item => {

        item.addEventListener("click", () => {

            if (respondida) return;

            const preco = Number(item.dataset.preco);

            const sobra = 350 - preco;

            respondida = true;

            if (sobra === 150) {

                ganharPontos(250);

                coins += 50;

                atualizarHUD();

                mostrarFeedback(
                    `🛍️ PERFEITO! 350 - 200 = ${sobra} moedas. +250 XP`,
                    true
                );

            } else {

                perderVida();

                mostrarFeedback(
                    `💥 Ops! Escolha o item de 200 moedas. 350 - 200 = 150.`,
                    false
                );
            }

            mostrarBotaoProximo();
        });

    });
}


// ===============================
// FASE 6
// BOSS FINAL
// ===============================

function faseBoss() {

    faseNome.textContent = "FASE FINAL - BOSS DOS NÚMEROS 👾";

    bossVida = 100;

    mostrarBoss();
}


function mostrarBoss() {

    fase.innerHTML = `
        <h2>👾 BOSS DOS NÚMEROS 👾</h2>

        <div class="boss">
            👾
        </div>

        <div class="barra-vida">
            <div class="vida" id="vidaBoss"></div>
        </div>

        <p class="pergunta">
            Ataque o Boss resolvendo:
        </p>

        <p class="pergunta">
            Uma pizza foi dividida em 8 partes iguais.
            João comeu 2 partes.
            Qual fração representa a quantidade que ele comeu?
        </p>

        <div class="opcoes">

            <button class="opcao" data-resposta="1/2">
                🍕 1/2
            </button>

            <button class="opcao" data-resposta="2/8">
                🍕 2/8
            </button>

            <button class="opcao" data-resposta="3/8">
                🍕 3/8
            </button>

            <button class="opcao" data-resposta="4/8">
                🍕 4/8
            </button>

        </div>

        <div id="feedback" class="feedback"></div>
    `;


    document.querySelectorAll(".opcao").forEach(botao => {

        botao.addEventListener("click", () => {

            if (respondida) return;

            respondida = true;

            if (botao.dataset.resposta === "2/8") {

                botao.classList.add("correta");

                bossVida -= 50;

                score += 300;

                coins += 100;

                acertos++;

                atualizarHUD();

                document.getElementById("vidaBoss").style.width =
                    bossVida + "%";

                mostrarFeedback(
                    "💥 ATAQUE CRÍTICO! O BOSS PERDEU 50 HP!",
                    true
                );

                if (bossVida <= 0) {

                    setTimeout(() => {

                        mostrarFeedback(
                            "🏆 BOSS DERROTADO! VOCÊ É UMA LENDA!",
                            true
                        );

                        setTimeout(finalizarJogo, 1500);

                    }, 500);

                } else {

                    setTimeout(() => {

                        respondida = false;

                        mostrarBoss();

                    }, 1300);

                }

            } else {

                botao.classList.add("errada");

                perderVida();

                mostrarFeedback(
                    "💥 ATAQUE FALHOU! A fração correta é 2/8.",
                    false
                );

                setTimeout(() => {

                    if (lives <= 0) {

                        finalizarJogo();

                    } else {

                        respondida = false;

                        mostrarBoss();

                    }

                }, 1500);
            }
        });
    });
}


// ===============================
// SISTEMA DE PONTOS
// ===============================

function ganharPontos(valor) {

    score += valor;

    coins += Math.floor(valor / 2);

    acertos++;

    atualizarHUD();
}


function perderVida() {

    lives--;

    atualizarHUD();

    if (lives <= 0) {

        setTimeout(finalizarJogo, 1200);
    }
}


// ===============================
// FEEDBACK
// ===============================

function mostrarFeedback(texto, correto) {

    const feedback = document.getElementById("feedback");

    if (!feedback) return;

    feedback.textContent = texto;

    feedback.className =
        correto
            ? "feedback certo"
            : "feedback errado";
}


// ===============================
// BOTÃO PRÓXIMO
// ===============================

function mostrarBotaoProximo() {

    if (faseAtual === 3) return;

    if (faseAtual === 5) return;

    const botaoExistente = document.querySelector(".proximo-fase");

    if (botaoExistente) return;

    const botao = document.createElement("button");

    botao.textContent = "▶ PRÓXIMA FASE";

    botao.classList.add("proximo", "proximo-fase");

    botao.addEventListener("click", () => {

        faseAtual++;

        carregarFase();

    });

    fase.appendChild(botao);
}


// ===============================
// FINAL
// ===============================

function finalizarJogo() {

    clearInterval(timer);

    jogo.classList.remove("ativa");

    final.classList.add("ativa");

    finalScore.textContent =
        String(score).padStart(4, "0");

    finalCoins.textContent =
        String(coins).padStart(3, "0");

    finalAcertos.textContent =
        acertos;

    definirRank();
}


// ===============================
// RANKING
// ===============================

function definirRank() {

    if (score >= 2000) {

        rank.textContent = "💎 ARCADE LEGEND 💎";

    } else if (score >= 1500) {

        rank.textContent = "👑 MATH MASTER 👑";

    } else if (score >= 1000) {

        rank.textContent = "⚡ PRO PLAYER ⚡";

    } else if (score >= 500) {

        rank.textContent = "⭐ PLAYER ⭐";

    } else {

        rank.textContent = "🕹️ ROOKIE 🕹️";
    }
}