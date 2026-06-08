export type SimpleWeather =
  | "Clear"
  | "Cloudy"
  | "Rainy"
  | "Snow";

export type UserEnvironment = {
  city: string;
  temperature: number;
  weather: SimpleWeather;
  time: string;
};

// ─────────────────────────────────────────────
// WEATHER MAPPING (4 states only)
// ─────────────────────────────────────────────
function mapWeatherToSimple(code: number): SimpleWeather {
  if (code === 0) return "Clear";

  if ([1, 2, 3, 45, 48].includes(code)) return "Cloudy";

  if (
    [
      51, 53, 55,
      56, 57,
      61, 63, 65,
      66, 67,
      80, 81, 82,
      95, 96, 99,
    ].includes(code)
  ) return "Rainy";

  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";

  return "Cloudy";
}

// ─────────────────────────────────────────────
// CITY NAME (reverse geocoding)
// ─────────────────────────────────────────────
async function getCityName(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );

    const data = await res.json();

    return (
      data?.address?.city ||
      data?.address?.town ||
      data?.address?.village ||
      data?.address?.state ||
      "India"
    );
  } catch {
    return "India";
  }
}

// ─────────────────────────────────────────────
// FORMAT TIME
// ─────────────────────────────────────────────
function formatTime(): string {
  const now = new Date();

  return now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─────────────────────────────────────────────
// MAIN FUNCTION
// ─────────────────────────────────────────────
export async function getUserEnvironment(): Promise<UserEnvironment> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        city: "India",
        temperature: 0,
        weather: "Clear",
        time: formatTime(),
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const city = await getCityName(lat, lon);

          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
          );

          const data = await weatherRes.json();
          const current = data.current_weather;

          resolve({
            city,
            temperature: current?.temperature ?? 0,
            weather: mapWeatherToSimple(current?.weathercode),
            time: formatTime(),
          });
        } catch {
          resolve({
            city: "India",
            temperature: 0,
            weather: "Cloudy",
            time: formatTime(),
          });
        }
      },
      async () => {
        // fallback (Bangalore)
        const lat = 12.9716;
        const lon = 77.5946;

        try {
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
          );

          const data = await weatherRes.json();
          const current = data.current_weather;

          resolve({
            city: "India",
            temperature: current?.temperature ?? 0,
            weather: mapWeatherToSimple(current?.weathercode),
            time: formatTime(),
          });
        } catch {
          resolve({
            city: "India",
            temperature: 0,
            weather: "Cloudy",
            time: formatTime(),
          });
        }
      }
    );
  });
}