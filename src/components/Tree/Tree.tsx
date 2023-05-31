import { useCallback, useMemo, useState } from "react";
import response from "../../data/response";
import CheckboxList from "../CheckboxList/CheckboxList";
import { FaTimes } from 'react-icons/fa'
import { updateItemStates } from "./updateItemStates";
import styles from "./Tree.module.scss";

export enum CheckboxState {
  UNCHECKED,
  CHECKED,
  INDETERMINATE,
}

export type ItemState = {
  id: string;
  state: CheckboxState;
};

const items = [
  {
    id: "0",
    count: 0,
    parent: "",
    name: "gender",
  },
  ...response.data.categories,
]

const defaultItemStates: ItemState[] = items.map((i) => ({
  id: i.id,
  state: CheckboxState.UNCHECKED,
}));

const Tree = () => {
  const [itemStates, setItemStates] = useState<ItemState[]>(defaultItemStates);
  const [categories, setCategories] = useState<Item[]>(items);
  const getStateForId = useCallback(
    (id: string) => {
      return itemStates.find((i) => i.id === id)?.state ?? CheckboxState.UNCHECKED;
    },
    [itemStates]
  );

  const selectedCategories = useMemo(() => {
    const checkedCategories: Item[] = [];
    itemStates.filter(item => item.state === CheckboxState.CHECKED).forEach((item) => {
      const category = categories.find((cItem) => cItem.id === item.id);
      if (!category) return;
      const parentItem = itemStates.find((cItem) => cItem.id === category.parent);
      if (parentItem?.state === CheckboxState.CHECKED) return;
      checkedCategories.push(category);
    });
    return checkedCategories;
  }, [itemStates, categories])

  const clickHandler = useCallback((id: string) => setItemStates(updateItemStates(itemStates, items, id)), [itemStates]);

  const removeAll = () => {
    const newItemStates = itemStates.map((item) => {
      return {
        id: item.id,
        state: CheckboxState.UNCHECKED
      };
    });
    setItemStates([...newItemStates]);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-1 flex-wrap items-center">
        {selectedCategories.map(category => {
          return <div key={category.id} className={styles.selectedCategory} onClick={() => clickHandler(category.id)}>
            {category.name}
            <FaTimes />
          </div>
        })}
        {selectedCategories.length > 0 && <div className={styles.removeAll} onClick={removeAll}>Remove All</div>}
      </div>
      <CheckboxList categories={categories} setCategories={setCategories} onClick={clickHandler} getStateForId={getStateForId} />
    </div>
  )
};

export default Tree;
