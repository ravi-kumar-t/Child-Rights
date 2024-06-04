//grab a couple of things
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 6;
let hasPlayedQuiz = false;


//link text
playerLivesCount.textContent = playerLives;

const getData = () => [
    { imgSrc: "child_abuse.png", name: "isagi" },
    { imgSrc: "child_marriag.jpg", name: "bachira" },
    { imgSrc: "health.jpg", name: "barou" },
    { imgSrc: "help.jpg", name: "kunigami" },
    { imgSrc: "edu.jpg", name: "rin" },
    { imgSrc: "equality.jpg", name: "shidou" },
    { imgSrc: "family.png", name: "aiku" },
    { imgSrc: "child_abuse.png", name: "isagi" },
    { imgSrc: "child_marriag.jpg", name: "bachira" },
    { imgSrc: "health.jpg", name: "barou" },
    { imgSrc: "help.jpg", name: "kunigami" },
    { imgSrc: "edu.jpg", name: "rin" },
    { imgSrc: "equality.jpg", name: "shidou" },
    { imgSrc: "family.png", name: "aiku" },
    { imgSrc: "player.jpg", name: "chigiri" },
    { imgSrc: "player.jpg", name: "chigiri" },
];
let getData2 = [
    { imgSrc: "isagi.png", name: "isagi" },
    { imgSrc: "bachira.png", name: "bachira" },
    { imgSrc: "barou.png", name: "barou" },
    { imgSrc: "kunigami.png", name: "kunigami" },
    { imgSrc: "Rin.png", name: "rin" },
    { imgSrc: "Shidou.png", name: "shidou" },
    { imgSrc: "Aiku.png", name: "aiku" },
    { imgSrc: "isagi.png", name: "isagi" },
    { imgSrc: "bachira.png", name: "bachira" },
    { imgSrc: "barou.png", name: "barou" },
    { imgSrc: "kunigami.png", name: "kunigami" },
    { imgSrc: "Rin.png", name: "rin" },
    { imgSrc: "Shidou.png", name: "shidou" },
    { imgSrc: "Aiku.png", name: "aiku" },
    { imgSrc: "chigiri.png", name: "chigiri" },
    { imgSrc: "chigiri.png", name: "chigiri" },
];
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

const cardGenerator = () => {
    const cardData = randomize();
    //generate the HTML
    cardData.forEach((item) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        //attach the info to the cards
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);
        //attach the cards to section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        });
    });
};

const checkCards = (e) => {
    console.log(e);
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');
    console.log(flippedCards);
    //logic
    if (flippedCards.length === 2) {
        if (
            flippedCards[0].getAttribute('name') ===
            flippedCards[1].getAttribute('name')
        ) {
            console.log("match");
            console.log(flippedCards[0].getAttribute('name'));
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
                card.classList.add("matched"); // Add 'matched' class to correctly paired cards
                // getData2 = getData2.filter(item => item!==flippedCards[0].name)
                console.log(checkCardName(flippedCards[0].getAttribute('name')));
            });
        } else {
            console.log("wrong");
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
            if (playerLives > 0) {
                playerLives--;
            }
            if (playerLives == 0) {
                if (hasPlayedQuiz) {
                    openEndgamePopup();
                } else {
                    openPopup();
                    hasPlayedQuiz = true;
                }
            }
            playerLivesCount.textContent = playerLives;
        }
    }
    //run a check to see if we won the game
    if (toggleCard.length === 16) {
        winPopup();
        restart("You WON !!!");
    }
};

const restart = (text, lives) => {
    // let cardData = getData().filter(item => {
    //     return ![...document.querySelectorAll('.matched')].some(card => {
    //         return card.getAttribute('name') === item.name;
    //     });
    // });
    // let cardData = getData2;
    // // cardData = randomize(cardData);
    // let faces = document.querySelectorAll(".face");
    // let cards = document.querySelectorAll(".card");
    // section.style.pointerEvents = "none";
    // cardData.forEach((item, index) => {
    //     if (!cards[index].classList.contains("matched")) { // Check if the card is not correctly paired
    //         cards[index].classList.remove('toggleCard');
    //         //randomize
    //         setTimeout(() => {
    //             cards[index].style.pointerEvents = "all";
    //             faces[index].src = item.imgSrc;
    //             cards[index].setAttribute('name', item.name);
    //             section.style.pointerEvents = "all";
    //         }, 1000);
    //     }
    // });

    playerLives = lives;
    playerLivesCount.textContent = playerLives;
};


let popup = document.getElementById("popup");
function openPopup() {
    popup.classList.add("open-popup");
}
function closePopup() {
    popup.classList.remove("open-popup");
}
let endgamePopup = document.getElementById("endgame-popup");
let playAgainButton = document.getElementById("play-again-btn");
let goHomeButton = document.getElementById("go-home-btn");

function openEndgamePopup() {
    endgamePopup.classList.add("open-popup");
}

function closeEndgamePopup() {
    endgamePopup.classList.remove("open-popup");
}

function winPopup() {
    let a = document.getElementById("win");
    a.innerHTML = "You Won";
    endgamePopup.classList.add("win-popup");
}

playAgainButton.addEventListener("click", () => {
    // Restart the game
    // submit(score);
    closeEndgamePopup();
    window.location.href = "index.html";
});

goHomeButton.addEventListener("click", () => {
    // Redirect to home page
    window.location.href = "/new/index.html";
});

// function checkCardName(s) {
//     for
// }

function removeElement(arr, index) {
    if (index > -1 && index < arr.length) {
        arr.splice(index, 1);
    }
    return arr;
}


function checkCardName(s) {
    for (let i = 0; i < getData2.length; i++) {
        if (getData2[i].name == s) {
            getData2 = removeElement(getData2, i);
        }
    }
    return getData2;
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const questions = [
    // Add your 20 questions here in the same format as before
    {
        question: "Ravi is a 10-year-old boy who lives in a village. He loves to go to school and learn new things. But his parents want him to work in the fields and help them with farming. What right of Ravi is being violated?",
        answers: [
            { text: "The right to health", correct: false },
            { text: "The right to play", correct: false },
            { text: "The right to expression", correct: false },
            { text: "The right to education", correct: true },
        ]
    },
    {
        question: "Sana is a 12-year-old girl who lives in a city. She likes to play football with her friends in the park. But some boys in her neighborhood tease her and say that football is not for girls. What right of Sana is being violated?",
        answers: [
            { text: "The right to participation", correct: false },
            { text: "The right to privacy", correct: false },
            { text: "The right to protection", correct: false },
            { text: "The right to equality", correct: true },
        ]
    },
    {
        question: "Priya is a 9-year-old girl who lives in a refugee camp. She has no access to clean water, nutritious food, or medical care. She often gets sick and feels hungry. What right of Priya is being violated?",
        answers: [
            { text: "The right to survival", correct: true },
            { text: "The right to identity", correct: false },
            { text: "The right to culture", correct: false },
            { text: "The right to leisure", correct: false },
        ]
    },
    {
        question: "Ali is a 11-year-old boy who lives in a country that is at war. He has seen many people die and suffer. He is scared and traumatized. He wishes he could live in peace and safety. What right of Ali is being violated?",
        answers: [
            { text: "The right to education", correct: false },
            { text: "The right to protection", correct: true },
            { text: "The right to expression", correct: false },
            { text: "The right to participation", correct: false },
        ]
    },
    {
        question: "Maria is a 8-year-old girl who lives in a slum. She has to work as a domestic helper in a rich family’s house. She has to do a lot of chores and is often mistreated. She has no time to play or study. What right of Maria is being violated?",
        answers: [
            { text: "The right to play", correct: false },
            { text: "The right to health", correct: false },
            { text: "The right to equality", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "Kevin is a 7-year-old boy who lives in an orphanage. He does not know who his parents are or where he was born. He has no birth certificate or any other document that proves his identity. What right of Kevin is being violated?",
        answers: [
            { text: "The right to survival", correct: false },
            { text: "The right to privacy", correct: false },
            { text: "The right to culture", correct: false },
            { text: "The right to identity", correct: true },
        ]
    },
    {
        question: "Lila is a 6-year-old girl who lives in a remote village. She belongs to a minority ethnic group that has a different language, religion, and customs from the majority. She is often discriminated and bullied by others. What right of Lila is being violated?",
        answers: [
            { text: "The right to equality", correct: false },
            { text: "The right to culture", correct: false },
            { text: "The right to expression", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "Ben is a 13-year-old boy who lives in a foster home. He has been moved from one family to another several times. He feels lonely and insecure. He wishes he could have a stable and loving family. What right of Ben is being violated?",
        answers: [
            { text: "The right to health", correct: false },
            { text: "The right to family", correct: true },
            { text: "The right to participation", correct: false },
            { text: "The right to protection", correct: false },
        ]
    },
    {
        question: "Sara is a 14-year-old girl who lives in a country that does not allow girls to go to school. She is very smart and curious. She wants to learn and pursue her dreams. What right of Sara is being violated?",
        answers: [
            { text: "The right to education", correct: false },
            { text: "The right to equality", correct: false },
            { text: "The right to expression", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "Leo is a 15-year-old boy who lives in a dictatorship. He has no freedom of speech or assembly. He cannot express his opinions or protest against injustice. He is afraid of being arrested or tortured. What right of Leo is being violated?",
        answers: [
            { text: "The right to expression", correct: false },
            { text: "The right to participation", correct: false },
            { text: "The right to protection", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "Mia is a 16-year-old girl who lives in a country that practices child marriage. She is forced to marry a man who is much older than her. She does not love him or consent to the marriage. She wants to continue her studies and choose her own partner. What right of Mia is being violated?",
        answers: [
            { text: "The right to equality", correct: false },
            { text: "The right to consent", correct: false },
            { text: "The right to education", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "Noah is a 17-year-old boy who lives in a country that has a high rate of child labor. He has to work in a factory for long hours and low wages. He is exposed to dangerous chemicals and machinery. He suffers from fatigue and injuries. What right of Noah is being violated?",
        answers: [
            { text: "The right to play", correct: false },
            { text: "The right to health", correct: false },
            { text: "The right to protection", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "What is the right that allows children to have a name and a nationality?",
        answers: [
            { text: "The right to health", correct: false },
            { text: "The right to play", correct: false },
            { text: "The right to family", correct: false },
            { text: "The right to identity", correct: true },
        ]
    },
    {
        question: "What is the right that allows children to have access to clean water, nutritious food, and medical care?",
        answers: [
            { text: "The right to participation", correct: false },
            { text: "The right to consent", correct: false },
            { text: "The right to expression", correct: false },
            { text: "The right to equality", correct: true },
        ]
    },
    {
        question: "What is the right that allows children to have a say in decisions that affect them and to be heard by adults?",
        answers: [
            { text: "The right to consent", correct: true },
            { text: "The right to information", correct: false },
            { text: "The right to expression", correct: false },
            { text: "The right to participation", correct: false },
        ]
    },
    {
        question: "What is the right that allows children to have access to quality education and learning opportunities?",
        answers: [
            { text: "The right to play", correct: false },
            { text: "The right to education", correct: true },
            { text: "The right to culture", correct: false },
            { text: "The right to leisure", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const closeButton = document.getElementById("close-btn");

let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    selectedQuestions = getRandomQuestions();
    showQuestion();
}

function getRandomQuestions() {
    let randomQuestions = [];
    for (let i = 0; i < 4; i++) {
        let randomIndex = Math.floor(Math.random() * questions.length);
        randomQuestions.push(questions[randomIndex]);
        questions.splice(randomIndex, 1);
    }
    return randomQuestions;
}

function showQuestion() {
    resetState();
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${selectedQuestions.length} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
};

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < selectedQuestions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

closeButton.addEventListener("click", () => {
    submit(score);
    closePopup();
})

startQuiz();





////////////////////////////////////////////////////////////////


cardGenerator();