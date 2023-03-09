//VARIABLES

const answer = document.querySelector('.btn');
const nextQuestion = document.querySelector("#next-question")
const anime = document.querySelector('.anime');
const character = document.querySelector('.character');
const lifeLine = document.querySelector('#lives');
const question = document.querySelector('.question');
const score = document.querySelector('#score');
const url = 'https://animechan.vercel.app/api/random'
let guess = ""
let correctAnswer = ""
let toAsk = ""
let animeObj = {}
let scoreCard = 0
let lifeCard = 5




//FUNCTIONS

async function getQuote() {
   if(anime.value === "" || character.value === ""){
    checkAnswer("", animeObj.character)
   }

  await startQuote()
  question.innerText = animeObj.quote
  const dataArray = [animeObj.anime, animeObj.character] 
  console.log(animeObj)


  const random = Math.floor(Math.random() * 2);
  console.log(random)
  
  if (dataArray[random] === animeObj.anime) {
    anime.value = animeObj.anime;
    character.value = ""
    toAsk = "character"

  } else {
    character.value = animeObj.character;
    anime.value = ""
    toAsk = "anime"
  }

}




// EVENTLISTENERS
nextQuestion.addEventListener('click', getQuote);
answer.addEventListener("click", playerGuess)
document.addEventListener("DOMContentLoaded", onLoad)


async function startQuote() {
  const rawData = await fetch(url);
  const data = await rawData.json();
  animeObj = data
}

async function onLoad(){
    await startQuote()
    question.innerText = animeObj.quote
    anime.value = animeObj.anime
    character.value = animeObj.character
}

function playerGuess(){
    if(toAsk === "character"){
        guess = character.value
        correctAnswer = animeObj.character
    } else{
        guess = anime.value
        correctAnswer = animeObj.anime
    }

    if (guess === ""){
        getQuote()

    } else{
        checkAnswer(guess, correctAnswer)
    }
        
}

function checkAnswer(guess, answer){
    let formatGuess = guess.toLowerCase()
    let formatAnswer = answer.toLowerCase()
    console.log(formatGuess, formatAnswer)

    if(formatGuess === formatAnswer){
        scoreCard++
    } else {
        if(scoreCard > 0){
            scoreCard--
        }
        
        lifeCard--
        
    }

    score.innerText = scoreCard
    lifeLine.innerText = lifeCard
}