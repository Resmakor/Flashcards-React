import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [example, setExample] = useState('');
  // Dalsza część kodu
  const fetchCards = (file) => {
    fetch(file)
      .then((response) => response.json())
      .then((data) => {
        setCards(data);
        setExample(''); // Reset example when new cards are loaded
      })
      .catch((error) => {
        window.alert('Error loading flashcards: ' + error);
        window.location.reload(); // Reload the page on error
      });
  };

  useEffect(() => {
    // Fetch flashcards.json by default
    fetchCards('/flashcards.json');
  }, []);

  const handleCardClick = () => {
    setFlipped(!flipped);
    setExample('');
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
      setExample('');
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
        let definition = 'No definition found';
        for (const meaning of data) {
          if (
            meaning.meanings &&
            meaning.meanings.length > 0 &&
            meaning.meanings[0].definitions &&
            meaning.meanings[0].definitions.length > 0 &&
            meaning.meanings[0].definitions[0].definition
          ) {
            definition = meaning.meanings[0].definitions[0].definition;
            break;
          }
        }
        setExample(definition);
      })
      .catch((error) => {
        window.alert('Error fetching definition for ' + word + ': ' + error);
        setExample('');
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        try {
          const jsonData = JSON.parse(content);
          if (!Array.isArray(jsonData)) {
            window.alert('Plik JSON powinien być listą.');
            window.location.reload();
          }
          const isValid = jsonData.every(
            (card) => card.front && card.back
          );
          if (!isValid) {
            window.alert('Niepoprawny format danych. Każdy obiekt powinien mieć pola front i back.');
            window.location.reload();
          }
          setCards(jsonData);
          setCurrentCardIndex(0);
          setExample(''); // Reset example when new cards are loaded
        } catch (error) {
          window.alert('Error parsing JSON file: ' + error.message);
          window.location.reload();
        }
      };
      reader.readAsText(file);
    }
  };



  return (
    <div className="app">
      <label className="custom-file-input">
        <input type="file" accept=".json" onChange={handleFileChange} />
        <div className="file-input-button">Wybierz plik</div>
      </label>
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
        <button
          className="example-button"
          onClick={() =>
            handleGetExample(cards[currentCardIndex].front)
          }
        >
          <span>Definicja spokrewniona</span>
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
