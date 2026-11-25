/* Start Script */

/* Start Button */

const startBtn = document.getElementById("startBtn");

if (startBtn) {
  localStorage.removeItem("bags");

  startBtn.addEventListener("click", () => {
    location.href = "question.html";
  });
}

const answerButtons = document.querySelectorAll(".answer-btn");
const bagStartBtn = document.getElementById("bagStartBtn");

if (answerButtons.length && bagStartBtn) {
  const answerResult = document.getElementById("answerResult");

  answerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      answerButtons.forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");

      answerResult.classList.remove("hidden");
      bagStartBtn.classList.remove("hidden");

      if (button.dataset.answer === "yes") {
        answerResult.textContent = "那就一起看看，袋子還能陪我們走多久。";
      } else {
        answerResult.textContent = "很棒！繼續用同一個袋子，讓資源被好好利用。";
      }
    });
  });

  bagStartBtn.addEventListener("click", () => {
    location.href = "market.html";
  });
}

/* Floating Bag Movement */

const floatingBags = document.querySelectorAll(".floating-bag");

floatingBags.forEach((bag) => {
  bag.addEventListener("mouseenter", () => {
    bag.style.opacity = "0.4";

    bag.style.transform = "scale(1.2)";
  });

  bag.addEventListener("mouseleave", () => {
    bag.style.opacity = "0.12";

    bag.style.transform = "scale(1)";
  });
});
/* Market Map */

function getCollectedBags() {
  return JSON.parse(localStorage.getItem("bags")) || [];
}

function goBag(type) {
  const collected = getCollectedBags();

  if (!collected.includes(type)) {
    location.href = "bag.html?type=" + type;
  }
}

/* 收集數量 */

const count = document.getElementById("count");

if (count) {
  const collected = getCollectedBags();

  count.textContent = collected.length;

  collected.forEach((type) => {
    const stall = document.getElementById(type);

    if (stall) {
      stall.classList.add("collected");
      stall.removeAttribute("role");
      stall.removeAttribute("tabindex");
      stall.onclick = null;
      stall.onkeydown = null;

      const action = stall.querySelector("p");
      if (action) action.textContent = "已探索";
    }
  });

  if (collected.length === 4) {
    location.replace("reuse.html");
  }
}
/* Bag Open Game */

const bagData = {
  vegetable: {
    name: "蔬菜攤",
    original: "img/vegetable.png",
    design: "img/vegetable-redsign.png",
    concept: "以蔬菜的形象重新轉化，呈現傳統市場的新視覺。",
  },

  fish: {
    name: "魚攤",
    original: "img/fish.png",
    design: "img/fish-redsign.png",
    concept: "透過魚與海洋元素，重新詮釋魚攤文化。",
  },

  pork: {
    name: "豬肉攤",
    original: "img/pork.png",
    design: "img/pork-redsign.png",
    concept: "保留市場熟悉的紅白印象，加入新的圖像語言。",
  },

  fruit: {
    name: "水果攤",
    original: "img/fruit.png",
    design: "img/fruit-redsign.png",
    concept: "利用水果色彩，呈現市場的季節感。",
  },
};

const params = new URLSearchParams(location.search);

const type = params.get("type");
const collectedOnBagPage = JSON.parse(localStorage.getItem("bags")) || [];

const reusePage = document.getElementById("reuse-page");

if (reusePage) {
  if (collectedOnBagPage.length !== 4) {
    location.replace("market.html");
  }

  const resetReuseBtn = document.getElementById("resetReuseBtn");

  if (resetReuseBtn) {
    resetReuseBtn.addEventListener("click", () => {
      localStorage.removeItem("bags");
      location.href = "index.html";
    });
  }
}

if (type && collectedOnBagPage.includes(type)) {
  location.replace("market.html");
}

if (type && bagData[type]) {
  document.getElementById("stall-name").textContent = bagData[type].name;

  document.getElementById("bag-img").src = bagData[type].original;

  document.getElementById("original-img").src = bagData[type].original;

  document.getElementById("design-img").src = bagData[type].design;

  document.getElementById("concept").textContent = bagData[type].concept;
}

function openBag() {
  const bagArea = document.querySelector(".bag-area");
  const bagGame = document.querySelector(".bag-game");

  if (!bagArea || bagArea.classList.contains("open")) return;

  bagArea.classList.add("open");

  if (bagGame) bagGame.classList.add("open");

  const hint = document.querySelector(".hint");
  if (hint) hint.classList.add("hidden");

  setTimeout(() => {
    document.getElementById("result").classList.remove("hidden");
  }, 800);
}

function collectBag() {
  let bags = JSON.parse(localStorage.getItem("bags")) || [];

  if (!bags.includes(type)) {
    bags.push(type);

    localStorage.setItem("bags", JSON.stringify(bags));
  }

  location.href = "market.html";
}
