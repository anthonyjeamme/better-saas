import { TextSelection } from "./TextEditor.types";

/**
 *
 */
export function getAbsoluteTextSelection(
  root: HTMLElement
): TextSelection | null {
  const selection = window.getSelection();

  if (!selection || selection.rangeCount === 0) {
    return null;
  }

  const range = selection.getRangeAt(0);
  const divs = Array.from(root.children) as HTMLDivElement[];

  const start = calculateAbsolutePosition(
    divs,
    range.startContainer,
    range.startOffset
  );
  const end = calculateAbsolutePosition(
    divs,
    range.endContainer,
    range.endOffset
  );

  if (start === null || end === null) {
    return null;
  }

  return { start, end };
}

function calculateAbsolutePosition(
  divs: HTMLDivElement[],
  targetContainer: Node,
  targetOffset: number
): number | null {
  let position = 0;

  for (let i = 0; i < divs.length; i++) {
    const div = divs[i];

    // Ajouter \n pour toutes les lignes sauf la première
    if (i > 0) {
      position += 1;
    }

    // Si le container cible est ce div lui-même (div vide)
    if (div === targetContainer) {
      return position;
    }

    // Si le container cible est contenu dans ce div
    if (div.contains(targetContainer)) {
      return position + getOffsetInDiv(div, targetContainer, targetOffset);
    }

    // Ajouter la longueur du contenu textuel de ce div
    position += getTextContentLength(div);
  }

  return null;
}

function getOffsetInDiv(
  div: HTMLDivElement,
  targetContainer: Node,
  targetOffset: number
): number {
  if (targetContainer === div) {
    return 0;
  }

  const walker = document.createTreeWalker(div, NodeFilter.SHOW_TEXT, null);

  let offset = 0;
  let node: Node | null;

  while ((node = walker.nextNode())) {
    if (node === targetContainer) {
      return offset + targetOffset;
    }
    offset += (node as Text).length;
  }

  return offset;
}

function getTextContentLength(div: HTMLDivElement): number {
  const walker = document.createTreeWalker(div, NodeFilter.SHOW_TEXT, null);

  let length = 0;
  let node: Node | null;

  while ((node = walker.nextNode())) {
    length += (node as Text).length;
  }

  return length;
}

/**
 *
 */
export function setAbsoluteTextSelection(
  root: HTMLElement,
  start: number,
  end: number
) {
  const selection = window.getSelection();
  if (!selection) return;

  const divs = Array.from(root.children) as HTMLDivElement[];

  const startPos = findPositionInDOM(divs, start);
  const endPos = findPositionInDOM(divs, end);

  if (!startPos || !endPos) return;

  const range = document.createRange();
  range.setStart(startPos.node, startPos.offset);
  range.setEnd(endPos.node, endPos.offset);

  selection.removeAllRanges();
  selection.addRange(range);
}

function findPositionInDOM(
  divs: HTMLDivElement[],
  targetPosition: number
): { node: Node; offset: number } | null {
  let currentPosition = 0;

  for (let i = 0; i < divs.length; i++) {
    const div = divs[i];

    // Ajouter \n pour toutes les lignes sauf la première
    if (i > 0) {
      if (currentPosition === targetPosition) {
        // Position exactement sur le \n : placer à la fin du div précédent
        const prevDiv = divs[i - 1];
        const lastTextNode = getLastTextNode(prevDiv);
        if (lastTextNode) {
          return { node: lastTextNode, offset: lastTextNode.length };
        } else {
          // Div précédent vide, placer à la fin du div
          return { node: prevDiv, offset: 0 };
        }
      }
      currentPosition += 1;
    }

    const divLength = getTextContentLength(div);

    // Si la position cible est dans ce div
    if (currentPosition + divLength >= targetPosition) {
      const offsetInDiv = targetPosition - currentPosition;

      // Si le div est vide
      if (divLength === 0) {
        return { node: div, offset: 0 };
      }

      // Trouver le noeud texte correspondant dans ce div
      const result = findTextNodeAtOffset(div, offsetInDiv);
      if (result) {
        return result;
      }
    }

    currentPosition += divLength;
  }

  // Position au-delà du contenu : placer à la fin du dernier div
  if (divs.length > 0) {
    const lastDiv = divs[divs.length - 1];
    const lastTextNode = getLastTextNode(lastDiv);
    if (lastTextNode) {
      return { node: lastTextNode, offset: lastTextNode.length };
    } else {
      return { node: lastDiv, offset: 0 };
    }
  }

  return null;
}

function findTextNodeAtOffset(
  div: HTMLDivElement,
  offset: number
): { node: Node; offset: number } | null {
  const walker = document.createTreeWalker(div, NodeFilter.SHOW_TEXT, null);

  let currentOffset = 0;
  let node: Node | null;

  while ((node = walker.nextNode())) {
    const textNode = node as Text;
    const nodeLength = textNode.length;

    if (currentOffset + nodeLength >= offset) {
      return { node: textNode, offset: offset - currentOffset };
    }

    currentOffset += nodeLength;
  }

  return { node: div, offset: 0 };
}

function getLastTextNode(div: HTMLDivElement): Text | null {
  const walker = document.createTreeWalker(div, NodeFilter.SHOW_TEXT, null);

  let lastTextNode: Text | null = null;
  let node: Node | null;

  while ((node = walker.nextNode())) {
    lastTextNode = node as Text;
  }

  return lastTextNode;
}
