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
      console.log("useKeyHandler",event.keyCode, event);
      switch (event.keyCode) {
        case KEY_CODES.ENTER:
          onEnter && onEnter();
          break;
        case KEY_CODES.BACK:
          onBack && onBack();
          break;
        case KEY_CODES.UP:
          onArrowUp && onArrowUp();
          break;
        case KEY_CODES.DOWN:
          onArrowDown && onArrowDown();
          break;
        case KEY_CODES.LEFT:
          onArrowLeft && onArrowLeft();
          break;
        case KEY_CODES.RIGHT:
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
