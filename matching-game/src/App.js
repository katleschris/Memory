/**
 * React component representing a memory matching game.
 *
 * @component
 */
import React, { useState, useEffect } from 'react';
import './App.css';
import { cardArray } from './images';
import Background from './Background';

/**
 * Represents the main application component.
 *
 * @returns {JSX.Element} The JSX element representing the App component.
 */
function App() {
  const [cards, setCards] = useState([]); // Array of card objects
  const [cardsChosen, setCardsChosen] = useState([]); // Array of chosen cards
  const [cardsChosenId, setCardsChosenId] = useState([]); // Array of IDs of chosen cards
  const [cardsWon, setCardsWon] = useState([]); // Array of cards that have been matched
  const [difficultyLevel, setDifficultyLevel] = useState(3); // Current difficulty level
  const [gridClass, setGridClass] = useState('easy'); // Current difficulty class
  const [scoreAnimationClass, setScoreAnimationClass] = useState('');

  const backSrc = 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/74/74a89444d616571954a1e84780e94619ce79e848_full.jpg';

  /**
   * Create a card object.
   *
   * @param {string} imgUrl - The URL of the card image.
   * @param {number} index - The unique identifier for the card.
   * @returns {Object} The card object.
   */
  const createCard = (imgUrl, index) => {
    return {
      img: imgUrl,
      isFlipped: false,
      id: index,
    };
  };

  /**
   * Create a new game board based on the current difficulty level.
   */
  const createBoard = () => {
    const selectedCards = cardArray.slice(0, difficultyLevel);
    const duplicatedCards = [...selectedCards, ...selectedCards]; // Duplicate cards for pairs
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
  }, [difficultyLevel]); // Re-create board on difficulty change

  /**
   * Flip a card when clicked.
   *
   * @param {number} cardId - The ID of the card being flipped.
   */
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

  /**
   * Check if the chosen cards form a match.
   */
  const checkForMatch = () => {
    const [optionOneId, optionTwoId] = cardsChosenId;
    if (cardsChosen[0].img === cardsChosen[1].img) {
      // alert('You found a match');
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
    { value: 3, label: 'Easy' },
    { value: 6, label: 'Medium' },
    { value: 9, label: 'Hard' },
    { value: 12, label: 'Advanced' },
  ];
  
   // Function to trigger the score animation
  useEffect(() => {
    const triggerScoreAnimation = () => {
      setScoreAnimationClass('score-animation');

      // Reset the animation class after a brief delay
      setTimeout(() => {
        setScoreAnimationClass('');
      }, 100); // Adjust the delay as needed
    };

    // Call the triggerScoreAnimation function whenever cardsWon.length changes
    triggerScoreAnimation();
  }, [cardsWon.length]); 

  return (
    <div className="app-container">
      <div className="app-content">
        <h1>Test your Memory</h1>
        <h3 className={`score ${scoreAnimationClass}`}>Score: {cardsWon.length / 2}</h3>
        <div className="grid-top">
          <label className="label-spacing">Select Difficulty Level: </label>
          <select  className="select-spacing" 
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
      {cardsWon.length/2 === difficultyLevel && (
        <div>
          <p>Congratulations! You found them all!</p>
        </div>
      )}
      
    </div>
    <Background />
    </div>
    
  );
}

export default App;


