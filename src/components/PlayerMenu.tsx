import { useState,useEffect } from "react";
import { useKeyHandler } from '../hooks/userKeyHandler';
import MenuListProps from "../types/MenuList";
import AppConfig from "../config/Config";
import '../styles/PlayerMenu.css';
import '../styles/Slide.css';

const PlayerMenuList: React.FC<MenuListProps> = ({ items, onSelect, selectedItem, onClose }) => {
  let index = items.findIndex(item=>item===selectedItem) || 0;
  const [selectedIndex, setSelectedIndex] = useState<number>(index);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300); 
    return () => clearTimeout(timer); // Cleanup timeout
  }, []);
  useKeyHandler({
        onEnter: () => {
            onSelect(items[selectedIndex]);
        },
        onArrowDown:()=>{
            setSelectedIndex((prev) => (prev + 1) % items.length);
        },
        onArrowUp:()=>{
            setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
        },
        onArrowLeft:()=>{
            onClose();
          },
          onArrowRight:()=>{
            onClose();
          },
    });

  return (
    <div className={`player_menu_container slide-right ${isVisible ? "visible" : ""}` }>
      <div className="player_menu_list"> 
      {items.map((item, index) => (
        <div
          key={index}
          className={`player_menu_item ${index === selectedIndex ? "selected" : ""}`}
        >
          {AppConfig.ResolutionsMap[item]}
        </div>
      ))}
      </div> 
    </div>
  );
};


export default PlayerMenuList;
