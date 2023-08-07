import React, { useState, useEffect } from 'react';
import './App.css';
import { cardArray } from './images';

function App() {
  const [cardsChosen, setCardsChosen] = useState([]);
  const [cardsChosenId, setCardsChosenId] = useState([]);
  const [cardsWon, setCardsWon] = useState([]);
  const [resultDisplay, setResultDisplay] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState(4); // Default difficulty

  useEffect(() => {
    createBoard();
  }, [difficultyLevel]); // Re-create board on difficulty change

  const createBoard = () => {
    cardArray.sort(() => 0.5 - Math.random());
    setCardsChosen([]);
    setCardsChosenId([]);
    setCardsWon([]);
  };

  const flipCard = (cardId) => {
    if (!cardsChosenId.includes(cardId) && cardsChosen.length < 2) {
      setCardsChosen([...cardsChosen, cardArray[cardId].name]);
      setCardsChosenId([...cardsChosenId, cardId]);
    }
  };

  useEffect(() => {
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }, [cardsChosen]);

  const checkForMatch = () => {
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match');
      setCardsWon([...cardsWon, cardsChosen]);
    } else {
      alert('Sorry, try again');
    }
    setCardsChosen([]);
    setCardsChosenId([]);
  };

  // Define the difficulty class based on the selected difficulty level
  let difficultyClass;
  if (difficultyLevel === 4) {
    difficultyClass = 'easy';
  } else if (difficultyLevel === 6) {
    difficultyClass = 'medium';
  } else if (difficultyLevel === 8) {
    difficultyClass = 'hard';
  } else if (difficultyLevel === 12) {
    difficultyClass = 'advanced';
  }


  return (
    <div className="App">
      <h3>Score: {cardsWon.length}</h3>
      <div className={`grid ${difficultyClass}`}>
        <label>Select Difficulty Level: </label>
        <select value={difficultyLevel} onChange={(e) => setDifficultyLevel(parseInt(e.target.value))}>
          <option value={4}>Easy</option>
          <option value={6}>Medium</option>
          <option value={8}>Hard</option>
          <option value={12}>Advanced</option>
        </select>
      </div>
      <div className='grid'>
        {cardArray.slice(0, difficultyLevel).map((card, index) => (
          <img
            key={index}
            src={card.img}
            alt='Card'
            data-id={index}
            onClick={() => flipCard(index)}
          />
        ))}
      </div>
      {cardsWon.length === cardArray.slice(0, difficultyLevel).length / 2 && (
        <div>
          <p>Congratulations! You won them all!</p>
        </div>
      )}
    </div>
  );
}

export default App;
