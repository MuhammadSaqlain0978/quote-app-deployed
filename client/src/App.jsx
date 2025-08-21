import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [random, setRandom] = useState(null);

  // Load all quotes once
  useEffect(() => {
    fetch("/api/quotes")
      .then(res => res.json())
      .then(data => setQuotes(data));
  }, []);

  const fetchRandom = async () => {
    const res = await fetch("/api/quotes/random");
    const data = await res.json();
    setRandom(data);
  };

  return (
    <div className="App">
      <h1>📚 Famous Quotes</h1>

      <button onClick={fetchRandom}>🎲 Random Quote</button>

      {random && (
        <div className="quote-box">
          <p>“{random.text}”</p>
          <small>— {random.author}</small>
        </div>
      )}

      <h2>🗂 All Quotes</h2>
      <ul>
        {quotes.map(q => (
          <li key={q.id}>
            “{q.text}” — <i>{q.author}</i>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
