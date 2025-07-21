"use client";
import { useEffect, useState } from "react";
/* import styles from "./page.module.css"; */

type PaletteData = {
  city: string;
  colors: string[];
};

export default function Home() {
  const [palettes, setPalettes] = useState<PaletteData[]>([]);
  const [selected, setSelected] = useState<PaletteData | null>(null);
  const [hoveredColor, setHoveredColor] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Load CSV and pick a random city
  useEffect(() => {
    fetch("/palette3.csv")
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split("\n").filter(Boolean);
        const parsed: PaletteData[] = rows.map((row) => {
          const [city, ...colors] = row.trim().split(";");
          return { city, colors };
        });
        setPalettes(parsed);
        if (parsed.length > 0) {
          const idx = Math.floor(Math.random() * parsed.length);
          setSelected(parsed[idx]);
          document.title = `colours of ${parsed[idx].city}`;
        }
      });
  }, []);

  // Responsive font size
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  // Handle color click (copy to clipboard)
  const handleColorClick = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="container">
      <h1 id="city-name">{selected?.city}</h1>
      <div className="hex-code">{copied ? "Code copied!" : hoveredColor}</div>
      <div className="palette">
        {selected &&
          (isMobile
            ? selected.colors.slice(0, Math.ceil(selected.colors.length / 2))
            : selected.colors
          ).map((color, i) => (
            <div
              key={i}
              className={`color${
                copied && hoveredColor === color ? " clicked" : ""
              }`}
              style={{ backgroundColor: color }}
              onMouseOver={() => setHoveredColor(color)}
              onMouseOut={() => setHoveredColor("")}
              onClick={() => handleColorClick(color)}
            />
          ))}
      </div>
    </div>
  );
}
