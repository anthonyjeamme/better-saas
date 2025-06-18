export type ItemData<ItemPayload = unknown, FolderPayload = unknown> =
  | FileItemData<ItemPayload>
  | FolderItemData<FolderPayload>;

export type FileItemData<ItemPayload = unknown> = {
  id: string;
  type: "item";
  name: string;
  label?: string;
  iconName?: string;
  payload?: ItemPayload;
};

export type FolderItemData<FolderPayload = unknown> = {
  id: string;
  type: "folder";
  name: string;
  children: ItemData[];
  label?: string;
  iconName?: string;
  payload?: FolderPayload;
};

export type FlatFolderItemData<FolderPayload = unknown> = {
  id: string;
  type: "folder";
  name: string;
  children: [];
  label?: string;
  iconName?: string;
  payload?: FolderPayload;
};

export type FlatData = {
  flatItems: (ItemData | FlatFolderItemData)[];
  tree: Record<string, string[]>;
};

export type CustomMenuItem<TItem> = {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: TItem, close: () => void) => void;
};
