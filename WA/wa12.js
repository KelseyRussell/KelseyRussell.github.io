const endpoint = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?';

const newQuote = document.querySelector('#js-new-quote');
newQuote.addEventListener('click', getQuote);

const answer = document.querySelector('#js-tweet');
answer.addEventListener('click', displayAnswer);

let answerText = document.querySelector('#js-answer-text');
let answered = '';

function getQuote() {
    const loading = document.querySelector('#loading');
    loading.style.display = 'block'; 

    $.ajax({
        url: endpoint,
        dataType: "jsonp",
        success: function(response) {
            displayQuote(response.quoteText, response.quoteAuthor);
            answered = response.quoteAuthor || 'Unknown';
            answerText.textContent = '';
            loading.style.display = 'none'; 
        },
        error: function() {
            alert('Failed to fetch new quote');
            loading.style.display = 'none'; 
        }
    });
}

function displayQuote(quote, author) {
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = `"${quote}"`;
}

function displayAnswer() {
    answerText.textContent = answered;
}

getQuote();