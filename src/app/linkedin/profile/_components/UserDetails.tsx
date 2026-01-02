import { UserWithRelationType } from "@/lib/types/types";
import { BsFillPatchCheckFill } from "react-icons/bs";
// =====================================================================
function UserDetails({ user }: { user: UserWithRelationType }) {
  const date = new Date(user.createdAt);

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  } as const;
  const formatted = date.toLocaleDateString("en-GB", options);
  return (
    <div className="flex flex-col justify-between">
      <div className="space-y-1">
        {/* Name and Join Date */}
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <h2 className="sm:text-3xl text-2xl font-bold text-slate-900 tracking-tight">
              {user.name.charAt(0).toUpperCase() +
                user.name.slice(1).toLocaleLowerCase()}
            </h2>
            <i className="text-blue-500 sm:text-xl" title="Super Admin"><BsFillPatchCheckFill/></i>
          </div>
          <span className="px-4 py-1.5 sm:block hidden bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
            Joined In {formatted}
          </span>
        </div>
        {/* Headline */}
        {user.headline && (
          <p className="sm:text-[16px] text-[14px] text-slate-600 leading-relaxed">
            {user.headline}
          </p>
        )}
        <div className="flex items-center gap-5">
          <h4 className="text-[13px] font-bold text-slate-600 flex items-center gap-1">
            4.469 <span className="font-medium">followers</span>
          </h4>
          <h4 className="text-[13px] font-bold text-slate-600 flex items-center gap-1">
            {user.posts.length}
            <span className="font-medium">
              {user.posts.length < 2 ? "post" : "posts"}
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
