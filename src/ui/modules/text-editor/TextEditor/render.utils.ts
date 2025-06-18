export function markdownToHTML(markdown: string) {
  return markdown
    .replace(/(\*\*\*)(.*?)(\*\*\*)/g, "<strong><em>$2</em></strong>")
    .replace(/(\*\*)(.*?)(\*\*)/g, "<strong>$2</strong>")
    .replace(/(\_\_)(.*?)(\_\_)/g, "<em>$2</em>")
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    .replace(/\n---\n/g, "\n<hr />\n")
    .split("\n")
    .map((line) => (line === "<hr />" ? `<hr />` : `<div>${line}</div>`))
    .join("");
}
