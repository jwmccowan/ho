import React, { useCallback, useEffect, useRef, useState } from "react";
import { uploadFile } from "../utils/file-utils/uploadFile";

export function useUpload(
  bucket: string,
  onUpload: (url: string) => void
): [boolean, React.ChangeEventHandler<HTMLInputElement>] {
  const [loading, setLoading] = useState(false);

  const onUploadRef = useRef(onUpload);
  useEffect(() => {
    onUploadRef.current = onUpload;
  }, [onUpload]);

  const onFileSelected = useCallback(
    async (ev: React.ChangeEvent<HTMLInputElement>) => {
      try {
        setLoading(true);
        if (!ev.target.files || ev.target.files.length === 0) {
          throw new Error("You must select a file to upload.");
        }
        const url = await uploadFile(ev.target.files[0], bucket);
        onUploadRef.current(url);
      } catch (error: any) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    },
    [bucket]
  );

  return [loading, onFileSelected];
}
