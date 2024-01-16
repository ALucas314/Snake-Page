document.addEventListener('DOMContentLoaded', function () {
    const scoreElement = document.getElementById('score');
    const gameContainer = document.getElementById('game-container');
    const controls = document.getElementById('controls');
  
    let snake = [[10, 10], [10, 9], [10, 8]];
    let food = generateFood();
    let direction = 'right';
    let score = 0;
  
    function generateFood() {
      return [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
    }
  
    function updateGame() {

        const head = [...snake[0]];
      switch (direction) {
        case 'up':
          head[0] -= 1;
          break;
        case 'down':
          head[0] += 1;
          break;
        case 'left':
          head[1] -= 1;
          break;
        case 'right':
          head[1] += 1;
          break;
      }
  
      if (
        head[0] < 0 || head[0] >= 20 ||
        head[1] < 0 || head[1] >= 20 ||
        snake.some(segment => segment[0] === head[0] && segment[1] === head[1])
      ) {
        showGameOver();
        resetGame();
        return;
      }
  
      snake.unshift(head);
  
      if (head[0] === food[0] && head[1] === food[1]) {
        score += 1;
        food = generateFood();
      } else {
        snake.pop();
      }
  
      scoreElement.textContent = `Score: ${score}`;
  
      renderGame();
    }
  
    function renderGame() {
      gameContainer.innerHTML = '';
  
      snake.forEach(segment => {
        const segmentDiv = document.createElement('div');
        segmentDiv.className = 'snake-segment';
        segmentDiv.style.gridRowStart = segment[0] + 1;
        segmentDiv.style.gridColumnStart = segment[1] + 1;
        gameContainer.appendChild(segmentDiv);
      });
  
      const foodDiv = document.createElement('div');
      foodDiv.className = 'food';
      foodDiv.style.gridRowStart = food[0] + 1;
      foodDiv.style.gridColumnStart = food[1] + 1;
      gameContainer.appendChild(foodDiv);
    }
  
    function resetGame() {
      snake = [[10, 10], [10, 9], [10, 8]];
      food = generateFood();
      direction = 'right';
      score = 0;
      scoreElement.textContent = 'Score: 0';
      renderGame();
    }
  
    function changeDirection(newDirection) {
      if (
        (newDirection === 'up' && direction !== 'down') ||
        (newDirection === 'down' && direction !== 'up') ||
        (newDirection === 'left' && direction !== 'right') ||
        (newDirection === 'right' && direction !== 'left')
      ) {
        direction = newDirection;
      }
    }
  
    function showGameOver() {
      alert(`Game Over! Your final score: ${score}`);
    }
  
    document.addEventListener('click', function (event) {
      if (event.target.tagName === 'BUTTON') {
        changeDirection(event.target.id);
      }
    });
  
    // Adicionar listener de eventos de teclado
    document.addEventListener('keydown', function (event) {
      switch (event.key) {
        case 'ArrowUp':
          changeDirection('up');
          break;
        case 'ArrowDown':
          changeDirection('down');
          break;
        case 'ArrowLeft':
          changeDirection('left');
          break;
        case 'ArrowRight':
          changeDirection('right');
          break;
      }
    });
  
    setInterval(updateGame, 220);
  });
  
  // Variáveis globais
let score = 0;

// Função para atualizar o contador de pontos na tela
function updateScore() {
    document.getElementById('score').textContent = score;
}

// Exemplo de função para quando o jogador pega uma pedra (você deve adaptar isso conforme seu código)
function pegarPedra() {
    // Lógica para pegar a pedra

    // Aumentar a pontuação
    score += 10;

    // Atualizar o contador de pontos na tela
    updateScore();
}

// Exemplo de evento que chama a função quando o jogador pega uma pedra (você deve adaptar isso conforme seu código)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Space') { // Exemplo: o jogador apertou a barra de espaço para pegar a pedra
        pegarPedra();
    }
});

const cellSize = window.innerWidth < 480 ? window.innerWidth / 20 : 20;
gameContainer.style.gridTemplateColumns = `repeat(20, ${cellSize}px)`;
gameContainer.style.gridTemplateRows = `repeat(20, ${cellSize}px)`;

function updateGame() {
    const head = [...snake[0]];
    switch (direction) {
      case 'up':
        head[0] -= 1;
        break;
      case 'down':
        head[0] += 1;
        break;
      case 'left':
        head[1] -= 1;
        break;
      case 'right':
        head[1] += 1;
        break;
    }
  
    // Checar colisões e ajustar posições
    if (head[0] < 0) {
      head[0] = 19; // Se a cabeça atingir o topo, ajuste para a parte inferior
    } else if (head[0] >= 20) {
      head[0] = 0; // Se a cabeça atingir a parte inferior, ajuste para o topo
    }
  
    if (head[1] < 0) {
      head[1] = 19; // Se a cabeça atingir a extrema esquerda, ajuste para a extrema direita
    } else if (head[1] >= 20) {
      head[1] = 0; // Se a cabeça atingir a extrema direita, ajuste para a extrema esquerda
    }
  
    if (snake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
      showGameOver();
      resetGame();
      return;
    }
  
    snake.unshift(head);
  
    if (head[0] === food[0] && head[1] === food[1]) {
      score += 1;
      food = generateFood();
    } else {
      snake.pop();
    }
  
    updateScore();
  
    renderGame();
  }
  
