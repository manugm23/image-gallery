import type { Image } from '../types/image'

interface ImageItemProps {
  image: Image
  isFeatured?: boolean
}

function ImageItem({ image, isFeatured }: ImageItemProps) {
  return (
    <div style={{ border: isFeatured ? '3px solid gold' : '1px solid gray' }}>
      <img
        src={image.url}
        alt={image.alt}
        style={{ width: '100%', display: 'block' }}
      />
    </div>
  )
}

export default ImageItem