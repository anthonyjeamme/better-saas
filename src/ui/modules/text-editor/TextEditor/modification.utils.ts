import { TextSelection } from "./TextEditor.types";

export function $insertText(
  previous: string,
  text: string,
  selection: TextSelection
) {
  return (
    previous.slice(0, selection.start) + text + previous.slice(selection.end)
  );
}

export function $deleteText(previous: string, selection: TextSelection) {
  if (selection.start === selection.end) {
    return (
      previous.slice(0, selection.start) + previous.slice(selection.end + 1)
    );
  }
  return previous.slice(0, selection.start) + previous.slice(selection.end);
}

export function $backspaceText(previous: string, selection: TextSelection) {
  if (selection.start === selection.end) {
    return (
      previous.slice(0, selection.start - 1) + previous.slice(selection.end)
    );
  }
  return previous.slice(0, selection.start) + previous.slice(selection.end);
}

export function markdownKeywordLength(text: string) {
  return text.replace(/(\*\*)(.*?)(\*\*)/g, "$2").length;
}

export function $wrapText(
  previous: string,
  selection: TextSelection,
  before: string,
  after: string
) {
  return (
    previous.slice(0, selection.start) +
    before +
    previous.slice(selection.start, selection.end) +
    after +
    previous.slice(selection.end)
  );
}
