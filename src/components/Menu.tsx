import { useState, useEffect } from "react";
import { useKeyHandler } from '../hooks/userKeyHandler';
import MenuListProps from "../types/MenuList";
import '../styles/Menu.css';
import '../styles/Slide.css';

const MenuList: React.FC<MenuListProps> = ({ items, onSelect, selectedItem }) => {
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
    });

  return (
    <div  className={`menu_container slide-left ${isVisible ? "visible" : ""}`}>
      <div className="menu_list"> 
      {items.map((item, index) => (
        <div
          key={index}
          className={`menu_item ${index === selectedIndex ? "selected" : ""}`}
        >
          {item}
        </div>
      ))}
      </div> 
    </div>
  );
};


export default MenuList;
