import React from "react";

interface IProps {
  playerName: string;
  score: number;
}

export default function ScoreBoard({ playerName, score }: IProps) {
  return (
    <div style={{ flex: 2, textAlign: "center" }}>
      {playerName && (
        <h3 style={{ color: "#FFF" }}>
          {playerName}: {score}
        </h3>
      )}
    </div>
  );
}
