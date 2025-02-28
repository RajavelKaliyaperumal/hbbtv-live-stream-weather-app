import React from "react";
import PlayerProgressProps from "../types/PlayerProgress";
import AppConfig from "../config/Config";
import '../styles/PlayerProgress.css';

const PlayerProgress: React.FC<PlayerProgressProps> = ({active, resolution}) => {
  console.log("PlayerProgress Component");
  return <div className="player_progress">
    <div className={`player_resoultion ${active ? "selected" : ""}`}>{active? AppConfig.ResolutionsMap[resolution] : "Quality"}
    </div>
  </div>;
};

export default PlayerProgress;
