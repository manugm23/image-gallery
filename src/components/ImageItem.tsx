import type { Image } from "../types/image";

interface ImageItemProps {
  image: Image;
  isFeatured?: boolean;
  onDelete: (id: string) => void;
}

function ImageItem({ image, isFeatured, onDelete }: ImageItemProps) {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(image.id);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl cursor-pointer transition-transform duration-200 hover:scale-105">
      <img
        src={image.url}
        alt={image.alt}
        className="w-full h-full object-cover"
      />

      <button
        onClick={handleDeleteClick}
        aria-label={`Delete image ${image.alt}`}
        className="
          absolute top-2 left-2
          bg-white-500 hover:bg-white-600
          text-white text-xs font-bold
          w-6 h-6 rounded-full
          flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
        "
      >
        ✕
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
  );
}

export default ImageItem;
