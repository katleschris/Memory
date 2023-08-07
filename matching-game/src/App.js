import React, { useState, useEffect } from 'react';
import './App.css';
import { cardArray } from './images';

function App() {
  const [cardsChosen, setCardsChosen] = useState([]);
  const [cardsChosenId, setCardsChosenId] = useState([]);
  const [cardsWon, setCardsWon] = useState([]);
  const [difficultyLevel, setDifficultyLevel] = useState(6); // Default difficulty

  useEffect(() => {
    createBoard();
  }, [difficultyLevel]); // Re-create board on difficulty change

  const createBoard = () => {
    const selectedCards = cardArray.slice(0, difficultyLevel);
    const duplicatedCards = [...selectedCards, ...selectedCards]; // Duplicate cards for pairs
    duplicatedCards.sort(() => 0.5 - Math.random());
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
    const [optionOneId, optionTwoId] = cardsChosenId;
    if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match');
      setCardsWon([...cardsWon, ...cardsChosen]);
    } else {
      alert('Sorry, try again');
    }
    setCardsChosen([]);
    setCardsChosenId([]);
  };

  const difficultyOptions = [
    { value: 6, label: 'Easy' },
    { value: 12, label: 'Medium' },
    { value: 18, label: 'Hard' },
    { value: 24, label: 'Advanced' },
  ];

  return (
    <div className="App">
      <h3>Score: {cardsWon.length}</h3>
      <div className="grid">
        <label>Select Difficulty Level: </label>
        <select
          value={difficultyLevel}
          onChange={(e) => setDifficultyLevel(parseInt(e.target.value))}
        >
          {difficultyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid">
        {cardArray.slice(0, difficultyLevel).map((card, index) => (
          <img
            key={index}
            src={card.img}
            alt="Card"
            data-id={index}
            onClick={() => flipCard(index)}
          />
        ))}
      </div>
      {cardsWon.length === difficultyLevel / 2 && (
        <div>
          <p>Congratulations! You won them all!</p>
        </div>
      )}
    </div>
  );
}

export default App;
