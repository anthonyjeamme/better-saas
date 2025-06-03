export type ItemData = FileItemData | FolderItemData;

export type FileItemData = {
  id: string;
  type: "item";
  name: string;
  label?: string;
  iconName?: string;
};

export type FolderItemData = {
  id: string;
  type: "folder";
  name: string;
  children: ItemData[];
  label?: string;
  iconName?: string;
};

export type FlatFolderItemData = {
  id: string;
  type: "folder";
  name: string;
  children: [];
  label?: string;
  iconName?: string;
};

export type FlatData = {
  flatItems: (ItemData | FlatFolderItemData)[];
  tree: Record<string, string[]>;
};
