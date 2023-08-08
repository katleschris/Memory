import React, { useState, useEffect } from 'react';
import './App.css';
import { cardArray } from './images';

function App() {
  const [cards, setCards] = useState([]);
  const [cardsChosen, setCardsChosen] = useState([]);
  const [cardsChosenId, setCardsChosenId] = useState([]);
  const [cardsWon, setCardsWon] = useState([]);
  const [difficultyLevel, setDifficultyLevel] = useState(6); // Default difficulty
  const backSrc = 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/74/74a89444d616571954a1e84780e94619ce79e848_full.jpg';

  useEffect(() => {
    createBoard();
  }, [difficultyLevel]); // Re-create board on difficulty change

  const createCard = (imgUrl, index) => {
    return {
      img: imgUrl,
      isFlipped: false,
      id: index,
    };
  };

  const createBoard = () => {
    const selectedCards = cardArray.slice(0, difficultyLevel);
    const duplicatedCards = [...selectedCards, ...selectedCards]; // Duplicate cards for pairs
    duplicatedCards.sort(() => 0.5 - Math.random());
    const newCards = duplicatedCards.map((card, index) => createCard(card.img, index));
    setCards(newCards);
    setCardsChosen([]);
    setCardsChosenId([]);
    setCardsWon([]);
  };

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

  const checkForMatch = () => {
    const [optionOneId, optionTwoId] = cardsChosenId;
    if (cardsChosen[0].img === cardsChosen[1].img) {
      alert('You found a match');
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
      {cardsWon.length === difficultyLevel && (
        <div>
          <p>Congratulations! You found them all!</p>
        </div>
      )}
    </div>
  );
}

export default App;

