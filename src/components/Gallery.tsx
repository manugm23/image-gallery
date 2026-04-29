import { useState } from 'react'
import { INITIAL_IMAGES } from '../data/images'
import ImageItem from './ImageItem'

function Gallery() {
  const [images, _setImages] = useState(INITIAL_IMAGES)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '24px' }}>
      {images.map((image, index) => (
        <ImageItem
          key={image.id}
          image={image}
          isFeatured={index === 0}
        />
      ))}
    </div>
  )
}

export default Gallery