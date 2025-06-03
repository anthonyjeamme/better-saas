import { ItemData } from "./Layers.types";

export function flatItems(items: ItemData[]) {
  const flatItems = flat(items);
  const tree = computeTree(items);

  return {
    flatItems,
    tree,
  };
}

function flat(items: ItemData[]) {
  const flattenItems: ItemData[] = [];

  for (const item of items) {
    flattenItems.push(
      item.type === "folder" ? { ...item, children: [] } : item
    );

    if (item.type === "folder") {
      flattenItems.push(...flat(item.children));
    }
  }

  return flattenItems;
}

function computeTree(items: ItemData[], key = "root") {
  let tree: Record<string, string[]> = {
    [key]: items.map((item) => item.id),
  };

  for (const item of items) {
    if (item.type === "folder") {
      tree = {
        ...tree,
        ...computeTree(item.children, item.id),
      };
    }
  }

  return tree;
}

export function rebuildItems(
  {
    flatItems,
    tree,
  }: {
    flatItems: ItemData[];
    tree: Record<string, string[]>;
  },
  key = "root"
): ItemData[] {
  const childrenIds = tree[key] || [];

  return childrenIds.map((id) => {
    const flatItem = flatItems.find((item) => item.id === id);
    if (!flatItem) {
      throw new Error(`Item with id ${id} not found in flatItems`);
    }

    if (flatItem.type === "folder") {
      return {
        ...flatItem,
        children: rebuildItems({ flatItems, tree }, id),
      };
    }

    return flatItem;
  });
}
