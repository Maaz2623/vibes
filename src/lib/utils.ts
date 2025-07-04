import { type TreeItem } from "@/types"
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertFilesToTreeItems(files: { [path: string]: string }): TreeItem[] {
  interface TreeNode {
    [key: string]: TreeNode | null
  }

  const tree: TreeNode = {}

  const sortedPaths = Object.keys(files).sort()

  for (const filepath of sortedPaths) {
    const parts = filepath.split("/")
    let current: TreeNode = tree

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i]

      if (!current[part]) {
        current[part] = {}
      }

      // TypeScript needs to know this isn't null
      if (current[part] === null) {
        current[part] = {}
      }

      current = current[part] as TreeNode
    }

    const fileName = parts[parts.length - 1]
    current[fileName] = null
  }

  function convertNode(node: TreeNode, name?: string): TreeItem[] | TreeItem {
    const entries = Object.entries(node)
    if (entries.length === 0) {
      return name || ""
    }

    const children: TreeItem[] = []

    for (const [key, value] of entries) {
      if (value === null) {
        children.push(key)
      } else {
        const subtree = convertNode(value, key)
        if (Array.isArray(subtree)) {
          children.push([key, ...subtree])
        } else {
          children.push([key, subtree])
        }
      }
    }

    return children
  }

  const result = convertNode(tree)
  return Array.isArray(result) ? result : [result]
}
