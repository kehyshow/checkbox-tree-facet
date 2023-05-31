import React, { useCallback } from "react";
import Checkbox from "../Checkbox/Checkbox";
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'
import { CheckboxState } from "../Tree/Tree";
import styles from "./checkboxlist.module.scss";

type CheckboxListProps = {
  categories: Item[];
  idsToRender?: string[];
  indentLevel?: number;
  onClick?: (id: string) => void;
  getStateForId: (id: string) => CheckboxState;
  setCategories: (items: Item[]) => void;
};

const CheckboxList: React.FC<CheckboxListProps> = ({
  categories,
  getStateForId,
  idsToRender = [],
  indentLevel = 0,
  onClick = () => { },
  setCategories = () => { }
}) => {
  if (!idsToRender.length) {
    idsToRender = categories.filter((i) => i.parent === "").map((i) => i.id);
  }

  const childItems = useCallback((parentId: string) => {
    return categories.filter((i) => i.parent === parentId);
  }, [categories])

  const toggleCategory = (item: Item) => {
    const newCategories = categories.map((category) => {
      return category.id === item.id ? {
        ...category,
        toggleStatus: !item.toggleStatus
      } : { ...category };
    });
    setCategories([...newCategories]);
  }

  const getChildNodes = (parentId: string) => {
    const nodeItems = childItems(parentId);
    if (!nodeItems.length) return null;
    return (
      <CheckboxList
        categories={categories}
        idsToRender={nodeItems.map((i) => i.id)}
        indentLevel={indentLevel + 1}
        onClick={onClick}
        getStateForId={getStateForId}
        setCategories={setCategories}
      />
    );
  };

  return (
    <ul className={styles.list} style={{ paddingLeft: 40 }}>
      {idsToRender.map((id) => {
        const item = categories.find((i) => i.id === id);
        if (!item) 
          return null;
        const checkboxState = getStateForId(id);
        return (
          <React.Fragment key={item.id}>
            <li>
              {childItems(item.id).length > 0 ? <div className="cursor-pointer" onClick={() => toggleCategory(item)}>{item.toggleStatus ? <FaChevronDown /> : <FaChevronRight />}</div> : <div style={{ width: '12px' }}></div>}
              <Checkbox
                onClick={() => onClick(item.id)}
                isChecked={checkboxState === CheckboxState.CHECKED}
                isIndeterminate={checkboxState === CheckboxState.INDETERMINATE}
              />
              <span className="cursor-pointer" onClick={() => toggleCategory(item)}>{item.name} {item.id !== '0' && `(${item.count})`}</span>
            </li>
            {item.toggleStatus && getChildNodes(item.id)}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default CheckboxList;
