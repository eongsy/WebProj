const quotes = [
    {
    quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
},
{
    quote: "Life is either a daring adventure or nothing at all.",
    author: "Helen Keller",
},
{
    quote: "Keep your eyes on the stars and your feet on the ground.",
    author: "Theodore Roosevelt",
},
{
    quote : "Despite the forecast, live like it’s spring.",
    author : "Lilly Pulitzer",
},
{
    quote : "I never dreamed about success, I worked for it.",
    author : "Estee Lauder",
},
{
    quote : "Do not try to be original, just try to be good.",
    author : "Paul Rand",
},
{
    quote : "Do not be afraid to give up the good to go for the great",
    author : "John D. Rockefeller",
},
{
    quote : "All progress takes place outside the comfort zone.",
    author : "Michael John Bobak",
},
{
    quote : "Success is going from failure to failure without a loss of enthusiasm.",
    author : "Winston Churchill",
},
{
    quote : "If you would be loved, love and be lovable.",
    author : "Benjamin Franklin",
},
];

const quote = document.querySelector("#quotes span:first-child");
const author = document.querySelector("#quotes span:last-child");
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;