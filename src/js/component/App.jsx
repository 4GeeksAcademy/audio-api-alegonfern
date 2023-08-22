import React, { useState, useEffect, useRef } from "react";
import Controles from "./Controles";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para verificar si esta cargado antes de reproducir (error de play).
  const audioRef = useRef(new Audio());

  const audioUrl = "https://playground.4geeks.com/apis/fake/sound/";

  const fetchSongs = async () => {
    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/sound/songs');
      if (response.ok) {
        const data = await response.json();
        const songsURLs = data.map(song => ({
          ...song,
          url: audioUrl + song.url
        }));
        setSongs(songsURLs);
      } else {
        console.error("Error fetching songs data");
      }
    } catch (error) {
      console.error("Error fetching songs data:", error);
    }
  };

  const playSong = async (index) => {
    if (isLoading) return;

    if (index >= 0 && index < songs.length) {
      setIsLoading(true);

      await audioRef.current.pause();
      audioRef.current.currentTime = 0;

      setCurrentSongIndex(index);
      audioRef.current.src = songs[index].url;
      await audioRef.current.load();
      audioRef.current.play();

      setIsPlaying(true);
      setIsLoading(false);
    }
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    playSong(nextIndex);
  };

  const playPreviousSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(prevIndex);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <Controles
        isPlaying={isPlaying}
        pauseSong={pauseSong}
        playSong={playSong}
        playNextSong={playNextSong}
        playPreviousSong={playPreviousSong}
      />
      <div
        style={{
          height: "calc(100vh - 200px)",
          overflowY: "auto",
          borderRight: "1px solid #ddd",
        }}
      >
        <ol className="list-group">
          {songs.map((item, index) => (
            <li
              key={item.id}
              onClick={() => playSong(index)}
              className={`list-group-item ${
                currentSongIndex === index ? "bg-dark text-white" : ""
              }`}
            >
              <span className="mr-2">{index + 1}.</span>
              {item.name}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default App;
