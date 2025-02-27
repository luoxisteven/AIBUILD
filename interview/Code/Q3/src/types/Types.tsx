// type
export interface CategoryNode {
    categoryId: string
    name: string
    parent: string
    children: Array<CategoryNode>
  }