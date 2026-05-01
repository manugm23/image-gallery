import { useState } from 'react'
import { INITIAL_IMAGES } from '../data/images'
import ImageItem from './ImageItem'

function Gallery() {
  const [images, setImages] = useState(INITIAL_IMAGES)

  const handleDelete = (id: string) => {
    if (window.confirm('¿Delete this image?')) {
      setImages(images.filter(img => img.id !== id))
    }
  }

  const featured = images[0]
  const rest = images.slice(1)

  return (
    <div className="min-h-screen bg-black py-10 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-3">

        {featured && (
          <div className="flex justify-center">
            <div className="w-2/3">
              <ImageItem
                image={featured}
                isFeatured={true}
                onDelete={handleDelete}
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
              onDelete={handleDelete}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Gallery