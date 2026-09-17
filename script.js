const episodes = [
    {
        title: "Серия 1: Muddy Puddles (Грязные лужи)",
        videoUrl: "https://youtube.com",
        question: "Что обожает делать Пеппа в этой серии?",
        correct: "Jump",
        options: [
            { word: "Jump", trans: "Прыгать", img: "https://icons8.com" },
            { word: "Sleep", trans: "Спать", img: "https://icons8.com" },
            { word: "Fly", trans: "Летать", img: "https://icons8.com" }
        ]
    },
    {
        title: "Серия 2: George's Dinosaur (Динозавр Джорджа)",
        videoUrl: "https://youtube.com",
        question: "Какое животное является любимой игрушкой Джорджа?",
        correct: "Dinosaur",
        options: [
            { word: "Cat", trans: "Кошка", img: "https://icons8.com" },
            { word: "Dinosaur", trans: "Динозавр", img: "https://icons8.com" },
            { word: "Dog", trans: "Собака", img: "https://icons8.com" }
        ]
    },
    {
        title: "Серия 3: Best Friend (Лучший друг)",
        videoUrl: "https://youtube.com",
        question: "Кто приходит в гости к Пеппе? (Овечка Сьюзи — её...)",
        correct: "Friend",
        options: [
            { word: "Friend", trans: "Друг", img: "https://icons8.com" },
            { word: "Teacher", trans: "Учитель", img: "https://icons8.com" },
            { word: "Enemy", trans: "Враг", img: "https://icons8.com" }
        ]
    },
    {
        title: "Серия 4: Polly Parrot (Попугай Полли)",
        videoUrl: "https://youtube.com",
        question: "Какая птица умеет повторять слова за дедушкой и бабушкой?",
        correct: "Parrot",
        options: [
            { word: "Duck", trans: "Утка", img: "https://icons8.com" },
            { word: "Parrot", trans: "Попугай", img: "https://icons8.com" },
            { word: "Owl", trans: "Сова", img: "https://icons8.com" }
        ]
    },
    {
        title: "Серия 5: Hide and Seek (Прятки)",
        videoUrl: "https://youtube.com",
        question: "В какую популярную игру играют дети?",
        correct: "Hide and seek",
        options: [
            { word: "Football", trans: "Футбол", img: "https://icons8.com" },
            { word: "Chess", trans: "Шахматы", img: "https://icons8.com" },
            { word: "Hide and seek", trans: "Прятки", img: "https://icons8.com" }
        ]
    }
];

let currentLevel = parseInt(localStorage.getItem('peppa_project_level')) || 0;
let selectedWord = "";

function initGame() {
    if (currentLevel >= episodes.length) {
        document.getElementById('gameLayout').classList.add('hidden');
        document.getElementById('victoryScreen').classList.remove('hidden');
        document.getElementById('progressBar').style.width = "100%";
        return;
    }

    const currentData = episodes[currentLevel];
    
    document.getElementById('levelDisplay').innerText = currentLevel + 1;
    document.getElementById('scoreDisplay').innerText = currentLevel * 10;
    document.getElementById('lessonTitle').innerText = currentData.title;
    document.getElementById('videoPlayer').src = currentData.videoUrl;
    document.getElementById('questionText').innerText = currentData.question;
    
    document.getElementById('progressBar').style.width = (currentLevel / episodes.length) * 100 + "%";

    const container = document.getElementById('cardsContainer');
    container.innerHTML = "";
    selectedWord = "";

    currentData.options.forEach(opt => {
        const card = document.createElement('div');
        card.className = 'word-card';
        card.innerHTML = `
            <img src="${opt.img}">
            <div class="english-word">${opt.word}</div>
            <div class="translation">${opt.trans}</div>
        `;
        card.onclick = () => {
            document.querySelectorAll('.word-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedWord = opt.word;
            
            if ('speechSynthesis' in window) {
                let ut = new SpeechSynthesisUtterance(opt.word);
                ut.lang = 'en-US';
                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(ut);
            }
        };
        container.appendChild(card);
    });
}

function checkAnswer() {
    if (!selectedWord) { return alert("🐷 Выбери ответ!"); }

    if (selectedWord === episodes[currentLevel].correct) {
        alert("🌟 Умница! Задание выполнено.");
        currentLevel++;
        localStorage.setItem('peppa_project_level', currentLevel);
        initGame();
    } else {
        alert("❌ Неправильно. Попробуй еще раз!");
    }
}

function resetProgress() {
    localStorage.removeItem('peppa_project_level');
    currentLevel = 0;
    document.getElementById('victoryScreen').classList.add('hidden');
    document.getElementById('gameLayout').classList.remove('hidden');
    initGame();
}

initGame();
