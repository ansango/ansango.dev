import type { Entries } from "@/lib/collections";

type NodeItem = {
  name: string;
  type: string;
  path: string;
  children?: NodeItem[];
  level: number;

};

export const getWikiTree = (entries: Entries) => {
  const mappedEntries = entries.filter(({ collection }) => collection === "wiki").map((entry) => {
    const { collection, id, data } = entry;
    const { title } = data;
    return { path: `/${collection}/${id}`, title, collection, id };
  }).sort((a, b) => a.title.localeCompare(b.title));

  const structure: NodeItem[] = [];

  mappedEntries.forEach((entry) => {
    const parts = entry.path.split('/').filter(part => part !== 'wiki' && part !== '');
    let currentLevel = structure;

    parts.forEach((part, index) => {
      let existingPath = currentLevel.find(item => item.name === part);
      const type = index === parts.length - 1 ? 'file' : 'folder';
      if (!existingPath) {
        existingPath = {
          name: type == "file" ? entry.title : part,
          type,
          path: `/${entry.collection}/${entry.id}`,
          children: [],
          level: index
        };
        currentLevel.push(existingPath);
      }
      currentLevel = existingPath.children || [];
    });
  });

  return structure.sort((a, b) => {
    if (a.type === b.type) {
      return a.name.localeCompare(b.name);
    }
    return a.type === 'folder' ? -1 : 1;
  });
};

const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

export function renderNode(node: NodeItem, level = 0): string {
  const isFolder = node.type === "folder";
  const hasChildren = node.children && node.children.length > 0;
  const paddingLeft = level * 12 + 8;

  if (isFolder && hasChildren) {
    return `
      <details class="group" ${level === 0 ? "open" : ""}>
        <summary class="flex cursor-pointer items-center gap-1.5 rounded px-2 py-1 text-sm transition-colors list-none font-semibold" style="padding-left: ${paddingLeft}px">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" class="size-4 shrink-0 text-muted transition-transform group-open:rotate-90" stroke-width="2">
            <path fill="currentColor" d="M10.586 6.343L12 4.93L19.071 12L12 19.071l-1.414-1.414L16.243 12z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" class="size-3.5 shrink-0 text-muted" stroke-width="2">
            <path fill="currentColor" fill-rule="evenodd" d="M4 1.5a2 2 0 0 0-2 2v1q0 .086.007.168A3 3 0 0 0 0 7.5v12a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3v-12a3 3 0 0 0-3-3h-9.126A4 4 0 0 0 8 1.5zm5.732 3A2 2 0 0 0 8 3.5H4v1zM3 6.5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1z" clip-rule="evenodd"/>
          </svg>
          <span class="truncate">${capitalize(node.name.replaceAll("-", " "))}</span>
        </summary>
        <div class="mt-0.5">
          ${node.children?.map((child) => renderNode(child, level + 1)).join("")}
        </div>
      </details>
    `;
  } else if (isFolder) {
    return `
      <div class="flex items-center gap-1.5 rounded px-2 py-1 text-sm ${level === 0 ? "font-semibold" : ""}" style="padding-left: ${paddingLeft}px">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" class="size-4 shrink-0 text-muted" stroke-width="2">
        <path fill="currentColor" fill-rule="evenodd" d="M4 1.5a2 2 0 0 0-2 2v1q0 .086.007.168A3 3 0 0 0 0 7.5v12a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3v-12a3 3 0 0 0-3-3h-9.126A4 4 0 0 0 8 1.5zm5.732 3A2 2 0 0 0 8 3.5H4v1zM3 6.5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1z" clip-rule="evenodd"/>
      </svg>  
      <svg class="h-3.5 w-3.5 shrink-0 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
        </svg>
        <span class="truncate">${capitalize(node.name.replaceAll("-", " "))}</span>
      </div>
    `;
  } else {
    return `
      <a href="${node.path}" class="flex items-center gap-1.5 rounded px-2 py-1 text-sm transition-colors" style="padding-left: ${paddingLeft}px">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" class="size-4 shrink-0 text-muted" stroke-width="2">
         <path fill="currentColor" fill-rule="evenodd" d="M3 5a3 3 0 0 1 3-3h8a7 7 0 0 1 7 7v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm10-1H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9h-6zm5.584 3A5.01 5.01 0 0 0 15 4.1V7z" clip-rule="evenodd"/>
        </svg>
        <span class="truncate">${capitalize(node.name.replaceAll("-", " "))}</span>
      </a>
    `;
  }
}


export function countEntries(nodes: NodeItem[]) {
  let count = 0;
  for (const node of nodes) {
    if (node.type === "file") {
      count++;
    }
    if (node.children) {
      count += countEntries(node.children);
    }
  }
  return count;
}

export function countCategories(nodes: NodeItem[]) {
  let count = 0;
  for (const node of nodes) {
    if (node.type === "folder" && node.level === 0) {
      count++;
      if (node.children) {
        count += countCategories(node.children);
      }
    }
  }
  return count;
}

