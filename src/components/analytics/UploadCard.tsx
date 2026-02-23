'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, FileVideo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnalyticsResponse } from '@/types/analytics';

interface UploadCardProps {
  onAnalysisComplete: (data: AnalyticsResponse) => void;
  onLoadingStart: () => void;
  onLoadingEnd: () => void;
  onError: (error: string) => void;
}

export default function UploadCard({ onAnalysisComplete, onLoadingStart, onLoadingEnd, onError }: UploadCardProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('video/')) {
        setFile(selectedFile);
      } else {
        onError('Invalid file type. Please upload a video file (.mp4 or .mov).');
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
    const selectedFile = e.dataTransfer.files?.[0];
    if (selectedFile?.type.startsWith('video/')) {
      setFile(selectedFile);
    } else {
      onError('Please drop a valid video file.');
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    onLoadingStart();
    const formData = new FormData();
    formData.append('video', file);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data = await res.json();
      onAnalysisComplete(data);
    } catch (err: any) {
      onError(err.message || 'An unexpected error occurred.');
    } finally {
      onLoadingEnd();
    }
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsHovering(true); }}
          onDragLeave={() => setIsHovering(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group ${
            isHovering ? 'border-primary bg-primary/5' : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".mp4,.mov"
            className="hidden"
          />
          <div className="p-3 rounded-full bg-white shadow-sm group-hover:scale-110 transition-transform duration-300">
            <Upload className={`h-6 w-6 ${isHovering ? 'text-primary' : 'text-gray-400'}`} />
          </div>
          <div className="text-center">
            <p className="text-gray-700 font-semibold text-sm">Drag and drop dive clip</p>
            <p className="text-gray-400 text-xs mt-0.5">MP4 or MOV up to 100MB</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileVideo className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 font-semibold truncate text-sm">{file.name}</p>
              <p className="text-gray-400 text-xs">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
            <button
              onClick={() => setFile(null)}
              className="h-8 w-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          <Button
            onClick={handleAnalyze}
            className="w-full h-11 font-bold text-sm shadow-sm"
          >
            START AI ANALYSIS
          </Button>
        </div>
      )}
    </div>
  );
}
