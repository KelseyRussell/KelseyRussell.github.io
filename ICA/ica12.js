const endpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion'

const newQuote = document.querySelector('#js-new-quote');
newQuote.addEventListener('click', getTrivia);

const answer = document.querySelector('#js-tweet').addEventListener ('click',displayAnswer);

let answerText = document.querySelector('#js-answer-text');
let answered ='';

async function getTrivia(){
    //alert('Test!');
    try{
        const response = await fetch(endpoint);
        if (!response.ok){
            throw Error(response.statusText)
        }
        const json = await response.json();
        //console.log(json)
        displayTrivia(json['question']);
        answered = json['answer'];
        answerText.textContent='';
    }
    catch(err){
        console.log(err)
        alert('failed to fetch new quote');

    }

}

function displayTrivia(quote){
    const triviatext = document.querySelector('#js-quote-text');
    triviatext.textContent = quote;

}


function displayAnswer(){
    answerText.textContent = answered;

}

getTrivia();