"use client";

import { useUser } from "@/components/context/user-context";
import useSupabaseBrowser from "@/utils/supabase/client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface UseImageUploadProps {
  onUpload?: (url: string) => void;
  url?: string | null;
}

export function useImageUpload({ onUpload, url }: UseImageUploadProps = {}) {
  const supabase = useSupabaseBrowser();
  const user = useUser();
  const previewRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleThumbnailClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setFileName(file.name);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        previewRef.current = url;
        onUpload?.(url);
      }
    },
    [onUpload]
  );

  const handleRemove = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setFileName(null);
    previewRef.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
      }
    };
  }, []);

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    onUpload: (arg: any) => void
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${user?.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        toast.error(uploadError.message);
        return;
      }

      onUpload(filePath);
    } catch (error) {
      toast.error("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setFileUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  return {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
    handleUpload,
    fileUrl,
    uploading,
  };
}
