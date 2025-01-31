import { useEffect } from "react";
import KEY_CODES from "../rcinteraction/Keycodes";

interface KeyHandlerProps {
  onEnter?: () => void;
  onBack?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onRed?: () => void;
  onGreen?: () => void;
  onYellow?: () => void;
  onBlue?: () => void;
}

export const useKeyHandler = ({
  onEnter,
  onBack,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onRed,
  onGreen,
  onYellow,
  onBlue,
}: KeyHandlerProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log("HbbTv KeyHandler - Received : ",event.keyCode);
      switch (event.keyCode) {
        case KEY_CODES.ENTER:
          event.preventDefault();
          onEnter && onEnter();
          break;
        case KEY_CODES.BACK:
          event.preventDefault();
          onBack && onBack();
          break;
        case KEY_CODES.UP:
          event.preventDefault();
          onArrowUp && onArrowUp();
          break;
        case KEY_CODES.DOWN:
          event.preventDefault();
          onArrowDown && onArrowDown();
          break;
        case KEY_CODES.LEFT:
          event.preventDefault();
          onArrowLeft && onArrowLeft();
          break;
        case KEY_CODES.RIGHT:
          event.preventDefault();
          onArrowRight && onArrowRight();
          break;
        case KEY_CODES.RED:
          onRed && onRed();
          break;
        case KEY_CODES.GREEN:
          onGreen && onGreen();
          break;
        case KEY_CODES.YELLOW:
          onYellow && onYellow();
          break;
        case KEY_CODES.BLUE:
          onBlue && onBlue();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onEnter, onBack, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onRed, onGreen, onYellow, onBlue]);
};
