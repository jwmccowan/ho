import { useCallback, useEffect, useState } from "react";
import { getUrl } from "../utils/file-utils/getUrl";

export function useGetImageSrc(url: string): [string, boolean] {
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);

  const downloadImage = useCallback(async function (path) {
    try {
      setLoading(true);
      const url = await getUrl(path, "avatars");
      setImageSrc(url);
    } catch (error: any) {
      console.log("Error downloading image: ", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (url) {
      downloadImage(url);
    }
  }, [url, downloadImage]);

  return [imageSrc, loading];
}
