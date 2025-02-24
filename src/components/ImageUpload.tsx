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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      classifyImage(file);
    }
  };

  // Handle camera capture (placeholder for now)
  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera stream:", stream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Send the image to the backend (ViT classification + YouTube search)
  const classifyImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

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
    <div className="space-y-4 w-full max-w-2xl font-montserrat">
      <div className="flex gap-4">
        {/* Upload Image Button (No Border) */}
        <button
          className="flex-1 h-32 flex flex-col items-center justify-center gap-2 rounded-full bg-[#2f3640] text-white font-semibold shadow-lg transition-all hover:bg-[#3a3f4b]"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-6 h-6 text-[#2AF598]" />
          <span className="text-lg">Upload Image</span>
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </button>

        {/* Take Photo Button (No Border) */}
        <button
          className="flex-1 h-32 flex flex-col items-center justify-center gap-2 rounded-full bg-[#2f3640] text-white font-semibold shadow-lg transition-all hover:bg-[#3a3f4b]"
          onClick={handleCameraCapture}
        >
          <Camera className="w-6 h-6 text-[#2AF598]" />
          <span className="text-lg">Take Photo</span>
        </button>
      </div>

      {/* Preview the uploaded image */}
      {image && (
        <div className="mt-4">
          <img src={image} alt="Uploaded" className="max-w-full rounded-lg" />
        </div>
      )}

      {/* Styled Detected Label */}
      {detectedLabel && (
        <div className="mt-4 flex items-center justify-center gap-2 w-full rounded-full border-2 border-[#2AF598] bg-[#2f3640] p-3 shadow-lg text-lg font-semibold text-white transition-transform duration-300">
          {detectedLabel}
        </div>
      )}

      {/* Styled YouTube Results */}
      {youtubeResults.length > 0 && (
        <div className="mt-4 p-4 w-full rounded-xl border-2 border-[#2AF598] bg-[#2f3640] shadow-lg">
          <h2 className="text-xl font-bold text-white mb-3">YouTube Results</h2>
          <ul className="space-y-2">
            {youtubeResults.map((result, index) => (
              <li key={index} className="p-3 rounded-lg bg-[#1e242d] hover:bg-[#3a3f4b] transition-all">
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2AF598] hover:text-[#009EFD] font-semibold"
                >
                  {result.title}
                </a>
                <p className="text-gray-400 text-sm">by {result.uploader} ({result.duration} sec)</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
