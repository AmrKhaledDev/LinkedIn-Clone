"use client";
import Loader from "@/components/Loader/Loader";
import ServerErrorMessage from "@/components/ServerErrorMessage/ServerErrorMessage";
import { EditProfileAction } from "@/lib/actions/EditActions/EditProfileAction";
import { FormEditProfileErrors } from "@/lib/interfaces/interfaces";
import { EditProfileSchema } from "@/lib/schemas/EditProfileSchema";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { FaSave, FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
// ============================================================================================
function Form({
  user,
  setShowBoxEdit,
}: {
  user: User;
  setShowBoxEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [name, setName] = useState(user.name ?? "");
  const [headline, setHeadline] = useState(user.headline ?? "");
  const [school, setSchool] = useState(user.school ?? "");
  const [country, setCountry] = useState(user.country ?? "");
  const [city, setCity] = useState(user.city ?? "");

  const [errors, setErrors] = useState<FormEditProfileErrors>({});
  const [loading, setLoading] = useState(false);

  const { id: userId } = user;
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const value = { userId, name, headline, school, country, city };
    const validation = EditProfileSchema.safeParse(value);

    if (!validation.success) {
      const newErrors: FormEditProfileErrors = {};
      validation.error.issues.forEach((error) => {
        const field = error.path[0];
        if (field === "name") newErrors.name = error.message;
        if (field === "headline") newErrors.headline = error.message;
        if (field === "school") newErrors.school = error.message;
        if (field === "country") newErrors.country = error.message;
        if (field === "city") newErrors.city = error.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const result = await EditProfileAction(value);
    setLoading(false);

    if (result?.error) {
      toast.error(result.error, { className: "toast-font" });
      return;
    }

    toast.success("Edited your profile successfully", {
      className: "toast-font",
    });

    setShowBoxEdit(false);
    router.refresh();
  };

  return (
    <div className="bg-red-500 ">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white shadow-2xl overflow-hidden transition-css"
      >
        <div className="md:p-4 p-3 bg-primary text-white flex items-center justify-between">
          <h2 className="md:text-2xl text-xl font-semibold">Edit Profile</h2>
          <i className="text-5xl opacity-30">
            <FaEdit />
          </i>
        </div>
        <div className="md:p-4 p-3 md:space-y-5 space-y-3 xl:h-137.5 lg:h-125 h-120 overflow-y-auto">
          {/* Basic Info */}
          <section>
            <h3 className="font-bold text-xl sm:block hidden text-gray-800 sm:mb-4 mb-2">
              Basic Information
            </h3>

            <div className="sm:space-y-4 space-y-3 px-2">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Full Name
                </label>
                <input
                  disabled={loading}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="e.g. John Doe"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-white
                    ${
                      errors.name
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/10"
                    }
                  sm:text-[15px] text-[13px]`}
                />
                {errors.name && <ServerErrorMessage message={errors.name} />}
              </div>

              {/* Headline */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Headline
                </label>
                <textarea
                  disabled={loading}
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  rows={4}
                  placeholder="Write a short catchy bio about what you do..."
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-white resize-none
                    ${
                      errors.headline
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/10"
                    }
                  sm:text-[15px] text-[13px]`}
                />
                {errors.headline && (
                  <ServerErrorMessage message={errors.headline} />
                )}
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="font-bold sm:text-xl text-gray-800 sm:mb-4 mb-2">
              Education
            </h3>

            <div className="px-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  School / University
                </label>
                <input
                  disabled={loading}
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  type="text"
                  placeholder="e.g. Harvard University"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-white
                    ${
                      errors.school
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                        : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/10"
                    }
                  sm:text-[15px] text-[13px]`}
                />
                {errors.school && (
                  <ServerErrorMessage message={errors.school} />
                )}
              </div>
            </div>
          </section>

          {/* Location */}
          <section>
            <h3 className="font-bold sm:text-xl text-gray-800 sm:mb-4 mb-2">
              Location
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Country / Region
                </label>
                <input
                  disabled={loading}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                  placeholder="United States"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-white
                    ${
                      errors.country
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                        : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/10"
                    }
                  sm:text-[15px] text-[13px]`}
                />
                {errors.country && (
                  <ServerErrorMessage message={errors.country} />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  City
                </label>
                <input
                  disabled={loading}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder="New York"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-white
                    ${
                      errors.city
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                        : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/10"
                    }
                  sm:text-[15px] text-[13px]`}
                />
                {errors.city && <ServerErrorMessage message={errors.city} />}
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex justify-end sm:gap-4 gap-1 bg-gray-50 sm:px-8 px-3 sm:py-4 py-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setShowBoxEdit(false);
              setName(user.name ?? "");
              setHeadline(user.headline ?? "");
              setCity(user.city ?? "");
              setCountry(user.country ?? "");
              setSchool(user.school ?? "");
              setErrors({})
              router.refresh()
            }}
            className="flex sm:text-[15px] text-[12px] items-center disabled:cursor-default cursor-pointer disabled:hover:bg-transparent disabled:text-gray-400 gap-1 text-sm font-bold text-gray-500 hover:text-red-600 px-4 py-2 hover:bg-red-100 rounded-lg transition-all"
          >
            <IoMdClose size={18} />
            Cancel
          </button>

          <button
            disabled={loading}
            className="flex items-center sm:text-[15px] text-[12px] disabled:bg-blue-100 cursor-pointer disabled:hover:bg-transparent disabled:cursor-wait gap-2 bg-blue-600 hover:bg-blue-700 text-white sm:px-10 px-4 sm:py-3 py-2 rounded-xl font-bold shadow-xl transition-all"
          >
            {loading ? (
              <Loader />
            ) : (
              <>
                <FaSave />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
