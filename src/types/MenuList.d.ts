
export default interface MenuListProps {
    items: string[];
    onSelect: (selectedItem: string) => void;
    selectedItem: string,
    onClose: () => void;
  }