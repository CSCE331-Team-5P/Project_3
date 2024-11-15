export async function GET(request) {
    const apiKey = 'dcb05c9e52c64357a2f211504241511'; // Your WeatherAPI.com key
    const location = 'College Station'; // Your location
  
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
    );
  
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch weather data' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  