export enum ItemType {
  MOLD_22 = 'MOLD_22',
  MOLD_26 = 'MOLD_26',
  BOTTOM_22 = 'BOTTOM_22',
  BOTTOM_26 = 'BOTTOM_26',
}

export interface InventoryItem {
  id: ItemType;
  label: string;
  subLabel?: string;
  count: number;
  color: string;
}

export interface InventoryState {
  [ItemType.MOLD_22]: number;
  [ItemType.MOLD_26]: number;
  [ItemType.BOTTOM_22]: number;
  [ItemType.BOTTOM_26]: number;
}