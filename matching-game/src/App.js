import React, { useState, useEffect } from 'react';
import './App.css';
import { cardArray } from './images';
import Background from './Background';
import Fireworks from './Fireworks';

// Constants for the default image and firework colors
const backSrc = 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/74/74a89444d616571954a1e84780e94619ce79e848_full.jpg';
const fireworkColors = ['#FF5733', '#33FF57', '#5733FF', '#FF33C7', '#33FFF4'];

function App() {
  // State variables to manage the game
  const [cards, setCards] = useState([]);
  const [cardsChosen, setCardsChosen] = useState([]);
  const [cardsChosenId, setCardsChosenId] = useState([]);
  const [cardsWon, setCardsWon] = useState([]);
  const [difficultyLevel, setDifficultyLevel] = useState(3);
  const [gridClass, setGridClass] = useState('easy');

  // Create a card object
  const createCard = (imgUrl, index) => {
    return {
      img: imgUrl,
      isFlipped: false,
      id: index,
    };
  };

  // Options for different difficulty levels
  const difficultyOptions = [
    { value: 3, label: 'Easy' },
    { value: 6, label: 'Medium' },
    { value: 9, label: 'Hard' },
    { value: 12, label: 'Advanced' },
  ];

  // Create a new game board based on the current difficulty level
  const createBoard = () => {
    const selectedCards = cardArray.slice(0, difficultyLevel);
    const duplicatedCards = [...selectedCards, ...selectedCards];
    duplicatedCards.sort(() => 0.5 - Math.random());
    const newCards = duplicatedCards.map((card, index) => createCard(card.img, index));
    setCards(newCards);
    setCardsChosen([]);
    setCardsChosenId([]);
    setCardsWon([]);

    // Determine the grid class based on the difficulty level
    let newGridClass = 'easy';
    if (difficultyLevel === 6) {
      newGridClass = 'medium';
    } else if (difficultyLevel === 9) {
      newGridClass = 'hard';
    } else if (difficultyLevel === 12) {
      newGridClass = 'advanced';
    }
    setGridClass(newGridClass);
  };

  useEffect(() => {
    createBoard();
  }, [difficultyLevel]);

  // Flip a card when clicked
  const flipCard = (cardId) => {
    if (!cards[cardId].isFlipped && cardsChosen.length < 2) {
      const updatedCards = [...cards];
      updatedCards[cardId].isFlipped = true;
      setCards(updatedCards);
      setCardsChosen([...cardsChosen, updatedCards[cardId]]);
      setCardsChosenId([...cardsChosenId, cardId]);
    }
  };

  useEffect(() => {
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }, [cardsChosen]);

  // Check if the chosen cards form a match
  const checkForMatch = () => {
    const [optionOneId, optionTwoId] = cardsChosenId;
    if (cardsChosen[0].img === cardsChosen[1].img) {
      setCardsWon([...cardsWon, ...cardsChosen]);
    } else {
      const updatedCards = [...cards];
      updatedCards[optionOneId].isFlipped = false;
      updatedCards[optionTwoId].isFlipped = false;
      setCards(updatedCards);
    }
    setCardsChosen([]);
    setCardsChosenId([]);
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <h2>Test your Memory</h2>
        <h5 className={`score ${cardsChosen.length === 2 && cardsChosen[0].img === cardsChosen[1].img ? 'matched' : ''}`}>
          Score: {cardsWon.length / 2}
        </h5>
        <div className="grid-top">
          <label className="label-spacing">Select Difficulty Level: </label>
          <select className="select-spacing" value={difficultyLevel} onChange={(e) => setDifficultyLevel(parseInt(e.target.value))}>
            {difficultyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className={`grid ${gridClass}`}>
          {cards.map((card, index) => (
            <img
              key={index}
              src={card.isFlipped ? card.img : backSrc}
              alt="Card"
              data-id={index}
              onClick={() => flipCard(index)}
            />
          ))}
        </div>
        {cardsWon.length / 2 === difficultyLevel && (
          <div>
            <p>Congratulations! You found them all!</p>
            <Fireworks colors={fireworkColors} />
          </div>
        )}
      </div>
      {cardsWon.length / 2 === difficultyLevel && <Fireworks colors={fireworkColors} />}
      <Background />
    </div>
  );
}

export default App;
