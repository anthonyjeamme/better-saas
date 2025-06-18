import { useState } from "react";

export type TreeStructureLayerItem<TElement = unknown, TFolder = unknown> =
  | TreeStructureLayerFolderItem<TFolder>
  | TreeStructureLayerElementItem<TElement>;

export type TreeStructureLayerFolderItem<TFolder = unknown> = {
  id: string;
  type: "folder";
} & TFolder;

export type TreeStructureLayerElementItem<TElement = unknown> = {
  id: string;
  type: "element";
} & TElement;

export type TreeStructureLayerData<TItem = unknown, TFolder = unknown> = {
  items: TreeStructureLayerItem<TItem, TFolder>[];
  tree: Record<string, string[]>;
};

export type TreeStructureHook<
  TElement = unknown,
  TFolder = unknown
> = ReturnType<typeof useTreeStructure<TElement, TFolder>>;

export function useTreeStructure<TElement = unknown, TFolder = unknown>(
  initData?: TreeStructureLayerData<TElement, TFolder>
) {
  const [data, setData] = useState<TreeStructureLayerData<TElement, TFolder>>(
    initData || {
      items: [],
      tree: {
        root: [],
      },
    }
  );

  return {
    data,
    updateItem,
    moveItem,
    removeItem,
    addItem,
    getItem,
    addFolder,
    getFolderItems,
    getItemParent,
    getItemAncestors,
    getItemIndexInFolder,
  };

  function getItemIndexInFolder(id: string) {
    const parentId = getItemParent(id);
    if (!parentId) return 0;

    const children = data.tree[parentId] || [];

    return children.indexOf(id);
  }

  function getItemParent(id: string) {
    for (const [folderId, children] of Object.entries(data.tree)) {
      if (children.includes(id)) {
        return folderId;
      }
    }

    return null;
  }

  function updateItem(
    id: string,
    update_data: Partial<TreeStructureLayerItem<TElement, TFolder>>
  ) {
    setData((data) => ({
      ...data,
      items: data.items.map((item) =>
        item.id === id ? { ...item, ...update_data } : item
      ),
    }));
  }

  function getItemAncestors(id: string) {
    const ancestors: string[] = [];
    let currentId = id;

    while (true) {
      const parentId = getItemParent(currentId);
      if (!parentId || parentId === "root") {
        break;
      }
      ancestors.push(parentId);
      currentId = parentId;
    }

    return ancestors;
  }

  function moveItem(
    id: string,
    targetFolderId: string | null,
    targetIndex: number
  ) {
    setData((data) => {
      const newTree = { ...data.tree };

      let currentFolderId: string | null = null;

      for (const [folderId, children] of Object.entries(newTree)) {
        if (children.includes(id)) {
          currentFolderId = folderId;
          newTree[folderId] = children.filter((childId) => childId !== id);
          break;
        }
      }

      const targetFolder = targetFolderId || "root";
      if (!newTree[targetFolder]) {
        newTree[targetFolder] = [];
      }

      const targetArray = [...newTree[targetFolder]];
      targetArray.splice(targetIndex, 0, id);
      newTree[targetFolder] = targetArray;

      return {
        ...data,
        tree: newTree,
      };
    });
  }

  function removeItem(id: string) {
    setData((data) => {
      const itemToRemove = data.items.find((item) => item.id === id);
      if (!itemToRemove) return data;

      const itemsToRemove = new Set<string>();
      const collectItemsToRemove = (itemId: string) => {
        itemsToRemove.add(itemId);
        const item = data.items.find((item) => item.id === itemId);
        if (item?.type === "folder") {
          const children = data.tree[itemId] || [];
          children.forEach(collectItemsToRemove);
        }
      };

      collectItemsToRemove(id);

      const newTree = { ...data.tree };
      for (const [folderId, children] of Object.entries(newTree)) {
        newTree[folderId] = children.filter(
          (childId) => !itemsToRemove.has(childId)
        );
      }

      itemsToRemove.forEach((itemId) => {
        delete newTree[itemId];
      });

      return {
        ...data,
        items: data.items.filter((item) => !itemsToRemove.has(item.id)),
        tree: newTree,
      };
    });
  }

  function addFolder(
    folderId: string | null,
    index: number,
    data: TFolder
  ): string | null {
    const newItem: TreeStructureLayerItem<TElement, TFolder> = {
      id: Date.now() + "-" + Math.random().toString().replace("0.", ""),
      type: "folder",
      ...data,
    };

    const _folderId = folderId || "root";

    setData((data) => ({
      ...data,
      items: [...data.items, newItem],
      tree: {
        ...data.tree,
        [newItem.id]: [],
        [_folderId]: [
          ...(data.tree[_folderId] || []).slice(0, index),
          newItem.id,
          ...(data.tree[_folderId] || []).slice(index),
        ],
      },
    }));

    return newItem.id;
  }

  function addItem(folderId: string | null, index: number, data: TElement) {
    const newItem: TreeStructureLayerItem<TElement, TFolder> = {
      id: Date.now() + "-" + Math.random().toString().replace("0.", ""),
      type: "element",
      ...data,
    };

    const _folderId = folderId || "root";

    setData((data) => ({
      ...data,
      items: [...data.items, newItem],
      tree: {
        ...data.tree,
        [_folderId]: [
          ...(data.tree[_folderId] || []).slice(0, index),
          newItem.id,
          ...(data.tree[_folderId] || []).slice(index),
        ],
      },
    }));
  }

  function getItem(id: string) {
    return data.items.find((item) => item.id === id);
  }

  function getFolderItems(id: string | null) {
    const _id = id || "root";

    const ids = data.tree[_id] || [];

    const items = ids
      .map((id) => data.items.find((item) => item.id === id))
      .filter(Boolean);

    return items as TreeStructureLayerItem<TElement, TFolder>[];
  }
}
