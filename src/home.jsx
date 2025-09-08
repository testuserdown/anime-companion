import "./home.scss";
import { useState } from "react";
import x from "./assets/x-min.png";

import chillAudio from "./assets/chill.mp3";
import sadAudio from "./assets/sad.mp3";
import angryAudio from "./assets/angry.mp3";
import tiredAudio from "./assets/tired.mp3";
import neutralAudio from "./assets/neutral.mp3";
import hypeAudio from "./assets/hype.mp3";

import chillImg from "./assets/chill_img.png";
import sadImg from "./assets/sad_img.png";
import angryImg from "./assets/angry_img.png";
import tiredImg from "./assets/tired_img.png";
import neutralImg from "./assets/neutral_img.png";
import hypeImg from "./assets/hype_img.png";

const TITLE = import.meta.env.VITE_TITLE || "Anime Companion";
const DESC =
  import.meta.env.VITE_DESC ||
  "A gentle app to reflect your mood with soothing anime vibes";
const X_LINK = import.meta.env.VITE_X_LINK || "https://x.com/new";

const EMOTIONS = [
  { id: "chill", emoji: "😊", label: "Chill" },
  { id: "sad", emoji: "😢", label: "Sad" },
  { id: "angry", emoji: "😡", label: "Angry" },
  { id: "tired", emoji: "💤", label: "Tired" },
  { id: "neutral", emoji: "😐", label: "Neutral" },
  { id: "hype", emoji: "🤩", label: "Hype" },
];

const emotionAssets = {
  chill: {
    img: chillImg,
    audio: chillAudio,
    messages: [
      "You’re doing just fine. Keep breathing.",
      "Peace suits you. Stay in that lane.",
    ],
  },
  sad: {
    img: sadImg,
    audio: sadAudio,
    messages: [
      "You’re not alone in this. Even stars need darkness to shine.",
      "Pain is temporary, but you are permanent.",
    ],
  },
  angry: {
    img: angryImg,
    audio: angryAudio,
    messages: [
      "It’s okay to feel it. Just don’t let it burn you inside.",
      "Let it out. Then move like a storm.",
    ],
  },
  tired: {
    img: tiredImg,
    audio: tiredAudio,
    messages: [
      "Close your eyes. The world can wait.",
      "Even heroes rest. Recharge.",
    ],
  },
  neutral: {
    img: neutralImg,
    audio: neutralAudio,
    messages: [
      "Balance is underrated. This moment is yours.",
      "You’re here. And that’s enough.",
    ],
  },
  hype: {
    img: hypeImg,
    audio: hypeAudio,
    messages: [
      "You’ve got momentum — ride it loud!",
      "Now’s the time. Go all in.",
    ],
  },
};

export function App() {
  const [emotion, setEmotion] = useState("chill");
  const [message, setMessage] = useState(() => getRandomMessage("chill"));

  function getRandomMessage(id) {
    const options = emotionAssets[id].messages;
    return options[Math.floor(Math.random() * options.length)];
  }

  function playAudio(id) {
    const audio = new Audio(emotionAssets[id].audio);
    audio.volume = 0.5; // Set volume to a comfortable level
    audio.loop = false; // Play once
    audio.play();
  }

  function handleEmotionChange(id) {
    setEmotion(id);
    setMessage(getRandomMessage(id));
    playAudio(id);
  }

  function handleReplay() {
    setMessage(getRandomMessage(emotion));
    playAudio(emotion);
  }

  return (
    <div className="w100 df fdc aic home-container">
      <img
        className="x-icon"
        src={x}
        alt="Close"
        onClick={() => window.open(X_LINK, "_blank")}
      />
      <h1>{TITLE}</h1>
      <p>{DESC}</p>

      <div className="emotions-container">
        {EMOTIONS.map((e) => (
          <button
            className="df fdc"
            key={e.id}
            onClick={() => handleEmotionChange(e.id)}
          >
            {e.emoji}
            <span className="emotion-label">{e.label}</span>
          </button>
        ))}
      </div>

      <div className="df fdc aic">
        <img
          className="character-image"
          src={emotionAssets[emotion].img}
          alt={emotion}
        />

        <div className="message-box">{message}</div>
      </div>

      <button className="speak-again" onClick={handleReplay}>
        Speak Again
      </button>
    </div>
  );
}
