const actions = Array.from(document.querySelectorAll('.action-button'));
const fontCol = ['rgba(19, 133, 255, 1)', 'rgba(184, 0, 101, 1)', 'rgba(54, 168, 1, 1)'];
const bgCol = ['rgba(19, 133, 255, .3)', 'rgba(184, 0, 101, .3)', 'rgba(54, 168, 1, .3)'];
const choice = ['ROCK', 'PAPA', 'SZAS'];
var attached = false;

/**
 * Get user and comp choices
 * @return {string} User and comp choice 
*/
var getChoices = function () {
  var user = document.querySelector('#user-action').textContent;
  var comp = document.querySelector('#comp-action').textContent;
 return [user, comp];
}

/**
* Random number generator
* @return {int} - random number between 1 and 3
*/
var getRandom = function()
 {
  return Math.floor(Math.random() * (Math.floor(4)-Math.ceil(1)));
 }
  
/**
* Get computer choice
* @return {string} choice - Computer choice
*/
var computerPlay = function ()
 {
  return choice[getRandom()]
 }

/**
* Get winner 
* @return {Boolean} youWin - True for user win, else false or undefined for draw
*/
var getWinner = function(choices) 
 { 
  // unpack choices
  let user = choices[0];
  let comp = choices[1];
  // Check for matching responses
  var youWin = comp === user ? undefined : false;
  if ((user === 'ROCK' && comp === 'SZAS')
   || (user === 'SZAS' && comp === 'PAPA')
   || (user === 'PAPA' && comp === 'ROCK'))
   youWin = true;
   return youWin
 }

var setArenaText = function(name) {
 // set Player response
 document.querySelector('#user-action').textContent = name;
 document.querySelector('#user-action').style.color = fontCol[choice.indexOf(name)];
 // Get/Set computer response
 compChoice = computerPlay();
 document.querySelector('#comp-action').textContent=compChoice;
 document.querySelector('#comp-action').style.color = fontCol[choice.indexOf(compChoice)];
  setScore();
 if (endGame().length > 0) {
   alert(endGame());
  resetGame()
 }
}

var resetGame = function() {
 disableButton('.play-button', false);
 // Reset scores
 document.querySelector('#user-score').textContent = 0
 document.querySelector('#comp-score').textContent = 0
 for (let i=0; i<actions.length; i++)
 {
  actions[i].style.color = 'black';
  actions[i].style.backgroundColor = 'white';
  actions[i].style.borderColor = 'lightgrey';
  actions[i].style.borderStyle = '1px';  
 }
}


var setScore = function() {
 let user = document.querySelector('#user-score'); 
 let comp = document.querySelector('#comp-score');
 winner = getWinner(getChoices());
 if (winner === true) {
  user.textContent = Number(user.textContent) + 1 
 } else if (winner === false) {
  comp.textContent = Number(comp.textContent) + 1;
  }
}

var endGame = function() {
 userScore = Number(document.querySelector('#user-score').textContent);
 compScore = Number(document.querySelector('#comp-score').textContent);
  let msg = ''
 if (compScore == 5) {
  msg = "You Lose";
 } else if (userScore == 5) {
    msg = "You Win"; 
 }
 return msg;
}

var disableButton = function (forClass, bool) {
 let col = '';
 bool ? col = 'grey' : col = 'green';
 document.querySelector(forClass).style.color = col; 
  document.querySelector(forClass).disabled = bool; 
}

var play = function () {
 for (let i=0; i<actions.length; i++)
 {
  actions[i].style.color = fontCol[i];
  actions[i].style.backgroundColor = bgCol[i];
  actions[i].style.borderColor = bgCol[i];
  actions[i].style.borderStyle = '2px';
  if (!attached) {
   actions[i].addEventListener('click', (e) => {setArenaText(e.target.name); });
  }
 }
 disableButton(".play-button", true);
 attached = true;
}

var begin = function () {
 document.querySelector('.play-button').addEventListener('click', (e) => {play();})
}

begin()


