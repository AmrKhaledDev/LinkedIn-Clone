"use client";
import { RiDeleteBin7Fill } from "react-icons/ri";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DeletePostImageAction } from "@/lib/actions/DeleteActions/DeletePostImageAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// ===============================================================
function ButtonDeletePostImage({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) {
  const router = useRouter();
  const handleDeletePostImage = async () => {
    const result = await DeletePostImageAction(postId, userId);
    if (result?.error)
      return toast.error(result.error, { className: "toast-font" });
    router.refresh();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-white shadow rounded-full p-2 text-red-500  cursor-pointer text-xl hover:scale-105">
          <RiDeleteBin7Fill />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeletePostImage}
            className="bg-red-500 text-white cursor-pointer"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ButtonDeletePostImage;
