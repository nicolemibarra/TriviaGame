const start = document.getElementById("start"); 
const trivia = document.getElementById("trivia"); 
const question = document.getElementById("question");  
const questionImage = document.getElementById("questionImage"); 
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B"); 
const choiceC = document.getElementById("C"); 
const counter = document.getElementById("counter"); 
const timeGauge = document.getElementById("timeGauge");    
const scoreDiv = document.getElementById("score"); 

let questions = [
    {
        question : "The name Jeep originated from...",
        imgSrc: "./assets/images/logo.jpeg",
        choiceA : "a last name of a Army Commander.",
        choiceB : "'GP' for General Purpose.",
        choiceC : "a character from the cartoon Popeye.",
        correct : "B",
    },{
        question : "One of the Wrangler models is named for what famous trail?",
        imgSrc : "./assets/images/rubicon.jpeg",
        choiceA : "Moab",
        choiceB : "Mojave",
        choiceC : "Rubicon",
        correct : "C",
    },{
        question : "The seven slots in the grill represent the number of...",
        imgSrc : "./assets/images/grill.jpeg",
        choiceA : "continents in the World.",
        choiceB : "day in a week.",
        choiceC : "the basic colors in a spectrum.",
        correct : "A", 
    },{
        question : "When Jeeps Wranglers pass on the road the drivers will...",
        imgSrc : "./assets/images/wave.jpeg",
        choiceA : "flash high beams.",
        choiceB : "Jeep wave.",
        choiceC : "Honk",
        correct : "B",
    }        
];

const lastQuestion = question.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 30;
const gaugeWidth = 100;
const gaugeUnit = gaugeWidth/questionTime;
let TIMER;
let score = 0;

function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    questionImage.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startTrivia);

function startTrivia(){
    start.style.display = "none";
    instructions.style.display = "none";
    renderQuestion();
    trivia.style.display = "block";
    renderCounter();
    TIMER = setInterval(renderCounter,1000);
}

function renderCounter(){
    if (count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        answerIsIncorrect();
        if(runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestions();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

function checkAnswer(answer){
    if (answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsIncorrect();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestions();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}

function scoreRender(){
    scoreDiv.style.display = "block";

    const scorePercent = Math.round(100 * score/questions.length);

    let image = (scorePercent >= 80) ? "image/80.jpeg." :
            (scorePercent >= 60) ? "image/60.jpeg." :
            (scorePercent >= 40) ? "image/40.jpeg." :
            (scorePercent >= 20) ? "image/20.jpeg." : 
            "image/0.jpeg";

    scoreDiv.innerHTML = "<img src="+ image +">";
    scoreDiv.innerHTML += "<p>"+ scorePercent +"%</p>";
}           
