import { UserWithRelationType } from "@/lib/types/types";
import BigImage from "./_components/BigImage";
import SmallImage from "./_components/SmallImage/SmallImage";
import UserDetails from "./_components/UserDetails";
import UserInfo from "./_components/UserInfo";
import EditProfileBox from "./_components/EditProfileBox/EditProfileBox";
import Posts from "../Posts/Posts";
import { User } from "@prisma/client";
// =============================================================================
function Profile({
  user,
  currentUser,
}: {
  user: UserWithRelationType;
  currentUser: User;
}) {
  return (
    <div className="lg:w-187.5 md:w-176 flex flex-col gap-2">
      <div className="rounded flex flex-col bg-white shadow">
        <div className="relative">
          <BigImage user={user} currentUser={currentUser} />
          <SmallImage user={user} currentUser={currentUser} />
        </div>
        <div
          className={`overflow-hidden px-7 flex sm:pt-15 pt-10 flex-col gap-3 relative ${
            user.id !== currentUser.id && "pb-4"
          }`}
        >
          <UserDetails user={user} currentUser={currentUser}/>
          {user.id === currentUser.id && <UserInfo user={user} />}
          {user.id === currentUser.id && <EditProfileBox user={user} />}
        </div>
      </div>
      {user.posts.length > 0 ? (
        <Posts posts={user.posts} />
      ) : (
        <p className="text-center font-bold tracking-widest p-3 shadow bg-white text-red-400 uppercase sm:text-[15px] text-[13px]">
          Your posts will be displayed here
        </p>
      )}
    </div>
  );
}

export default Profile;
