import { useState } from "react";

import {
  useTreeStructure,
  TreeStructureLayerData,
  TreeStructureLayerItem,
  TreeStructureLayerElementItem,
  TreeStructureLayerFolderItem,
} from "../../hooks/useTreeStructure";

type LayerElement<TElement = unknown> = {
  name: string;
  config?: {
    disableRemove?: boolean;
    disableRename?: boolean;
    disableDrag?: boolean;
  };
} & TElement;

type LayerFolder<TFolder = unknown> = {
  name: string;
  config?: {
    disableRemove?: boolean;
    disableRename?: boolean;
    disableDrag?: boolean;
  };
} & TFolder;

export type LayerItem<
  TElement = unknown,
  TFolder = unknown
> = TreeStructureLayerItem<LayerElement<TElement>, LayerFolder<TFolder>>;
export type LayerElementItem<TElement = unknown> =
  TreeStructureLayerElementItem<LayerElement<TElement>>;
export type LayerFolderItem<TFolder = unknown> = TreeStructureLayerFolderItem<
  LayerFolder<TFolder>
>;

export type LayersHook<TElement = unknown, TFolder = unknown> = ReturnType<
  typeof useLayers<TElement, TFolder>
>;

export function useLayers<TElement = unknown, TFolder = unknown>(
  initData?: TreeStructureLayerData<
    LayerElement<TElement>,
    LayerFolder<TFolder>
  >
) {
  const tree = useTreeStructure<LayerElement<TElement>, LayerFolder<TFolder>>(
    initData
  );

  const [activeLayerIds, setActiveLayerIds] = useState<string[]>([]);

  return { tree, activeLayerIds, setActiveLayerIds };
}
