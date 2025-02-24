
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Camera } from "lucide-react";

const ImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Handle camera stream (implementation needed)
      console.log("Camera stream:", stream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-2xl">
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="flex-1 h-32 flex flex-col items-center justify-center gap-2 border-dashed"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-6 h-6" />
          <span>Upload Image</span>
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </Button>
        <Button
          variant="outline"
          className="flex-1 h-32 flex flex-col items-center justify-center gap-2"
          onClick={handleCameraCapture}
        >
          <Camera className="w-6 h-6" />
          <span>Take Photo</span>
        </Button>
      </div>
      {image && (
        <div className="mt-4">
          <img src={image} alt="Uploaded" className="max-w-full rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
