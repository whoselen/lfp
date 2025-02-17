import { useImageUpload } from "@/hooks/use-image-upload";
import { getAvatarUrl } from "@/lib/utils";
import { ImagePlus, LoaderCircle } from "lucide-react";

function Avatar({
  defaultImage,
  onUpload,
}: {
  defaultImage?: string;
  onUpload: (url: string) => void;
}) {
  const {
    previewUrl,
    fileInputRef,
    handleThumbnailClick,
    uploading,
    handleUpload,
  } = useImageUpload({ url: defaultImage });

  const currentImage = previewUrl || defaultImage;

  return (
    <div className="">
      <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm shadow-black/10">
        {currentImage && (
          <img
            src={getAvatarUrl(currentImage)}
            className="h-full w-full object-cover"
            width={80}
            height={80}
            alt="pfp"
          />
        )}
        {uploading ? (
          <LoaderCircle
            size={26}
            strokeWidth={2}
            className="absolute text-primary animate-spin"
            aria-hidden="true"
          />
        ) : (
          <button
            type="button"
            className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
            onClick={handleThumbnailClick}
            aria-label="Change profile picture"
          >
            <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleUpload(e, onUpload)}
          className="hidden"
          accept="image/*"
          aria-label="Upload profile picture"
          disabled={uploading}
        />
      </div>
    </div>
  );
}

export default Avatar;
