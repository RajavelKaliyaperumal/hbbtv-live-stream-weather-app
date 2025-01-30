import { useState } from "react";
import { useKeyHandler } from '../hooks/userKeyHandler';
import MenuListProps from "../types/MenuList";
import '../styles/Menu.css';

const MenuList: React.FC<MenuListProps> = ({ items, onSelect, selectedItem }) => {
  let index = items.findIndex(item=>item===selectedItem) || 0;
  const [selectedIndex, setSelectedIndex] = useState<number>(index);
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
    <div className="menu_container" tabIndex={0} >
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
