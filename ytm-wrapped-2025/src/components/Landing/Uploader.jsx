import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileJson } from 'lucide-react';

const Uploader = ({ onUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) onUpload(acceptedFiles[0]);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'application/json': ['.json'] },
    maxFiles: 1
  });

  return (
    <div 
      {...getRootProps()} 
      className={`
        h-full w-full min-h-[500px] rounded-3xl border border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-6 p-8
        ${isDragActive 
          ? 'border-neutral-400 bg-neutral-900' 
          : 'border-neutral-800 bg-[#0f0f0f] hover:bg-[#141414] hover:border-neutral-700'
        }
      `}
    >
      <input {...getInputProps()} />
      
      {/* Icon Circle */}
      <div className={`
        w-20 h-20 rounded-full flex items-center justify-center transition-colors
        ${isDragActive ? 'bg-neutral-800 text-white' : 'bg-[#1a1a1a] text-neutral-500'}
      `}>
        {isDragActive ? <Upload size={32} /> : <FileJson size={32} />}
      </div>

      <div className="text-center space-y-2">
        <p className="text-xl font-medium text-neutral-200">
          {isDragActive ? "Drop to analyze" : "Drop watch-history.json"}
        </p>
        <p className="text-sm text-neutral-500 max-w-xs mx-auto">
          Drag your file here or click to browse.
          <br />
          File is processed locally in your browser.
        </p>
      </div>
    </div>
  );
};

export default Uploader;