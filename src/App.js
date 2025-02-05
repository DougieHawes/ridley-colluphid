import { useState, useEffect, useRef } from "react";
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

import unchainMyHeart from "./media/unchainMyHeart.mp3";
import myFunnyValentine from "./media/myFunnyValentine.mp3";
import hardToHandle from "./media/hardToHandle.mp3";

import "./style.scss";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [songTime, setSongTime] = useState(0);
  const [duration, setDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");

  const audioRef = useRef(null);

  useEffect(() => {
    if (playing && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => console.warn("Playback error:", error));
      }
    } else {
      audioRef.current?.pause();
    }
  }, [playing]);

  useEffect(() => {
    const updateDuration = () => {
      if (audioRef.current && !isNaN(audioRef.current.duration)) {
        const totalSeconds = Math.floor(audioRef.current.duration);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        setDuration(`${minutes}:${seconds.toString().padStart(2, "0")}`);
      }
    };

    const audio = audioRef.current;
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [songIndex]);

  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current) {
        const currentTimeInSec = audioRef.current.currentTime;
        setCurrentTime(formatTime(currentTimeInSec));

        if (audioRef.current.duration) {
          const percentage =
            (currentTimeInSec / audioRef.current.duration) * 100;
          setSongTime(percentage);
        }
      }
    };

    const audio = audioRef.current;
    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const formatTime = (time) => {
    const totalSeconds = Math.floor(time);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const songArray = [
    {
      i: 0,
      title: "Unchain My Heart",
      artist: "Ray Charles",
      image: unchainImage,
      mp3: unchainMyHeart,
    },
    {
      i: 1,
      title: "My Funny Valentine",
      artist: "Chet Baker",
      image: valentineImage,
      mp3: myFunnyValentine,
    },
    {
      i: 2,
      title: "Hard to Handle",
      artist: "Otis Redding",
      image: handleImage,
      mp3: hardToHandle,
    },
    // {
    //   i: 3,
    //   title: "Mustang Sally",
    //   artist: "Wilson Pickett",
    //   image: mustangImage,
    // },
    // { i: 4, title: "Kiss", artist: "Prince", image: kissImage },
    // {
    //   i: 5,
    //   title: "The Lady is a Tramp",
    //   artist: "Frank Sinatra",
    //   image: ladyImage,
    // },
  ];

  const getPrevSong = () => {
    const wasPlaying = playing;

    setPlaying(false);

    setSongIndex((prevIndex) =>
      prevIndex === 0 ? songArray.length - 1 : prevIndex - 1
    );

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play();
        setPlaying(true);
      }
    }
  };

  const rewind = () => {
    const currentTime = audioRef.current.currentTime;

    if (currentTime >= 10) {
      audioRef.current.currentTime = audioRef.current.currentTime - 10;
    } else if (currentTime <= 10) {
      audioRef.current.currentTime = audioRef.current.currentTime - 5;
    } else if (currentTime <= 5) {
      audioRef.current.currentTime = audioRef.current.currentTime - 2;
    }
  };

  const fastForward = () => {
    const currentTime = audioRef.current.currentTime;
    const songLength = audioRef.current.duration;

    if (currentTime <= songLength - 10) {
      audioRef.current.currentTime = audioRef.current.currentTime + 10;
    } else if (currentTime <= songLength - 5) {
      audioRef.current.currentTime = audioRef.current.currentTime + 5;
    } else if (currentTime <= songLength - 2) {
      audioRef.current.currentTime = audioRef.current.currentTime + 2;
    }
  };

  const getNextSong = () => {
    const wasPlaying = playing;

    setPlaying(false);

    setSongIndex((prevIndex) =>
      prevIndex === songArray.length - 1 ? 0 : prevIndex + 1
    );

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play();
        setPlaying(true);
      }
    }
  };

  const changeSong = (index) => {
    const wasPlaying = playing;

    setPlaying(false);
    setSongIndex(index);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }

    if (audioRef.current) {
      const handleCanPlayThrough = () => {
        if (wasPlaying) {
          audioRef.current
            .play()
            .then(() => {
              setPlaying(true);
            })
            .catch((error) => {
              console.warn("Autoplay error:", error);
            });
        }
      };

      audioRef.current.addEventListener("canplaythrough", handleCanPlayThrough);

      return () => {
        audioRef.current.removeEventListener(
          "canplaythrough",
          handleCanPlayThrough
        );
      };
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
            <FaBackward
              className="music-player-button"
              size={28}
              onClick={rewind}
            />
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
            <FaForward
              className="music-player-button"
              size={28}
              onClick={fastForward}
            />
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
          <div className="time-container">
            {currentTime}/{duration}
          </div>
        </div>
        <div className="song-list">
          {songArray.map((s) => (
            <div
              key={s.title}
              className="song-tab"
              onClick={() => changeSong(s.i)}
            >
              <h2 className="song-name">{s.title}</h2>
              <p className="artist-name">{s.artist}</p>
            </div>
          ))}
        </div>
      </div>
      <audio ref={audioRef}>
        <source src={songArray[songIndex].mp3} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default App;
