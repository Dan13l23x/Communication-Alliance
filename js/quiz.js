// ===============================
// QUIZ DE QI - NÍVEL AVANÇADO
// ===============================

const questions = [
  {
    q: "Qual número completa a sequência: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "48"],
    answer: 1,
    category: "Sequências"
  },
  {
    q: "Se A = 1, B = 2, ..., Z = 26, qual é a soma de NEURO?",
    options: ["72", "73", "75", "77"],
    answer: 2,
    category: "Matemática"
  },
  {
    q: "Qual opção mantém a relação lógica correta?",
    options: [
      "Lente está para foco assim como antena está para captação",
      "Lente está para vidro assim como antena está para metal",
      "Lente está para visão assim como antena está para eletricidade",
      "Lente está para olho assim como antena está para computador"
    ],
    answer: 0,
    category: "Verbal"
  },
  {
    q: "Qual número completa a sequência: 7, 14, 28, 56, 112, ?",
    options: ["168", "196", "210", "224"],
    answer: 3,
    category: "Sequências"
  },
  {
    q: "Se todos os Kron são Niv e alguns Niv são Lur, então:",
    options: [
      "Alguns Kron são Lur",
      "Nenhum Kron é Lur",
      "Todos os Lur são Kron",
      "Alguns Lur podem ser Kron"
    ],
    answer: 3,
    category: "Lógica"
  },
  {
    q: "Qual é o próximo termo: 1, 4, 9, 16, 25, 36, ?",
    options: ["42", "48", "49", "64"],
    answer: 2,
    category: "Sequências"
  },
  {
    q: "Se 3 máquinas produzem 12 peças em 5 minutos, quantas peças 5 máquinas produzem em 10 minutos?",
    options: ["30", "40", "45", "50"],
    answer: 1,
    category: "Matemática"
  },
  {
    q: "Qual palavra NÃO pertence ao grupo?",
    options: ["Eclipse", "Aurora", "Nebulosa", "Cometa"],
    answer: 1,
    category: "Verbal"
  },
  {
    q: "Complete a analogia: Código está para criptografia assim como impressão está para:",
    options: ["Tinta", "Tipografia", "Linguagem", "Cópia"],
    answer: 1,
    category: "Verbal"
  },
  {
    q: "Qual é a probabilidade de sair um número primo ao lançar um dado justo?",
    options: ["1/2", "1/3", "2/3", "1/6"],
    answer: 0,
    category: "Probabilidade"
  },
  {
    q: "Em uma sequência alternada, letras ocupam posições ímpares e números posições pares: A2 C4 E6 G?, qual é o termo correto?",
    options: ["8", "H8", "I8", "G8"],
    answer: 1,
    category: "Sequências"
  },
  {
    q: "Se o dobro de um número menos 6 é igual a 3 vezes esse número menos 18, qual é o número?",
    options: ["6", "9", "12", "15"],
    answer: 1,
    category: "Matemática"
  },
  {
    q: "Qual figura completa a série lógica? Quadrado, triângulo, pentágono, ?, heptágono.",
    options: ["Hexágono", "Quadrado", "Octógono", "Pentágono"],
    answer: 0,
    category: "Sequências"
  },
  {
    q: "Se apenas 18% dos candidatos acertam uma questão e 25% do total são mulheres, qual é a porcentagem máxima de mulheres que poderiam ter acertado?",
    options: ["18%", "25%", "43%", "72%"],
    answer: 0,
    category: "Probabilidade"
  },
  {
    q: "Qual opção representa uma conclusão válida?",
    options: [
      "Todos os analistas usam dados. Carla usa dados. Logo, Carla é analista.",
      "Nenhum programador é designer. João é designer. Logo, João não é programador.",
      "Alguns gestores são líderes. Logo, todos os gestores são líderes.",
      "Se X implica Y e Y implica Z, então X não implica Z."
    ],
    answer: 1,
    category: "Lógica"
  },
  {
    q: "Uma sequência soma os dois termos anteriores: 2, 5, 7, 12, 19, ?",
    options: ["25", "29", "31", "33"],
    answer: 1,
    category: "Sequências"
  },
  {
    q: "Qual número torna verdadeira a equação: 3x² - 12x + 12 = 0?",
    options: ["2", "3", "4", "6"],
    answer: 0,
    category: "Matemática"
  },
  {
    q: "Qual padrão está incorreto?",
    options: [
      "Mercúrio é planeta rochoso",
      "Saturno é planeta gasoso",
      "Marte é planeta gasoso",
      "Vênus é planeta rochoso"
    ],
    answer: 2,
    category: "Verbal"
  },
  {
    q: "Se uma matriz 3x3 tem soma dos elementos igual a 45 e cada linha soma 15, qual é a soma da diagonal principal?",
    options: ["10", "12", "15", "18"],
    answer: 2,
    category: "Espacial"
  },
  {
    q: "Qual termo completa a sequência: 4, 9, 16, 25, 36, ?",
    options: ["45", "48", "49", "64"],
    answer: 2,
    category: "Sequências"
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
