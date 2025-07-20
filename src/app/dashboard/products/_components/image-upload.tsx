"use client";

import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";

type ImageUploadProps = {
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  value,
  onChange,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value ? (
          <div className="relative w-32 h-32 rounded-md overflow-hidden">
            <Image fill className="object-cover" alt="image" src={value} />
          </div>
        ) : (
          <p>No Image</p>
        )}
      </div>
      <CldUploadWidget
        uploadPreset="dgerwh95h"
        options={{
          multiple: true,
          singleUploadAutoClose: false,
          sources: ["local", "url", "camera"],
        }}
        onSuccess={(result) => {
          const info = result.info;
          if (info && typeof info !== "string" && "secure_url" in info) {
            onChange(info.secure_url);
          }
        }}
      >
        {({ open, isLoading }) => (
          <Button
            type="button"
            disabled={disabled || isLoading}
            variant="secondary"
            onClick={() => open()} // ✅ Wrap in a lambda
          >
            <ImagePlus className="h-4 w-4 mr-2" />
            {isLoading ? "Uploading..." : "Upload image"}
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
