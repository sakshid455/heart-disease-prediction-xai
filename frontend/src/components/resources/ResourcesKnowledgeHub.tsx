import React, { useState, useMemo } from 'react'
import { ResourceCard } from './ResourceCard'
import { ResourceDetailsModal } from './ResourceDetailsModal'
import { RESOURCES_DATA } from './data'
import { ResourceCategory, ResourceItem } from './types'
import { Search, AlertCircle, BookOpen } from 'lucide-react'

interface ResourcesKnowledgeHubProps {
  searchQuery: string
  selectedCategory: ResourceCategory
  onResetFilters: () => void
}

export const ResourcesKnowledgeHub: React.FC<ResourcesKnowledgeHubProps> = ({
  searchQuery,
  selectedCategory,
  onResetFilters,
}) => {
  const [activeModalItem, setActiveModalItem] = useState<ResourceItem | null>(null)

  const filteredItems = useMemo(() => {
    return RESOURCES_DATA.filter((item) => {
      const matchCat =
        selectedCategory === 'All' || item.category === selectedCategory
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.source.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchSearch
    })
  }, [searchQuery, selectedCategory])

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#17352D]">
              {selectedCategory === 'All' ? 'All Verified Resources' : `${selectedCategory} Resources`}
            </h2>
            <p className="text-xs text-[#5C6B64] mt-1">
              Curated clinical references, academic citations, and internal technical documentation.
            </p>
          </div>

          <div className="text-xs font-mono text-[#5C6B64] bg-[#FAF8F4] px-3 py-1.5 rounded-lg border border-[#D9C7A5]/50 self-start sm:self-auto">
            {filteredItems.length} article{filteredItems.length === 1 ? '' : 's'} available
          </div>
        </div>

        {/* Resources Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ResourceCard
                key={item.id}
                item={item}
                onOpenModal={(res) => setActiveModalItem(res)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-[#FAF8F4] rounded-3xl p-12 text-center max-w-lg mx-auto border border-[#D9C7A5]/60 shadow-subtle space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C87868]/10 text-[#C87868] flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#17352D]">
              No resources found
            </h3>
            <p className="text-xs text-[#5C6B64] leading-relaxed">
              No literature or guidelines match &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;. Try clearing your search query or selecting &ldquo;All&rdquo;.
            </p>
            <button
              onClick={onResetFilters}
              className="px-5 py-2.5 rounded-xl bg-[#17352D] text-[#F7F4ED] text-xs font-semibold hover:bg-[#102721] transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Details Modal */}
        <ResourceDetailsModal
          resource={activeModalItem}
          onClose={() => setActiveModalItem(null)}
        />

      </div>
    </section>
  )
}
