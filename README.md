# Flashcards React
 This project is a React-based application designed to help users study and memorize information using flashcards. The app allows users to upload their own flashcards in JSON format and navigate through them, flipping cards to reveal the answers and even fetching related definitions from an external API.
# Features
* **Upload custom flashcards:** Users can upload their own flashcards in a JSON file format.
* **Flashcard navigation:** Navigate through flashcards using previous and next buttons or keyboard arrow keys.
* **Card flipping:** Click on the flashcard to flip and view the answer.
* **Fetch Definitions:** Get related definitions from an external dictionary API.
* **Keyboard Shortcuts** Use arrow keys to navigate and flip cards.
# Getting Started
Make sure you have **Node.js** installed. 
Open project in Visual Studio Code terminal. Paste the following commands there one by one:
* npm install
* npm install --save @fortawesome/fontawesome-free
* npm install --save @fortawesome/fontawesome-svg-core
* npm install --save @fortawesome/free-solid-svg-icons
* npm install --save @fortawesome/react-fontawesome
In the terminal, type **cd flashcards** command.

Start the development server with the **npm start** command.
After starting the app, open your browser and go to **http://localhost:3000** to see the app in action.

# Usage - Uploading Flashcards
Prepare a JSON file with your flashcards. The JSON should be an array of objects, each containing front and back fields. For example:
```
[
    {
        "front": "Hello",
        "back": "Cześć"
    },
    {
        "front": "Goodbye",
        "back": "Do widzenia"
    },
    {
        "front": "Thank you",
        "back": "Dziękuję"
    }
]
```
Click on the "Choose JSON file" button and select your prepared JSON file.

# Navigating and flipping cards
* **Next nard:** Click the right arrow button or press the right arrow key.
* **Previous dard:** Click the left arrow button or press the left arrow key.
* **Flip card:** Click on the flashcard or press the up or down arrow key.

# Fetching definitions
Click the "Related definition" button to fetch a definition for the word on the front of the current flashcard. The definition will be displayed below the button if found.
# Code Overview
## Main Components
- **App component:** The main component that holds the state and logic for the flashcards, including fetching cards, navigating through them and fetching definitions.
- **Flashcard component:** A sub-component that displays the front and back of a card and handles the flip animation.
## Key Functions
- **fetchCards(file):** Loads flashcards from a provided JSON file.
- **handleCardClick():** Flips the current flashcard.
- **handleNextCard():** Moves to the next flashcard.
- **handlePrevCard()**: Moves to the previous flashcard.
- **handleGetExample(word):** Fetches a definition for a given word from the dictionary API.
- **handleFileChange(event):** Handles the uploading and parsing of the JSON file containing flashcards.
## Event Listeners
- **handleKeyPress(event):** Listens for keyboard events to navigate and flip flashcards.
# Styles
The app uses CSS for basic styling, which can be found in the App.css file. The styles include layouts for the flashcard container, buttons, and other UI elements.
# External Libraries
- **FontAwesome:** For navigation icons.
- **Dictionary API:** To fetch definitions related to the flashcard content.
# Snippets
 ![How it works](https://github.com/Resmakor/Flashcards-React/blob/main/snippets/how_it_works.gif?raw=true)`