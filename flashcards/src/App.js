// App.js

import React, { useState } from 'react';
import './App.css'; // Importujemy plik z naszymi stylami
import LoginForm from './LoginForm'; // Importujemy komponent formularza logowania

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false); // Stan do kontrolowania wyświetlania formularza logowania

  // Funkcja do wyświetlania formularza po kliknięciu przycisku "Start"
  const handleStartClick = () => {
    setShowLoginForm(true);
  };

  // Funkcja obsługująca logowanie użytkownika
  const handleLogin = (formData) => {
    // Tutaj możemy wywołać odpowiedni endpoint na serwerze, aby przetworzyć dane logowania użytkownika
    console.log('Dane logowania:', formData);
  };

  // Funkcja przechodzenia do formularza rejestracji
  const switchToExtendedRegistration = () => {
    // Tutaj możemy wyświetlić formularz rejestracji
    console.log('Przełączanie do formularza rejestracji...');
  };

  return (
    <div className="container">
      <h1>{showLoginForm ? "Zaloguj się 🔑" : "Witaj w aplikacji do nauki słówek! 📙"}</h1>
      {showLoginForm ? (
        <LoginForm onLogin={handleLogin} switchToExtendedRegistration={switchToExtendedRegistration} />
      ) : (
        <button className="start-button" onClick={handleStartClick}>Start</button>
      )}
    </div>
  );
}

export default App;
