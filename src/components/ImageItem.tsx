import type { Image } from '../types/image'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface ImageItemProps {
  image: Image
  isFeatured?: boolean
  isSelected?: boolean
  onToggleSelect: (id: string) => void
}

function ImageItem({ image, isFeatured, isSelected, onToggleSelect }: ImageItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleSelectClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleSelect(image.id)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        group relative overflow-hidden rounded-2xl
        cursor-grab active:cursor-grabbing
        transition-all duration-200
        ${isDragging ? 'opacity-50 z-50' : 'hover:scale-105'}
        ${isSelected ? 'ring-4 ring-white-500 outline outline-2 outline-white outline-offset-0' : ''}
      `}
    >
      <img
        src={image.url}
        alt={image.alt}
        className="w-full h-full object-cover"
      />

      {isSelected && (
        <div className="absolute inset-0 bg-white-500/20" />
      )}

      <button
        onClick={handleSelectClick}
        aria-label={`Select image ${image.alt}`}
        className={`
          absolute top-2 left-2
          w-5 h-5 rounded-full border-2 border-white
          flex items-center justify-center
          transition-all duration-200
          ${isSelected
            ? 'bg-white-500 opacity-100'
            : 'bg-black/30 opacity-0 group-hover:opacity-100'
          }
        `}
      >
        {isSelected && (
          <span className="text-white text-xs font-bold">✓</span>
        )}
      </button>

      {isFeatured && (
        <>
          <div className="absolute top-4 right-4 text-white text-2xl drop-shadow-lg">
            🤍
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="text-white text-sm font-semibold drop-shadow-lg">
              Favorites
            </span>
          </div>
        </>
      )}
    </div>
  )
}

export default ImageItem