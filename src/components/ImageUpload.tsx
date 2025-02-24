import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Camera } from "lucide-react";

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
  const navigate = useNavigate();

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
        setDetectedLabel(data.label);
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
        <button
          className="flex-1 h-32 flex flex-col items-center justify-center gap-2 rounded-full border-2 border-[#2AF598] bg-[#2f3640] text-white font-semibold shadow-lg transition-all hover:bg-[#3a3f4b] hover:border-[#009EFD]"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-6 h-6 text-[#2AF598]" />
          <span className="text-lg">Upload Image</span>
          <Input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
        </button>
      </div>

      {image && <img src={image} alt="Uploaded" className="max-w-full rounded-lg" />}

      {detectedLabel && (
        <div className="mt-4 flex items-center justify-center gap-2 w-full rounded-full border-2 border-[#2AF598] bg-[#2f3640] p-3 shadow-lg text-lg font-semibold text-white">
          Detected: {detectedLabel}
        </div>
      )}

      {youtubeResults.length > 0 && (
        <div className="mt-4 p-4 w-full rounded-xl border-2 border-[#2AF598] bg-[#2f3640] shadow-lg">
          <h2 className="text-xl font-bold text-white mb-3">YouTube Results</h2>
          <ul className="space-y-2">
            {youtubeResults.map((result, index) => (
              <li key={index} className="p-3 rounded-lg bg-[#1e242d] hover:bg-[#3a3f4b] transition-all">
                <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-[#2AF598] hover:text-[#009EFD] font-semibold">
                  {result.title}
                </a>
                <p className="text-gray-400 text-sm">by {result.uploader} ({result.duration} sec)</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {youtubeResults.length > 0 && (
        <Button onClick={() => navigate(`/quiz/${detectedLabel}`)} className="w-full bg-[#2AF598] text-black">
          Attempt Quiz
        </Button>
      )}
    </div>
  );
};

export default ImageUpload;
