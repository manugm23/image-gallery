import type { Image } from '../types/image'

interface ImageItemProps {
  image: Image
  isFeatured?: boolean
}

function ImageItem({ image, isFeatured }: ImageItemProps) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl cursor-pointer
        transition-transform duration-200 hover:scale-105
      `}
    >
      <img
        src={image.url}
        alt={image.alt}
        className="w-full h-full object-cover"
      />
      {isFeatured && (
        <>
          <div className="absolute top-4 right-4 text-white text-2xl drop-shadow-lg">
            🤍
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="text-white text-sm font-semibold drop-shadow-lg">
              Favoritos
            </span>
          </div>
        </>
      )}
    </div>
  )
}

export default ImageItem