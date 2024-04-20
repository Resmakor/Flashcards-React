import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    fetch('/flashcards.json')
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((error) => console.error('Error loading flashcards:', error));
  }, []);

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  const handleNextCard = () => {
    setFlipped(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevCard = () => {
    setFlipped(false);
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  const handleFlipCard = () => {
    setFlipped(!flipped);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'ArrowRight') {
      handleNextCard();
    } else if (event.key === 'ArrowLeft') {
      handlePrevCard();
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      handleFlipCard();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  return (
    <div className="app">
      <h1>Nauka słówek 📙</h1>
      <div className="flashcard-container">
        {cards.length > 0 && (
          <div className="flashcard-wrapper">
            <div
              className={`flashcard ${flipped ? 'flipped' : ''}`}
              onClick={handleCardClick}
            >
              <div className="front">
                <span>{cards[currentCardIndex].front}</span>
              </div>
              <div className="back">
                <span>{cards[currentCardIndex].back}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {cards.length > 0 && (
        <div className="buttons">
          <div className="button-wrapper">
            <button className="prev-button" onClick={handlePrevCard}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="flashcard-info">
              {`${currentCardIndex + 1}/${cards.length}`}
            </div>
            <button className="next-button" onClick={handleNextCard}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
