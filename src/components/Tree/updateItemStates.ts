import { CheckboxState, ItemState } from "./Tree";

export const updateItemStates = (oldState: ItemState[], items: Item[], clickedId: string) => {
  const newState = oldState.map((i) => ({ ...i }));
  // getters
  const getItemState = (id: string) => {
    return newState.find((i) => i.id === id)?.state;
  };
  // setters
  const updateParent = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const parent = items.find((i) => i.id === item.parent);
    if (!parent) return;
    const childIds = items.filter((i) => i.parent === parent.id).map((i) => i.id);
    const childStates = childIds.map((childId) => getItemState(childId));
    if (childStates.length === childStates.filter((s) => s === CheckboxState.CHECKED).length) {
      const pItem = newState.find((i) => i.id === parent.id);
      if (pItem) pItem.state = CheckboxState.CHECKED;
    } else if (childStates.length === childStates.filter((s) => s === CheckboxState.UNCHECKED).length) {
      const pItem = newState.find((i) => i.id === parent.id);
      if (pItem) pItem.state = CheckboxState.UNCHECKED;
    } else {
      const pItem = newState.find((i) => i.id === parent.id);
      if (pItem) pItem.state = CheckboxState.INDETERMINATE;
    }
    updateParent(parent.id);
  };
  const setUnchecked = (id: string) => {
    const item = newState.find((i) => i.id === id);
    if (!item) return;
    item.state = CheckboxState.UNCHECKED;
    items
      .filter((i) => i.parent === id)
      .map((i) => i.id)
      .forEach((childId) => setUnchecked(childId));
    updateParent(id);
  };
  const setChecked = (id: string) => {
    const item = newState.find((i) => i.id === id);
    if (!item) return;
    item.state = CheckboxState.CHECKED;
    items
      .filter((i) => i.parent === id)
      .map((i) => i.id)
      .forEach((childId) => setChecked(childId));
    updateParent(id);
  };
  // actual logic
  const itemState = getItemState(clickedId);
  if (itemState === CheckboxState.CHECKED) {
    setUnchecked(clickedId);
  } else {
    setChecked(clickedId);
  }
  return newState;
};
