import type { CollectionName } from "@/content.config";
import type { Entries } from "@/lib/collections";

export type NodeItem = {
  name: string;
  type: string;
  path: string;
  children?: NodeItem[];
  level: number;

};

export const getTreeNode = (entries: Entries, collectionName: CollectionName) => {
  const mappedEntries = entries.filter(({ collection }) => collection === collectionName).map((entry) => {
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

export function sortTreeNodeFilesFirst(nodes: NodeItem[]): NodeItem[] {
  // Ordenar recursivamente: archivos primero, luego carpetas
  return nodes
    .map(node => ({
      ...node,
      children: node.children ? sortTreeNodeFilesFirst(node.children) : undefined
    }))
    .sort((a, b) => {
      // Si son del mismo tipo, ordenar alfabéticamente
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      // Archivos primero (file), luego carpetas (folder)
      return a.type === 'file' ? -1 : 1;
    });
}

