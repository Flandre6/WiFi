import { useEffect, useState } from "react";

export default function App() {
  const [nets, setNets] = useState([]);

  useEffect(() => {
    setInterval(async () => {
      let res = await fetch("/api/scan");
      let data = await res.json();
      setNets(data);
    }, 2000);
  }, []);

  return (
    <div style={{ background: "#0b0f0b", color: "#00ff88" }}>
      <h2>WiFi Security Suite</h2>

      {nets.map(n => (
        <div key={n.ssid}>
          {n.ssid} | {n.security} | {n.ai_score}
        </div>
      ))}
    </div>
  );
}
