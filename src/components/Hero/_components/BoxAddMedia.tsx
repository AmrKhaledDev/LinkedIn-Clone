"use client";
import { IoCloseOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
// ==========================================================================
function BoxAddMedia({
  type,
  showAddMediaBox,
  setShowAddMediaBox,
}: {
  type: "image" | "video";
  showAddMediaBox: boolean;
  setShowAddMediaBox: Dispatch<SetStateAction<boolean>>;
}) {
  const [media, setMedia] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const handleAddMedia = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMedia(url);
      setMediaFile(file);
    }
  };
  const handleDeleteMedia = () => {
    setMedia("");
    setMediaFile(null);
  };
  return (
    <>
      {showAddMediaBox && (
        <div className="fixed w-full flex justify-center z-15 pt-7 min-h-screen bg-black/45 inset-0">
          <div className="bg-white lg:w-[80%] mg:w-[90%] w-[99%] lg:max-h-170 max-h-150 rounded overflow-hidden">
            <div className="flex items-center justify-between py-3 px-5 border-b border-b-gray-200">
              <h2 className="font-semibold sm:text-xl text-[18px]">Editor</h2>
              <button
                onClick={() => setShowAddMediaBox(false)}
                className="sm:text-3xl text-2xl cursor-pointer bg-gray-100 p-1 rounded-full"
              >
                <IoCloseOutline />
              </button>
            </div>
            <div className="lg:h-[83%] h-[80%] bg-[#F8FAFD] w-full flex flex-col items-center justify-center gap-3">
              {media ? (
                <>
                  <Image
                    src={media}
                    width={700}
                    height={700}
                    alt="Media"
                    className="rounded object-cover lg:max-w-197.5 md:max-w-172.5 max-w-full lg:max-h-120 max-h-100"
                  />
                  <div className="flex items-center gap-5 mt-5">
                    <button
                      onClick={handleDeleteMedia}
                      className="cursor-pointer text-2xl text-gray-600 hover:bg-gray-200 rounded-full p-2 transition-css"
                    >
                      <MdDelete />
                    </button>
                    <label
                      htmlFor="change-image"
                      className="cursor-pointer text-2xl text-gray-600 hover:bg-gray-200 rounded-full p-2 transition-css"
                    >
                      <MdEdit />
                    </label>
                    <input
                      onChange={handleAddMedia}
                      type="file"
                      id="change-image"
                      hidden
                      className="hidden"
                      accept={type === "image" ? "image/*" : "video/*,.mkv"}
                    />
                  </div>
                </>
              ) : (
                <>
                  <Image
                    src={"/not-found-items-saved.svg"}
                    alt="Photo"
                    width={200}
                    height={200}
                    className="sm:w-40 w-35"
                  />
                  <h2 className="sm:text-2xl text-xl font-bold">
                    Select files to begin
                  </h2>
                  <p className="sm:text-sm text-[12px] font-normal text-center text-gray-600">
                    Share {type === "image" ? "images" : "a single video"} in
                    your post
                  </p>
                  <label
                    htmlFor="image"
                    className="text-white bg-primary py-1.5 px-4 rounded-full cursor-pointer hover:bg-hoverColor font-bold sm:text-sm text-[12px]"
                  >
                    Upload from computer
                  </label>
                  <input
                    onChange={handleAddMedia}
                    type="file"
                    id="image"
                    hidden
                    className="hidden"
                    accept={type === "image" ? "image/*" : "video/*,.mkv"}
                  />
                </>
              )}
            </div>
            <div className="w-full flex items-center justify-end p-3">
              <button
                disabled={media.length < 1}
                className="disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-default bg-primary text-white cursor-pointer rounded-full py-1 px-3 font-semibold sm:text-[15px] text-sm"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BoxAddMedia;
