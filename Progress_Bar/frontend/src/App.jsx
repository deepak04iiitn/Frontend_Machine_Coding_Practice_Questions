import React, { useState, useEffect } from "react";

export default function SimpleProgressBar() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setRunning(false);
            return 100;
          }
          return p + 1;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [running]);

  const start = () => {
    if (progress < 100) setRunning(true);
  };

  const togglePauseResume = () => {
    if (progress < 100) setRunning((prev) => !prev);
  };

  const restart = () => {
    setProgress(0);
    setRunning(true);
  };

  return (
    <div style={{ padding: 40 }}>
      <div
        style={{
          height: 25,
          width: "100%",
          background: "#ddd",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 20
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "blue",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {progress}%
        </div>
      </div>

      <button onClick={start} disabled={running || progress >= 100}>
        Start
      </button>

      <button onClick={togglePauseResume} disabled={progress >= 100} style={{ marginLeft: 10 }}>
        {running ? "Pause" : "Resume"}
      </button>

      <button onClick={restart} style={{ marginLeft: 10 }}>
        Restart
      </button>
    </div>
  );
}
