export default interface KeyHandlerProps {
    componentName: string ,
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