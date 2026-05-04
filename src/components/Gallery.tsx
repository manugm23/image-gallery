import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { INITIAL_IMAGES } from '../data/images'
import ImageItem from './ImageItem'

function Gallery() {
  const [images, setImages] = useState(INITIAL_IMAGES)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleDeleteSelected = () => {
    if (window.confirm(`Delete ${selectedIds.size} ${selectedIds.size === 1 ? 'image' : 'images'}?`)) {
      setImages(images.filter(img => !selectedIds.has(img.id)))
      setSelectedIds(new Set())
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = images.findIndex(img => img.id === active.id)
    const newIndex = images.findIndex(img => img.id === over.id)

    setImages(arrayMove(images, oldIndex, newIndex))
  }

  const featured = images[0]
  const rest = images.slice(1)

  return (
    <div className="min-h-screen bg-black py-10 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-3">

        {selectedIds.size > 0 && (
          <div className="flex items-center justify-between bg-zinc-900 rounded-xl px-4 py-3">
            <span className="text-white text-sm">
              {selectedIds.size} {selectedIds.size === 1 ? 'image' : 'images'} selected
            </span>
            <button
              onClick={handleDeleteSelected}
              className="bg-white-500 hover:bg-white-600 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors duration-200"
            >
              Delete selected
            </button>
          </div>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={images.map(img => img.id)}
            strategy={rectSortingStrategy}
          >
            {featured && (
              <div className="flex justify-center">
                <div className="w-2/3">
                  <ImageItem
                    image={featured}
                    isFeatured={true}
                    isSelected={selectedIds.has(featured.id)}
                    onToggleSelect={handleToggleSelect}
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3">
              {rest.map((image) => (
                <ImageItem
                  key={image.id}
                  image={image}
                  isFeatured={false}
                  isSelected={selectedIds.has(image.id)}
                  onToggleSelect={handleToggleSelect}
                />
              ))}
            </div>

          </SortableContext>
        </DndContext>

      </div>
    </div>
  )
}

export default Gallery