import { useState } from "react";
import "./App.css";

function OddOrEvenGame() {
  const [playerName, setPlayerName] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [userChoice, setUserChoice] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [highScores, setHighScores] = useState([]);

  const startGame = () => {
    if (playerName.trim() !== "") {
      setHasStarted(true);
    }
  };

  const handleGuess = (choice) => {
    if (round > 10) return;
  
    const number = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(number);
    setUserChoice(choice);
  
    let newScore = score;
    if ((number % 2 === 0 && choice === "Even") || (number % 2 !== 0 && choice === "Odd")) {
      setResult("You Win!");
      newScore += 10; // Increase score correctly
      setScore(newScore);
    } else {
      setResult("You Lose!");
    }
  
    if (round === 10) {
      setHighScores([...highScores, { name: playerName, score: newScore }]); // Save correct final score
    }
  
    setRound(round + 1);
  };

  const restartGame = () => {
    setScore(0);
    setRound(1);
    setResult("");
    setRandomNumber(null);
    setHasStarted(false);
    setPlayerName("");
  };

  return (
    

    <div className="game-container">
      
    {/* Header Section */}
    <header className="game-header">
      <h1>Odd or Even Game</h1>
      <button className="reset-button" onClick={() => setHighScores([])}>Reset High Scores</button>
    </header>
      
      
      <div className="game-box">
        <h1>Odd or Even Game</h1>

        {/* Show name input and Play button before starting */}
        {!hasStarted ? (
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
            <button onClick={startGame}>Play</button>
          </div>
        ) : (
          <div>
            <h2>Welcome, {playerName}!</h2>
            {round <= 10 ? (
              <div>
                <p>Round {round} of 10</p>
                <p>Guess if the number will be Odd or Even!</p>
                <button onClick={() => handleGuess("Odd")}>Odd</button>
                <button onClick={() => handleGuess("Even")}>Even</button>
                {randomNumber !== null && (
                  <div>
                    <p>Generated Number: {randomNumber}</p>
                    <h2>{result}</h2>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2>Game Over! Your Score: {score}</h2>
                <button onClick={restartGame}>Play Again</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* High scorers section */}
      <div className="high-scorers">
        <h3>High Scores</h3>
        {highScores.length > 0 ? (
          <ul>
            {highScores.map((entry, index) => (
              <li key={index}>
                {entry.name}: {entry.score} points
              </li>
            ))}
          </ul>
        ) : (
          <p>No high scores yet.</p>
        )}
      </div>
       {/* Footer Section */}
    <footer className="footer">
      © {new Date().getFullYear()} Nawa Raz. All rights reserved.
    </footer>
    </div>
    
  );
}

export default OddOrEvenGame;
