const { useState } = React;

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return alert("Enter a city!");

    try {
      const res = await fetch(`https://wttr.in/${city}?format=j1`);
      const data = await res.json();

      if (data && data.current_condition) {
        setWeather({
          temperature: data.current_condition[0].temp_C,
          humidity: data.current_condition[0].humidity,
          condition: data.current_condition[0].weatherDesc[0].value,
          wind: data.current_condition[0].windspeedKmph,
          feelsLike: data.current_condition[0].FeelsLikeC,
        });
        setError("");
      } else {
        setError("No weather data found.");
        setWeather(null);
      }
    } catch (err) {
      setError("Something went wrong.");
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <h1>Created by SHREYASH SRIVASTAVA</h1>
      <h1>🌤️ Weather Forecast App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <p><strong>🌍 City:</strong> {city}</p>
          <p><strong>🌡️ Temp:</strong> {weather.temperature} °C</p>
          <p><strong>🤒 Feels Like:</strong> {weather.feelsLike} °C</p>
          <p><strong>💧 Humidity:</strong> {weather.humidity}%</p>
          <p><strong>💨 Wind:</strong> {weather.wind} km/h</p>
          <p><strong>⛅ Condition:</strong> {weather.condition}</p>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);






