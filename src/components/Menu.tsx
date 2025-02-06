import { useState, useEffect } from "react";
import { useKeyHandler } from '../hooks/userKeyHandler';
import MenuListProps from "../types/MenuList";
import List from "./List";
import '../styles/Menu.css';
import '../styles/Slide.css';

const MenuList: React.FC<MenuListProps> = ({ items, onSelect, selectedItem }) => {
  console.log("MenuList Component");
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
        componentName: "MenuList",
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
      <List items={items} selectedIndex={selectedIndex} listClassName="menu_list" listItemClassName="menu_item" />
    </div>
  );
};


export default MenuList;
