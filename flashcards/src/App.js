import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [example, setExample] = useState('');

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
    setExample('');
  };

  const handlePrevCard = () => {
    setFlipped(false);
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
    setExample('');
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

  const handleGetExample = (word) => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response) => response.json())
      .then((data) => {
        let exampleUsage = 'No example found';
        for (const meaning of data[0].meanings) {
          if (meaning.definitions && meaning.definitions.length > 0 && meaning.definitions[0].example) {
            exampleUsage = meaning.definitions[0].example;
            break;
          }
        }
        setExample(exampleUsage);
      })
      .catch((error) => {
        console.error(`Error fetching example for ${word}:`, error);
        setExample('Error fetching example');
      });
  };

  return (
    <div className="app">
      <div className="title-wrapper">
        <h1 className="title">Czas na naukę... 📚</h1>
      </div>

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

      <div className="example-wrapper">
        <button className="example-button" onClick={() => handleGetExample(cards[currentCardIndex].front)}>
          <FontAwesomeIcon icon={faArrowRight} />
          <span>Get example </span>
        </button>
        {example && (
          <div className="example">
            <p>{example}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
