// Perguntas do teste
const questions = [
  {
    q: "2, 4, 8, 16, ?",
    options: ["18", "24", "32", "30"],
    answer: 2
  },
  {
    q: "Qual não pertence?",
    options: ["Quadrado", "Círculo", "Triângulo", "Relógio"],
    answer: 3
  },
  {
    q: "Se A > B e B > C, então:",
    options: ["A > C", "C > A", "A = C"],
    answer: 0
  }
];

let index = 0;
let score = 0;
let selected = null;

const quiz = document.getElementById("quiz-container");
const progress = document.getElementById("progress-bar");
const nextBtn = document.getElementById("nextBtn");

// Carrega pergunta
function loadQuestion() {
  selected = null;
  nextBtn.disabled = true;

  progress.style.width = `${(index / questions.length) * 100}%`;

  const q = questions[index];
  quiz.innerHTML = `
    <div class="question">${q.q}</div>
    ${q.options
      .map(
        (opt, i) =>
          `<div class="option" onclick="selectOption(${i}, this)">${opt}</div>`
      )
      .join("")}
  `;
}

// Selecionar alternativa
function selectOption(i, el) {
  selected = i;
  nextBtn.disabled = false;

  document.querySelectorAll(".option").forEach(opt => {
    opt.style.background = "#1e1e1e";
  });

  el.style.background = "#00ff99";
}

// Próxima pergunta
function nextQuestion() {
  if (selected === null) return;

  if (selected === questions[index].answer) {
    score++;
  }

  index++;

  if (index < questions.length) {
    loadQuestion();
  } else {
    localStorage.setItem("score", score);
    window.location.href = "resultado.html";
  }
}

// Inicia o teste
loadQuestion();
