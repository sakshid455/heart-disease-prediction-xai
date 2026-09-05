import React, { useState, useEffect } from 'react'
import {
  ResourcesHero,
  FeaturedTopicsSection,
  ResourcesKnowledgeHub,
  RESOURCES_DATA,
  ResourceCategory,
} from '../components/resources'

export const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('All')

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Resources & Literature — CardioAI'
  }, [])

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
  }

  const filteredCount = RESOURCES_DATA.filter((item) => {
    const matchCat =
      selectedCategory === 'All' || item.category === selectedCategory
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  }).length

  return (
    <div className="min-h-screen bg-canvas">
      {/* Hero with Search and Category Filter Chips */}
      <ResourcesHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        totalCount={RESOURCES_DATA.length}
        filteredCount={filteredCount}
      />

      {/* Featured Topics Directory */}
      <FeaturedTopicsSection
        onSelectCategory={(cat) => {
          setSelectedCategory(cat)
          const hubEl = document.getElementById('resources-hub')
          if (hubEl) hubEl.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      {/* Main Knowledge Hub Cards Grid & Details Modal */}
      <div id="resources-hub" className="scroll-mt-16">
        <ResourcesKnowledgeHub
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onResetFilters={handleResetFilters}
        />
      </div>
    </div>
  )
}
