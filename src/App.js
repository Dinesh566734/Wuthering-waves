import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock API - Replace with your OpenWeatherMap API key
const API_KEY = "a0f930566647008036d42a5099cd2884";

function App() {
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) {
      alert("Please enter a city name!");
      return;
    }

    setLoading(true);
    setCurrentWeather(null);
    setForecastData([]);

    try {
      // Mock data for demonstration - replace with actual API calls
      setTimeout(() => {
        setCurrentWeather({
          name: city,
          main: { temp: 24, feels_like: 26, humidity: 65, pressure: 1013 },
          weather: [{ description: "partly cloudy", icon: "02d" }],
          wind: { speed: 3.5 }
        });

        setForecastData([
          { date: "Today", temp: 24 },
          { date: "Tomorrow", temp: 22 },
          { date: "Day 3", temp: 26 },
          { date: "Day 4", temp: 28 },
          { date: "Day 5", temp: 25 }
        ]);

        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data.");
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getWeatherIcon = (weatherCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[weatherCode] || '🌤️';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 opacity-10 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 opacity-5 rounded-full mix-blend-overlay filter blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-thin text-white mb-4 tracking-wider">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Weather
            </span>
          </h1>
          <p className="text-xl text-blue-200 opacity-80 font-light">
            Beautiful weather insights at your fingertips
          </p>
        </div>

        {/* Search Section */}
        <div className="flex justify-center mb-16">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-75"></div>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-2 flex items-center space-x-4">
              <input
                type="text"
                placeholder="Enter city name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-transparent text-white placeholder-blue-200 text-lg px-6 py-4 w-80 outline-none"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Weather Card */}
        {currentWeather && (
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/15 backdrop-blur-2xl rounded-3xl p-8 border border-white/20">
                <div className="text-center">
                  <h2 className="text-3xl font-light text-white mb-2">
                    {currentWeather.name}
                  </h2>
                  
                  <div className="text-8xl mb-4">
                    {getWeatherIcon(currentWeather.weather[0].icon)}
                  </div>
                  
                  <div className="text-6xl font-thin text-white mb-2">
                    {Math.round(currentWeather.main.temp)}°
                  </div>
                  
                  <div className="text-blue-200 text-lg capitalize mb-6">
                    {currentWeather.weather[0].description}
                  </div>

                  {/* Weather Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                      <div className="text-blue-200 text-sm">Feels like</div>
                      <div className="text-white text-xl font-medium">
                        {Math.round(currentWeather.main.feels_like)}°C
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                      <div className="text-blue-200 text-sm">Humidity</div>
                      <div className="text-white text-xl font-medium">
                        {currentWeather.main.humidity}%
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                      <div className="text-blue-200 text-sm">Wind</div>
                      <div className="text-white text-xl font-medium">
                        {currentWeather.wind.speed} m/s
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                      <div className="text-blue-200 text-sm">Pressure</div>
                      <div className="text-white text-xl font-medium">
                        {currentWeather.main.pressure} hPa
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Forecast Chart */}
        {forecastData.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-light text-white text-center mb-8">
                  5-Day Forecast
                </h3>
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={forecastData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="date" 
                        stroke="rgba(255,255,255,0.7)"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.7)"
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          border: 'none',
                          borderRadius: '12px',
                          color: 'white'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="temp"
                        stroke="url(#gradient)"
                        strokeWidth={3}
                        dot={{ fill: '#60A5FA', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, fill: '#3B82F6' }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#60A5FA" />
                          <stop offset="100%" stopColor="#A855F7" />
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-blue-200/60 text-sm">
            Powered by modern weather APIs
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
