const quotes = [
  {
    text: "لن تصل إلى القمة من دون أن تؤمن بأنك خُلقت لها.",
    author: "نايلة الكيلاني",
  },
  {
    text: "كل خطوة صغيرة اليوم، تصنع قفزة كبيرة غدًا.",
    author: "نايلة الكيلاني",
  },
  {
    text: "عندما تتعب تذكّر لماذا بدأت.",
    author: "نايلة الكيلاني",
  },
  {
    text: "لا تؤجل نورك، فالعالم ينتظر إشراقك.",
    author: "نايلة الكيلاني",
  },
  {
    text: "لا يأس مع الحياة، ولا حياة مع اليأس.",
    author: "مصطفى كامل",
  },
  {
    text: "إذا الشعب يومًا أراد الحياة فلا بد أن يستجيب القدر.",
    author: "أبو القاسم الشابي",
  },
  {
    text: "من جدّ وجد، ومن زرع حصد.",
    author: "مثل عربي",
  },
  {
    text: "العلم نور والجهل ظلام.",
    author: "مثل عربي",
  },
  {
    text: "اطلبوا العلم من المهد إلى اللحد.",
    author: "حديث شائع",
  },
  {
    text: "إن مع العسر يسرا.",
    author: "القرآن الكريم",
  },
  {
    text: "اعقلها وتوكّل.",
    author: "حديث شائع",
  },
  {
    text: "قيمة كل امرئ ما يحسنه.",
    author: "الإمام علي",
  },
  {
    text: "لا تكن عبدًا لغيرك وقد جعلك الله حرًا.",
    author: "الإمام علي",
  },
  {
    text: "من لم يجد في نفسه قوة ليصبر على الألم، لم يجد قوة ليصنع الأمل.",
    author: "طه حسين",
  },
  {
    text: "العلم بحر لا ساحل له.",
    author: "طه حسين",
  },
  {
    text: "الأمل هو ذلك الشيء الذي يجعلك تغني في قلب الظلام.",
    author: "فيكتور هوغو",
  },
  {
    text: "افعل ما تستطيع، بما تملك، حيث أنت.",
    author: "ثيودور روزفلت",
  },
  {
    text: "المستقبل يبدأ الآن، وليس غدًا.",
    author: "البابا يوحنا بولس الثاني",
  },
  {
    text: "لن تستطيع أن تُبدع إن لم تتعلم أن تتجرأ.",
    author: "نجيب محفوظ",
  },
  {
    text: "الوقت كالسيف إن لم تقطعه قطعك.",
    author: "مثل عربي",
  },
  {
    text: "العظمة لا تُهدى، بل تُنتزع بالعمل.",
    author: "أنطون تشيخوف",
  },
  {
    text: "النجاح هو مجموع الجهود الصغيرة المتكررة يومًا بعد يوم.",
    author: "روبرت كولير",
  },
  {
    text: "اجعل كل يوم تحفة فنية.",
    author: "جون وودن",
  },
  {
    text: "إيمانك بنفسك هو أعظم إنجازاتك.",
    author: "هيلين كيلر",
  },
  {
    text: "الانضباط هو الجسر بين الأهداف والإنجاز.",
    author: "جيم رون",
  },
  {
    text: "إذا لم تُخاطر فلن تعرف طعم النجاح.",
    author: "باولو كويلو",
  },
  {
    text: "تعلّم أن تقول لا لما يسرق وقتك.",
    author: "ستيف جوبز",
  },
  {
    text: "السعادة قرار لا ظرف.",
    author: "ديل كارنيجي",
  },
  {
    text: "ليس هناك طريق مختصر إلى أي مكان يستحق الذهاب إليه.",
    author: "بيفرلي سيلز",
  },
  {
    text: "اصنع أثرًا يليق بأحلامك.",
    author: "نايلة الكيلاني",
  },
  {
    text: "إن لم تحلم، لن تُبدع.",
    author: "أحلام مستغانمي",
  },
  {
    text: "النجاح لا يأتيك، بل أنت تذهب إليه.",
    author: "مارفا كولينز",
  },
  {
    text: "الشجاعة هي أول الصفات الإنسانية لأنها الصفة التي تضمن باقي الصفات.",
    author: "أرسطو",
  },
];

const quoteCount = document.getElementById("quote-count");
const countLabel = document.getElementById("count-label");
const authorSelect = document.getElementById("author-select");
const quotesGrid = document.getElementById("quotes");
const generateButton = document.getElementById("generate");
const toggleAutoButton = document.getElementById("toggle-auto");
const refreshSpeed = document.getElementById("refresh-speed");

let autoRefresh = true;
let intervalId = null;

const uniqueAuthors = ["الكل", ...new Set(quotes.map((quote) => quote.author))];

const shuffle = (items) => {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const buildCard = (quote) => {
  const card = document.createElement("article");
  card.className = "quote-card";
  card.innerHTML = `
    <p class="quote-text">${quote.text}</p>
    <p class="quote-author">${quote.author}</p>
  `;
  return card;
};

const renderQuotes = () => {
  const count = Number.parseInt(quoteCount.value, 10);
  const selectedAuthor = authorSelect.value;
  const filtered =
    selectedAuthor === "الكل"
      ? quotes
      : quotes.filter((quote) => quote.author === selectedAuthor);

  const picks = shuffle(filtered).slice(0, Math.min(count, filtered.length));
  quotesGrid.innerHTML = "";

  if (picks.length === 0) {
    quotesGrid.innerHTML =
      "<div class=\"quote-card\"><p class=\"quote-text\">لا توجد مقولات لهذا القائل بعد.</p></div>";
    return;
  }

  picks.forEach((quote) => quotesGrid.appendChild(buildCard(quote)));
};

const fillAuthors = () => {
  authorSelect.innerHTML = "";
  uniqueAuthors.forEach((author) => {
    const option = document.createElement("option");
    option.value = author;
    option.textContent = author;
    authorSelect.appendChild(option);
  });
};

const updateCountLabel = () => {
  countLabel.textContent = quoteCount.value;
};

const startAutoRefresh = () => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(renderQuotes, Number.parseInt(refreshSpeed.value, 10));
};

quoteCount.addEventListener("input", () => {
  updateCountLabel();
  renderQuotes();
});

authorSelect.addEventListener("change", renderQuotes);
refreshSpeed.addEventListener("change", () => {
  if (autoRefresh) {
    startAutoRefresh();
  }
});

generateButton.addEventListener("click", renderQuotes);

const toggleAuto = () => {
  autoRefresh = !autoRefresh;
  toggleAutoButton.textContent = `تحديث تلقائي: ${
    autoRefresh ? "مفعّل" : "متوقف"
  }`;
  toggleAutoButton.classList.toggle("ghost", !autoRefresh);
  if (autoRefresh) {
    startAutoRefresh();
  } else if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

toggleAutoButton.addEventListener("click", toggleAuto);

fillAuthors();
updateCountLabel();
renderQuotes();
startAutoRefresh();
