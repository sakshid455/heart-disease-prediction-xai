export type ResourceCategory =
  | 'All'
  | 'Heart Health'
  | 'Machine Learning'
  | 'Synthetic Data'
  | 'Explainable AI'
  | 'Research'

export interface ResourceItem {
  id: string
  title: string
  category: Exclude<ResourceCategory, 'All'>
  subcategory: string
  description: string
  readTime: string
  source: string
  sourceType: 'External Journal / Guidelines' | 'Project Methodology' | 'Official Archive'
  linkUrl: string
  isExternal: boolean
  keyPoints: string[]
  extendedContent: string
}
