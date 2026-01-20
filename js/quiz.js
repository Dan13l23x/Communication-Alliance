// ===============================
// QUIZ DE QI - NÍVEL EXTREMO
// ===============================

const questions = [
  {
    q: "Qual número completa a sequência: 1, 2, 6, 24, 120, ?",
    options: ["360", "600", "720", "840"],
    answer: 2,
    category: "Sequências"
  },
  {
    q: "Qual é o próximo termo da sequência: 2, 3, 5, 8, 13, 21, ?",
    options: ["32", "34", "35", "36"],
    answer: 1,
    category: "Sequências"
  },
  {
    q: "Qual número completa a sequência: 2, 5, 11, 23, 47, ?",
    options: ["93", "94", "95", "96"],
    answer: 2,
    category: "Sequências"
  },
  {
    q: "Complete a sequência: 1, 4, 10, 22, 46, ?",
    options: ["82", "90", "94", "96"],
    answer: 2,
    category: "Sequências"
  },
  {
    q: "Se x + y = 11 e x² + y² = 65, qual é o valor de |x − y|?",
    options: ["2", "3", "4", "5"],
    answer: 1,
    category: "Matemática"
  },
  {
    q: "Um relógio adianta 3 minutos a cada 2 horas. Em 24 horas reais, quanto ele adianta?",
    options: ["24 minutos", "30 minutos", "36 minutos", "42 minutos"],
    answer: 2,
    category: "Matemática"
  },
  {
    q: "Se nenhum B é C e todo A é B, qual conclusão é válida?",
    options: [
      "Nenhum A é C",
      "Alguns C são A",
      "Todo C é A",
      "Alguns A são C"
    ],
    answer: 0,
    category: "Lógica"
  },
  {
    q: "Se P implica Q e Q é falso, o que se pode afirmar sobre P?",
    options: ["P é verdadeiro", "P é falso", "P é irrelevante", "P é provável"],
    answer: 1,
    category: "Lógica"
  },
  {
    q: "Qual a probabilidade de a soma de dois dados justos ser 9?",
    options: ["1/6", "1/9", "2/9", "1/12"],
    answer: 1,
    category: "Probabilidade"
  },
  {
    q: "Uma urna tem 5 bolas vermelhas e 7 pretas. Qual a probabilidade de retirar duas vermelhas sem reposição?",
    options: ["5/33", "7/33", "10/33", "14/33"],
    answer: 0,
    category: "Probabilidade"
  },
  {
    q: "Paradoxo está para contradição assim como axioma está para:",
    options: ["Prova", "Princípio", "Opinião", "Hipótese"],
    answer: 1,
    category: "Verbal"
  },
  {
    q: "Qual termo NÃO pertence ao grupo?",
    options: ["Isósceles", "Escaleno", "Retângulo", "Equilátero"],
    answer: 2,
    category: "Verbal"
  },
  {
    q: "Um cubo é pintado e dividido em 27 cubinhos iguais. Quantos cubinhos têm exatamente 2 faces pintadas?",
    options: ["8", "12", "18", "24"],
    answer: 1,
    category: "Espacial"
  },
  {
    q: "Qual é o valor de log₂(32) + log₂(1/8)?",
    options: ["1", "2", "3", "4"],
    answer: 1,
    category: "Matemática"
  },
  {
    q: "Se nenhum artista é técnico e todo designer é artista, então:",
    options: [
      "Nenhum designer é técnico",
      "Alguns técnicos são designers",
      "Todo técnico é designer",
      "Alguns designers são técnicos"
    ],
    answer: 0,
    category: "Lógica"
  },
  {
    q: "Qual termo completa a sequência: AZ, BY, CX, DW, ?",
    options: ["EV", "EU", "FV", "EW"],
    answer: 0,
    category: "Sequências"
  },
  {
    q: "Qual é o menor n natural tal que n! termina com 4 zeros?",
    options: ["18", "19", "20", "21"],
    answer: 2,
    category: "Matemática"
  },
  {
    q: "Quantas combinações distintas de 3 pessoas podem ser formadas a partir de 5 pessoas?",
    options: ["6", "8", "10", "12"],
    answer: 2,
    category: "Probabilidade"
  },
  {
    q: "Complete a sequência: 1, 2, 4, 7, 11, 16, ?",
    options: ["20", "22", "23", "24"],
    answer: 1,
    category: "Sequências"
  },
  {
    q: "Se a afirmação 'Alguns A não são B' é falsa, então:",
    options: [
      "Todos A são B",
      "Nenhum A é B",
      "Alguns B não são A",
      "Todos B são A"
    ],
    answer: 0,
    category: "Lógica"
  }
];

const totalQuestions = questions.length;
const categoryTotals = questions.reduce((acc, item) => {
  acc[item.category] = (acc[item.category] || 0) + 1;
  return acc;
}, {});

// ===============================
// VARIÁVEIS DE CONTROLE
// ===============================

let index = 0;
let score = 0;
let selected = null;
const categoryCorrect = {};

// ===============================
// ELEMENTOS DO DOM
// ===============================

const quiz = document.getElementById("quiz-container");
const progress = document.getElementById("progress-bar");
const nextBtn = document.getElementById("nextBtn");
const counter = document.getElementById("question-counter");

// ===============================
// FUNÇÕES
// ===============================

function loadQuestion() {
  selected = null;
  nextBtn.disabled = true;

  progress.style.width = `${(index / totalQuestions) * 100}%`;
  counter.textContent = `Questão ${index + 1} de ${totalQuestions}`;

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

  nextBtn.textContent = index === totalQuestions - 1 ? "Finalizar teste" : "Próxima questão";
}

function selectOption(i, el) {
  selected = i;
  nextBtn.disabled = false;

  document.querySelectorAll(".option").forEach(opt => {
    opt.classList.remove("selected");
  });

  el.classList.add("selected");
}

function nextQuestion() {
  if (selected === null) return;

  const current = questions[index];

  if (selected === current.answer) {
    score++;
    categoryCorrect[current.category] = (categoryCorrect[current.category] || 0) + 1;
  }

  index++;

  if (index < totalQuestions) {
    loadQuestion();
  } else {
    const payload = {
      score,
      total: totalQuestions,
      categoryCorrect,
      categoryTotals
    };

    localStorage.setItem("quizResults", JSON.stringify(payload));
    window.location.href = "resultado.html";
  }
}

// ===============================
// INICIAR QUIZ
// ===============================

loadQuestion();
