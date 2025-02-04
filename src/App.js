import { useState } from "react";
import {
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaPhone,
  FaEnvelope,
  FaPlay,
  FaPause,
  FaBackward,
  FaForward,
  FaFastForward,
  FaFastBackward,
  FaSun,
  FaMoon,
} from "react-icons/fa";

import unchainImage from "./media/unchainMyHeart.webp";
import valentineImage from "./media/myFunnyValentine.webp";
import handleImage from "./media/hardToHandle.webp";
import mustangImage from "./media/mustangSally.jpg";
import kissImage from "./media/kiss.jpg";
import ladyImage from "./media/ladyIsATramp.jpg";

import "./style.scss";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [songTime, setSongTime] = useState(0);

  const songArray = [
    {
      i: 0,
      title: "Unchain My Heart",
      artist: "Ray Charles",
      image: unchainImage,
    },
    {
      i: 1,
      title: "My Funny Valentine",
      artist: "Chet Baker",
      image: valentineImage,
    },
    {
      i: 2,
      title: "Hard to Handle",
      artist: "Otis Redding",
      image: handleImage,
    },
    {
      i: 3,
      title: "Mustang Sally",
      artist: "Wilson Pickett",
      image: mustangImage,
    },
    { i: 4, title: "Kiss", artist: "Prince", image: kissImage },
    {
      i: 5,
      title: "The Lady is a Tramp",
      artist: "Frank Sinatra",
      image: ladyImage,
    },
  ];

  const getPrevSong = () => {
    if (songIndex === 0) {
      setSongIndex(songArray.length - 1);
    } else {
      setSongIndex(songIndex - 1);
    }
  };

  const getNextSong = () => {
    if (songIndex === songArray.length - 1) {
      setSongIndex(0);
    } else {
      setSongIndex(songIndex + 1);
    }
  };

  return (
    <div className={`app ${darkMode ? "app-dark-mode" : "app-light-mode"}`}>
      <div className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <FaSun size={35} /> : <FaMoon size={35} />}
      </div>
      <div className="body">
        <div className="text-container">
          <h1 className="title">RidleyColluphid</h1>
          <div className="social-media-links">
            <a
              className="social-media-link"
              href="https://instagram.com/ridleycolluphid/"
              target="_blank"
            >
              <FaInstagram size={42} />
            </a>
            <a
              className="social-media-link"
              href="https://tiktok.com/@ridley_colluphid"
              target="_blank"
            >
              <FaTiktok size={42} />
            </a>
            <a
              className="social-media-link"
              href="https://www.facebook.com/profile.php?id=61572421277979&sk=about"
              target="_blank"
            >
              <FaFacebook size={42} />
            </a>
            <a className="social-media-link" href="tel:07742148280">
              <FaPhone size={42} />
            </a>
            <a
              className="social-media-link"
              href="mailto:dougiehawes@hotmail.com"
            >
              <FaEnvelope size={42} />
            </a>
          </div>
        </div>
        <div className="music-player-container">
          <div className="music-player-screen">
            <div className="current-song-image-container">
              <img
                className={`current-song-image ${
                  playing && "current-song-image-animated"
                }`}
                src={songArray[songIndex].image}
                alt=""
              />
            </div>
            <div
              className={`current-song-details ${
                playing && "current-song-details-animated"
              }`}
            >
              <h2 className="current-song-title">
                {songArray[songIndex].title}
              </h2>
              <p className="current-song-credit">originally performed by</p>
              <p className="current-song-artist">
                {songArray[songIndex].artist}
              </p>
            </div>
          </div>
          <div className="music-player-buttons">
            <FaFastBackward
              className="music-player-button"
              size={28}
              onClick={getPrevSong}
            />
            <FaBackward className="music-player-button" size={28} />
            {playing ? (
              <FaPause
                className="music-player-button"
                size={28}
                onClick={() => setPlaying(false)}
              />
            ) : (
              <FaPlay
                className="music-player-button"
                size={28}
                onClick={() => setPlaying(true)}
              />
            )}
            <FaForward className="music-player-button" size={28} />
            <FaFastForward
              className="music-player-button"
              size={28}
              onClick={getNextSong}
            />
          </div>
          <div className="music-line">
            <div className="line">
              <div className="thumb" style={{ left: `${songTime}%` }}></div>
            </div>
          </div>
          <div className="time-container">00:00/00:00</div>
        </div>
        <div className="song-list">
          {songArray.map((s) => (
            <div className="song-tab" onClick={() => setSongIndex(s.i)}>
              <h2 className="song-name">{s.title}</h2>
              <p className="artist-name">{s.artist}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
