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
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const [stream, setStream] = useState<MediaStream | null>(null);

  // 📌 Handles Image Upload
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

  // 📌 Calls API to classify image
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

  // 📌 Starts Camera Stream
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access denied!", err);
      alert("Please allow camera access!");
    }
  };

  // 📌 Captures Image & Sends for Classification
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (context) {
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const imageData = canvasRef.current.toDataURL("image/png");
      setImage(imageData);

      canvasRef.current.toBlob((blob) => {
        if (blob) {
          classifyImage(new File([blob], "captured.png", { type: "image/png" }));
        }
      });
    }
    stopCamera();
  };

  // 📌 Stops Camera Stream
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-2xl font-montserrat">
      <div className="flex gap-4">
        {/* 📌 Upload Image Button */}
        <button
          className="flex-1 h-32 flex flex-col items-center justify-center gap-2 rounded-full 
                     border-2 border-[#2AF598] bg-[#2f3640] text-white font-semibold shadow-lg 
                     transition-all hover:bg-[#3a3f4b] hover:border-[#009EFD]"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-6 h-6 text-[#2AF598]" />
          <span className="text-lg">Upload Image</span>
          <Input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
        </button>

        {/* 📌 Take Photo Button */}
        {stream ? (
          <button
            className="flex-1 h-32 flex flex-col items-center justify-center gap-2 rounded-full 
                       border-2 border-[#2AF598] bg-[#2f3640] text-white font-semibold shadow-lg 
                       transition-all hover:bg-[#3a3f4b] hover:border-[#009EFD]"
            onClick={captureImage}
          >
            <Camera className="w-6 h-6 text-[#2AF598]" />
            <span className="text-lg">Capture Photo</span>
          </button>
        ) : (
          <button
            className="flex-1 h-32 flex flex-col items-center justify-center gap-2 rounded-full 
                       border-2 border-[#2AF598] bg-[#2f3640] text-white font-semibold shadow-lg 
                       transition-all hover:bg-[#3a3f4b] hover:border-[#009EFD]"
            onClick={startCamera}
          >
            <Camera className="w-6 h-6 text-[#2AF598] justify-center" />
            <span className="text-lg">Take Photo</span>
          </button>
        )}
      </div>

      {/* 📌 Display Image */}
      {image && (
  <div className="flex justify-center items-center">
    <img src={image} alt="Captured" className="max-w-full rounded-lg" />
  </div>
)}


      {/* 📌 Hidden Video & Canvas */}
      <video ref={videoRef} className={stream ? "w-64 h-48 border rounded-lg shadow-md" : "hidden"} autoPlay></video>
      <canvas ref={canvasRef} className="hidden" width="640" height="480"></canvas>

      {/* 📌 Detected Label */}
      {detectedLabel && (
        <div className="mt-4 flex items-center justify-center gap-2 w-full rounded-full 
                        border-2 border-[#2AF598] bg-[#2f3640] p-3 shadow-lg text-lg 
                        font-semibold text-white">
          Detected: {detectedLabel}
        </div>
      )}

      {/* 📌 YouTube Results */}
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

      {/* 📌 Quiz Button */}
      {youtubeResults.length > 0 && (
        <Button onClick={() => navigate(`/quiz/${detectedLabel}`)} className="w-full bg-[#2AF598] text-black">
          Attempt Quiz
        </Button>
      )}
    </div>
  );
};

export default ImageUpload;
