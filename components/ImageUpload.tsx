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
      className={`rounded-sm w-full focus:outline-none  bg-transparent flex items-center justify-center flex-col`}
    >
      <input {...getInputProps()} />
      {base64Image ? (
        <div className="flex items-center justify-center">
          {label === "Profile Image" ? (
            <>
              <div className="rounded-full flex items-center justify-center absolute w-28 h-28 bottom-0 l-0 bg-black opacity-30 " />
              <div className="bg-slate-900 flex items-center justify-center w-12 h-12 absolute rounded-full bg-opacity-50 cursor-pointer hover:bg-slate-800 hover:bg-opacity-50 transition ease-in-out delay-50 z-40  ">
                <img
                  src="/change-image.svg"
                  alt="change-image"
                  className=" w-6 h-6 rounded-full   "
                />
              </div>
              <Image
                src={base64Image}
                height={100}
                width={100}
                className="rounded-full object-cover w-28 h-28 border border-4 border-black "
                alt="Uploaded image"
              />
            </>
          ) : (
            <>
              <div className="flex items-center justify-center absolute w-[540px] h-56 top-0 bg-black opacity-30 " />
              <div className="bg-slate-900 flex items-center justify-center w-12 h-12 absolute rounded-full bg-opacity-50 cursor-pointer hover:bg-slate-800 hover:bg-opacity-50 transition ease-in-out delay-50 z-40 mr-16 ">
                <img
                  src="/change-image.svg"
                  alt="change-image"
                  className=" w-6 h-6 rounded-full   "
                />
              </div>
              <div className="bg-slate-900 flex items-center justify-center w-12 h-12 absolute rounded-full bg-opacity-50 cursor-pointer hover:bg-slate-800 hover:bg-opacity-50 transition ease-in-out delay-50 z-40 ml-16 ">
                <img
                  src="/close.svg"
                  alt="change-image"
                  className=" w-6 h-6 rounded-full   "
                />
              </div>
              <Image
                src={base64Image}
                height={400}
                width={600}
                alt="Uploaded image"
                className="max-w-[540px] max-h-56 object-cover"
              />
            </>
          )}
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
