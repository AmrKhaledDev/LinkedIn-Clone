import axios from "axios";
// =========================================================================================
export const uploadMedia = async (mediaFile: FileList | File, pathname: string) => {
  try {
    const file = mediaFile instanceof FileList ? mediaFile.item(0) : mediaFile;
    if (!file) return { error: "Please upload a photo / video" };
    const formData = new FormData();
    formData.append("file", file);
    if (!pathname) return { error: "An unexpected error occurred" };
    formData.append("pathname", pathname);
    const res = await axios.post(`${process.env.NEXT_PUBLIC_SITE_URL}/api/upload-media`,formData);
    const data: { error: string } | { url: string; type: "image" | "video" } =
      res.data;
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: "An error occurred while uploading the image / video",
    };
  }
};
