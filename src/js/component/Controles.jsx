import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";

const Controles = ({
  isPlaying,
  pauseSong,
  playSong,
  playNextSong,
  playPreviousSong,
}) => {
  return (
    <div>
      <div
        className="bg-dark"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fff",
          textAlign: "center",
        }}
      >
        <button onClick={playPreviousSong}>
          <FontAwesomeIcon icon={faStepBackward} />
        </button>
        {isPlaying ? (
          <button onClick={pauseSong}>
            <FontAwesomeIcon icon={faPause} />
          </button>
        ) : (
          <button onClick={() => playSong()}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
        <button onClick={playNextSong}>
          <FontAwesomeIcon icon={faStepForward} />
        </button>
      </div>
    </div>
  );
};

export default Controles;
