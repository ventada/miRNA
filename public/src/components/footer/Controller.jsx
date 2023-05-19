import React from "react";
import ControllerPart from "./ControllerPart";

import GameUpBtn from "./icons/up.svg";
import GameDeleteBtn from "./icons/cross.svg";
import GameReverseBtn from "./icons/reverse.svg";
import GameAddBtn from "./icons/plus.svg";
import GameRightBtn from "./icons/right.svg";
import GameLeftBtn from "./icons/left.svg";
import GameDownBtn from "./icons/down.svg";

export default function Controller() {
  return (
    <div className="controller">
      <div class="controller-container">
        <ControllerPart
          class="game-delete-btn"
          src={GameDeleteBtn}
          action="delete"
        />
        <ControllerPart class="game-up-btn" src={GameUpBtn} action="up" />
        <ControllerPart
          class="game-reverse-btn"
          src={GameReverseBtn}
          action="reverse"
        />
        <ControllerPart class="game-left-btn" src={GameLeftBtn} action="left" />
        <ControllerPart class="game-add-btn" src={GameAddBtn} action="add" />
        <ControllerPart
          class="game-right-btn"
          src={GameRightBtn}
          action="right"
        />
        <ControllerPart class="game-down-btn" src={GameDownBtn} action="down" />
      </div>
    </div>
  );
}
