import React from "react";
import ListProps from "../types/List";

const List: React.FC<ListProps> = React.memo(
  ({ items, listClassName, listItemClassName, selectedIndex }) => {
    return (
      <div className={listClassName}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`${listItemClassName} ${index === selectedIndex ? "selected" : ""}`}
          >
            {item}
          </div>
        ))}
      </div>
    );
  }
);

export default List;
