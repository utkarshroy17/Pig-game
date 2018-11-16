var score = [0, 0];
var roundScore = 0;
var activePlayer = 0, prevDice = 0;
var winValue = 100;

document.querySelector('.dice').style.display = 'none';

function changePlayer()
{
    document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
    document.getElementById('current-' + activePlayer).textContent = roundScore;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

function winner(ele)
{
    if(event.key === 'Enter')
        alert(ele.value); 
    winValue = document.getElementById("winVal").value;
}

function refresh()
{
    roundScore = 0;
    activePlayer = 0;
    prevDice = 0;
    for(var i = 0; i<score.length; i++) 
        score[i] = 0;
    document.getElementById('score-0').textContent = score[0];
    document.getElementById('current-0').textContent = roundScore;
    document.getElementById('score-1').textContent = score[1];
    document.getElementById('current-1').textContent = roundScore;
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector(".btn-roll").disabled = false;
    document.querySelector(".btn-hold").disabled = false;
    document.querySelector('.dice').style.display = 'none';
}

function set_winner()
{
    document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
    document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
    document.querySelector(".btn-roll").disabled = true;
    document.querySelector(".btn-hold").disabled = true;
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector(".btn-roll").addEventListener('click', function() {
    
    var dice = Math.ceil(Math.random()*6);
 
    diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice' + dice + '.png';

    if(dice ===1 || prevDice === dice && dice === 6)
    {
        roundScore = 0;
        prevDice = 0;
        changePlayer();
    }  
    else
    {
        roundScore += dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
        prevDice = dice;
    }
})

document.querySelector(".btn-hold").addEventListener('click', function() {
    score[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
    winValue = document.querySelector(".winner").value;
    console.log(winValue);
    if(score[activePlayer] >= winValue)
    {
        set_winner();
    }
    else
    {
        prevDice = 0;
        roundScore = 0;        
        changePlayer();
    }    
})

document.querySelector(".btn-new").addEventListener('click', function() {
    document.querySelector('#name-' + activePlayer).textContent = 'Player ' + (activePlayer + 1) ;
    document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('winner');
    refresh();
})
