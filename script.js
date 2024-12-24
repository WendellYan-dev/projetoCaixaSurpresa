// Define a data e hora em que a caixa poderá ser aberta
const unlockDate = new Date("2024-12-21T00:00:00"); // Altere para a data e hora desejadas

// Seleciona os elementos da página
const giftBox = document.getElementById("giftBox");
const carousel = document.getElementById("carousel");

// Adiciona um evento de clique na caixa
giftBox.addEventListener("click", function () {
    const currentDate = new Date();
    const music = document.getElementById("music");
if (music.paused) {
    music.play().catch(error => {
        console.error("Erro ao tentar reproduzir a música:", error);
        alert("A reprodução da música foi bloqueada pelo navegador. Clique para permitir o som.");
    });
}

    
    // Verifica se a data atual é anterior à data de desbloqueio
    if (currentDate < unlockDate) {
        alert(`A caixa não pode ser aberta ainda! Volte em: ${unlockDate.toLocaleString('pt-BR')}`);
        return; // Impede a execução do restante do código
    }
    
    // Esconde a caixa de presente após a explosão
    setTimeout(() => {
        giftBox.style.display = 'none';
        arrow.style.display = 'none';
        title.style.display = 'none';
        imgMT.style.display = 'none';
        carousel.style.display = 'block'; // Exibe o carrossel após a animação
    }, 1000); // Tempo suficiente para a animação

    // Cria e anima as estrelinhas
    createStars(100);
});

function createStars(numStars) {
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'box-star-explosion';
        star.style.top = '50%';
        star.style.left = '50%';
        giftBox.appendChild(star);
        
        const randomX = (Math.random() - 0.5) * 1500; // Posição aleatória no eixo X
        const randomY = (Math.random() - 0.5) * 1500; // Posição aleatória no eixo Y
        const scale = Math.random() * 2 + 1.2; // Tamanho aleatório
        const rotation = Math.random() * 360; // Rotação aleatória

        star.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`;
        star.animate(
            [
                { transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`, opacity: 1 },
                { transform: `translate(${randomX}px, ${randomY}px) scale(0.2) rotate(${rotation + 360}deg)`, opacity: 0 },
            ],
            { duration: 1000, easing: 'ease-out' }
        );

        // Remove a estrela após a animação
        setTimeout(() => star.remove(), 1000);
    }
}