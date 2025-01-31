import { useState } from "react";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

export const ImageUploader = ({ onImagesSelected }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Créer les URLs de prévisualisation
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);

    // Stocker les fichiers
    setSelectedFiles([...selectedFiles, ...files]);

    // Informer le parent
    onImagesSelected(files);
  };

  const removeImage = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);

    // Libérer l'URL de prévisualisation
    URL.revokeObjectURL(previewUrls[index]);

    setSelectedFiles(newFiles);
    setPreviewUrls(newPreviewUrls);
    onImagesSelected(newFiles);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          id="image-upload"
          disabled={isLoading}
          label="Images"
        />
        <label htmlFor="image-upload" className="cursor-pointer inline-block">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            isLoading={isLoading}
          >
            Sélectionner des images
          </Button>
        </label>
      </div>

      {previewUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
