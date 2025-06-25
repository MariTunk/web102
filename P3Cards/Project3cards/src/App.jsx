import React, { useState } from "react";
import "./App.css";

const cardData = [
  { question: "Who was the first Caliph after Prophet Muhammad (ﷺ)?", answer: "Abu Bakr as-Siddiq (RA)" },
  { question: "What year was the Hijrah (migration to Medina)?", answer: "622 CE" },
  { question: "What is the name of the treaty between Prophet Muhammad (ﷺ) and the Quraysh?", answer: "Treaty of Hudaybiyyah" },
  { question: "Which battle was the first in Islam?", answer: "The Battle of Badr" },
  { question: "What are the 5 pillars of islam?", answer: "Shahada (declaration of faith), Salat (prayer five times a day), Zakat (charity), Sawm (fasting during Ramadan), and Hajj (pilgrimage to Mecca)" },
  { question: "Who was the first person to accept Islam?", answer: "Khadijah bint Khuwaylid (RA)" },
  { question: "Who compiled the Quran into a single book after the Prophet’s death?", answer: "Caliph Abu Bakr (RA), with Zayd ibn Thabit (RA)" },
  { question: "Where did the Prophet (ﷺ) receive his first revelation?", answer: "Cave Hira, near Mecca" },
  { question: "What is the name of the Prophet’s last sermon called?", answer: "Khutbah al-Wada (Farewell Sermon)" },
  { question: "Where is the Prophet Muhammad (ﷺ) buried?", answer: "In Masjid an-Nabawi, Medina" },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [flipped, setFlipped] = useState(false);


  const currentCard = cardData[currentIndex];

  const handleFlip = () => setFlipped(!flipped);

  const handleInputChange = (e) => {
    setUserGuess(e.target.value);
    setFeedback(null); 
  };

  const handleSubmit = () => {
    if (userGuess.trim().toLowerCase() === currentCard.answer.toLowerCase()) {
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
    }
  };

  const nextCard = () => {
    if (currentIndex < cardData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserGuess("");
      setFeedback(null);
      setFlipped(false);

     
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserGuess("");
      setFeedback(null);
      setFlipped(false);
   
    }

  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>🕌 Islamic Flashcards</h1>
        <p>Test your knowledge and learn important historical facts.</p>
      </div>

      <div className="flashcard" onClick={handleFlip}>
        <p>{flipped ? currentCard.answer : currentCard.question}</p>
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter your guess"
          value={userGuess}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Submit</button>

        {feedback === "correct" && <p className="feedback correct"> Correct!</p>}
        {feedback === "incorrect" && <p className="feedback incorrect"> Try again</p>}
      </div>

      <div className="navigation-buttons">
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className={currentIndex === 0 ? "disabled" : ""}
        >
          ⬅️ Back
        </button>

        <button
          onClick={nextCard}
          disabled={currentIndex === cardData.length - 1}
          className={currentIndex === cardData.length - 1 ? "disabled" : ""}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
}

export default App;
