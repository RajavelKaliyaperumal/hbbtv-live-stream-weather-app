import { useEffect, useCallback, useRef } from "react";
import KEY_CODES from "../rcinteraction/Keycodes";
import KeyHandlerProps from "../types/KeyHandler";

export const useKeyHandler = ({
  componentName,
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
  
  // Using useRef to store the function references to prevent re-renders
  const handlersRef = useRef({
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
  });

  // Update the ref values on prop changes without triggering re-renders
  useEffect(() => {
    handlersRef.current = {
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
    };
  }, [onEnter, onBack, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onRed, onGreen, onYellow, onBlue]);

  // Stable key handler that does not cause re-renders
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    console.log(componentName + " KeyHandler - Received : ", event.keyCode);
    
   const { onEnter, onBack, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onRed, onGreen, onYellow, onBlue } = handlersRef.current;

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
  }, [componentName]); // Only depends on componentName

  useEffect(() => {
    console.log(componentName + " KeyHandler Added");
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      console.log(componentName + " KeyHandler Removed");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [componentName, handleKeyDown]); // No unnecessary updates

};