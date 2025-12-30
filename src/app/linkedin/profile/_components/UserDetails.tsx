import { UserWithRelationType } from "@/lib/types/types";
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
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            {user.name.charAt(0).toUpperCase() +
              user.name.slice(1).toLocaleLowerCase()}
          </h2>
          <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
            Joined In {formatted}
          </span>
        </div>
        {/* Headline */}
        {user.headline && (
          <p className="text-[16px] text-slate-600 leading-relaxed">
            {user.headline}
          </p>
        )}
      </div>
    </div>
  );
}

export default UserDetails;
