import './App.css';
import react from 'react';
import {cardArray} from './images'

function App() {
  const grid = document.querySelector('.grid');
  var cardsChosen = [];
  var cardsChosenId = [];

  function createBoard() {
    
    for (let i = 0; i < cardArray.length; i++) {
      var card = document.createElement('img');
      card.setAttribute('src', 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/003967ba0a28186d4c94b364a63e8647f25d39e3_full.jpg')
      card.setAttribute('data-id', i)
      grid.appendChild(card);

    }
  }
  createBoard();

  function flipCard(){
    var cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length ==2){
      setTimeout(checkForMatch, 500)
    }
  }

 

  return (
    <div className="App">
     <h3>Score:<span id='result'></span></h3> 
     <div className='grid'></div>
    </div>
  );
}

export default App;
