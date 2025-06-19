import { useState } from 'react'
import './App.css'

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
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => setFlipped(!flipped);

  const nextCard = () => {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    setCurrentCard(randomIndex);
    setFlipped(false);
  
  };

  return (
    <>
      <div className="app-container">
      <div className="header">
        <h1>🕌 Islamic History Flashcards</h1>
        <p>A collection of must-know facts every Muslim should remember.</p>
  
      </div>

      <div className="flashcard" onClick={flipCard}>
        <p>{flipped ? cardData[currentCard].answer : cardData[currentCard].question}</p>
      </div>

      <button onClick={nextCard}>Next Card</button>
    </div>
  
    </>
  )
}

export default App
