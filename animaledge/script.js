let perguntasSelecionadas = [];
let indicePergunta = 0;
let acertos = 0;
let alternativaEscolhida = null;

// Seleciona 5 perguntas aleatórias
while (perguntasSelecionadas.length < 5) {
    let p = perguntas[Math.floor(Math.random() * perguntas.length)];
    if (!perguntasSelecionadas.includes(p)) perguntasSelecionadas.push(p);
}

const somCorreto = new Audio("sounds/correto.mp3");
const somErrado = new Audio("sounds/errado.mp3");

function carregarPergunta() {
    const p = perguntasSelecionadas[indicePergunta];
    document.getElementById("pergunta").innerText = p.pergunta;

    const divAlt = document.getElementById("alternativas");
    divAlt.innerHTML = "";

    p.alternativas.forEach((alt, index) => {
        const btn = document.createElement("button");
        btn.className = "alternativa";
        btn.innerText = alt;

        btn.onclick = () => {
            document
                .querySelectorAll(".alternativa")
                .forEach(b => b.classList.remove("selecionada"));
            btn.classList.add("selecionada");
            alternativaEscolhida = index;
        };

        divAlt.appendChild(btn);
    });
}

document.getElementById("responder").onclick = () => {
    if (alternativaEscolhida === null) return alert("Escolha uma alternativa!");

    const p = perguntasSelecionadas[indicePergunta];
    const botoes = document.querySelectorAll(".alternativa");

    if (alternativaEscolhida === p.correta) {
        botoes[alternativaEscolhida].classList.add("correta");
        somCorreto.play();
        acertos++;
    } else {
        botoes[alternativaEscolhida].classList.add("errada");
        botoes[p.correta].classList.add("correta");
        somErrado.play();
    }

    setTimeout(() => {
        indicePergunta++;
        alternativaEscolhida = null;

        if (indicePergunta === 5) {
            // Salva pontuação e vai para resultado
            localStorage.setItem("acertos", acertos);
            window.location.href = "result.html";
        } else {
            carregarPergunta();
        }
    }, 1500);
};

carregarPergunta();
