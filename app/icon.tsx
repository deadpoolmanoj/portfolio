import { ImageResponse } from "next/og";

export const runtime = "edge";

function getWeatherEmoji(temp: number, condition?: string): string {
  if (condition) {
    const c = condition.toLowerCase();
    if (c.includes("rain") || c.includes("drizzle")) return "🌧️";
    if (c.includes("cloud")) return "☁️";
    if (c.includes("snow")) return "❄️";
    if (c.includes("storm") || c.includes("thunder")) return "⛈️";
    if (c.includes("mist") || c.includes("fog") || c.includes("haze")) return "🌫️";
    if (c.includes("clear") || c.includes("sunny")) return temp > 30 ? "☀️" : "🌤️";
  }

  // Fallback to temperature
  if (temp >= 35) return "🌡️";
  if (temp >= 28) return "☀️";
  if (temp >= 20) return "⛅";
  return "🌥️";
}

export default async function Icon() {
  let emoji = "🌤️"; // default

  try {
    // Using open-meteo — free, no API key needed
    // Bengaluru coords as fallback
    const geoRes = await fetch(
      "https://geocoding-api.open-meteo.com/v1/search?name=Bengaluru&count=1"
    );
    const geoData = await geoRes.json();
    const { latitude, longitude } = geoData.results[0];

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode`
    );
    const weatherData = await weatherRes.json();

    const temp = weatherData.current.temperature_2m;
    const code = weatherData.current.weathercode;

    // WMO weather codes → condition string
    const condition =
      code === 0 ? "clear" :
      code <= 3 ? "cloud" :
      code <= 49 ? "fog" :
      code <= 69 ? "rain" :
      code <= 79 ? "snow" :
      code <= 99 ? "storm" : "cloud";

    emoji = getWeatherEmoji(temp, condition);
  } catch {
    emoji = "🌤️";
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffac81",
          borderRadius: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            width: "120%",
            height: "120%",
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), transparent 40%), radial-gradient(circle at 70% 70%, rgba(255,140,80,0.45), transparent 50%)",
            filter: "blur(10px)",
          }}
        />

        {/* Inner ring */}
        <div
          style={{
            position: "absolute",
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.35)",
            boxShadow: "0 0 20px rgba(255,255,255,0.25)",
          }}
        />

        {/* Weather emoji */}
        <div
          style={{
            fontSize: 36,
            zIndex: 1,
          }}
        >
          {emoji}
        </div>
      </div>
    ),
    {
      width: 64,
      height: 64,
    }
  );
}