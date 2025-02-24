import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Camera } from "lucide-react";

// Define a TypeScript interface for YouTube results
interface YoutubeResult {
  title: string;
  url: string;
  uploader: string;
  duration: number;
}

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [detectedLabel, setDetectedLabel] = useState<string>("");
  const [youtubeResults, setYoutubeResults] = useState<YoutubeResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection from upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Display the image as preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Send the image to the backend for classification and YouTube search
      classifyImage(file);
    }
  };

  // Handle camera capture (placeholder for now)
  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera stream:", stream);
      // You could implement capturing a frame from the video stream here
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Send the image to the backend (ViT classification + YouTube search)
  const classifyImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      // Call the integrated endpoint
      const response = await fetch("http://127.0.0.1:5000/classify_search", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.error) {
        setDetectedLabel(`Error: ${data.error}`);
        setYoutubeResults([]);
      } else {
        setDetectedLabel(`Detected: ${data.label}`);
        setYoutubeResults(data.youtube_results);
      }
    } catch (err) {
      console.error("Classification error:", err);
      setDetectedLabel("Error classifying image.");
      setYoutubeResults([]);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-2xl">
      <div className="flex gap-4">
      <Button
    variant="outline"
    className="flex-1 h-32 flex flex-col items-center justify-center gap-2 border-dashed rounded-lg font-sans transition-all duration-300 ease-in-out transform"
    style={{ 
        borderColor: '#9370DB',
        color: '#A020F0',
        backgroundColor: 'rgba(224, 176, 255, 0.1)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Subtle background shadow
    }}
    _hover={{
        backgroundColor: 'rgba(224, 176, 255, 0.3)',
        boxShadow: '0 0 10px rgba(160, 32, 240, 0.5)', // Violet glow on hover
        transform: 'scale(1.05)', // Slight scale up on hover
    }}
    onClick={() => fileInputRef.current?.click()}
>
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="#A020F0">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
    </svg>
    <span className="font-medium" style={{ color: '#A020F0' }}>Upload Image</span>
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

      {/* Preview the uploaded image */}
      {image && (
        <div className="mt-4 flex justify-center">
          <img src={image} alt="Uploaded" className="max-w-full rounded-lg"  />
        </div>
      )}

      {/* Show the detected label */}
      {detectedLabel && (
        <div className="mt-4 p-2 bg-gray-100 text-gray-800 rounded">
          {detectedLabel}
        </div>
      )}

      {/* Display YouTube Results */}
      {youtubeResults.length > 0 && (
        <div className="mt-4 p-2 bg-gray-50 text-gray-800 rounded">
          <h2 className="text-xl font-bold mb-2">YouTube Results</h2>
          <ul>
            {youtubeResults.map((result, index) => (
              <li key={index} className="mb-2">
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {result.title}
                </a>{" "}
                by {result.uploader} ({result.duration} sec)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
