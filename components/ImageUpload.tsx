import Image from "next/image";
import React, { FC, useCallback, useState } from "react";

import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (base64: string) => void;
  disabled?: boolean;
}

const ImageUpload: FC<ImageUploadProps> = ({
  value,
  onChange,
  label,
  disabled,
}) => {
  const [base64Image, setBase64Image] = useState<string | null>(value);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        setBase64Image(reader.result as string);
        onChange(reader.result as string);
      };

      reader.onerror = () => {
        console.error("Something went wrong!");
      };
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpeg": [],
    },
    onDrop: handleDrop,
    disabled,
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer border border-dotted border-gray-800 rounded-sm p-4 w-full focus:outline-none focus:ring-1 focus:ring-primary-main focus:border-transparent bg-transparent text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center flex-col`}
    >
      <input {...getInputProps()} />
      {base64Image ? (
        <div className="flex items-center justify-center">
          <Image
            src={base64Image}
            height={100}
            width={100}
            alt="Uploaded image"
          />
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
