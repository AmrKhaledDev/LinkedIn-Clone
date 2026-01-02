"use client";
import Loader from "@/components/Loader/Loader";
import { EditProfileAction } from "@/lib/actions/EditProfileAction";
import { FormEditProfileErrors } from "@/lib/interfaces/interfaces";
import { EditProfileSchema } from "@/lib/schemas/EditProfileSchema";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { FaUserCircle, FaSave } from "react-icons/fa";
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
    <div className="py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white shadow-2xl overflow-hidden transition-css"
      >
        {/* Header */}
        <div className="relative bg-linear-to-r from-blue-600 to-indigo-700 px-8 py-10 text-white">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Edit Profile
          </h2>
          <p className="text-blue-100 mt-2 text-sm opacity-90">
            Update your public information to increase visibility
          </p>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FaUserCircle size={120} />
          </div>
        </div>

        <div className="p-8 space-y-12">
          {/* Basic Info */}
          <section>
            <h3 className="font-bold text-xl text-gray-800 mb-6">
              Basic Information
            </h3>

            <div className="space-y-6 px-2">
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
                    ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/10"}
                  `}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 ml-1">{errors.name}</p>
                )}
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
                    ${errors.headline ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/10"}
                  `}
                />
                {errors.headline && (
                  <p className="text-sm text-red-500 ml-1">{errors.headline}</p>
                )}
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="font-bold text-xl text-gray-800 mb-6">
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
                    ${errors.school ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/10"}
                  `}
                />
                {errors.school && (
                  <p className="text-sm text-red-500 ml-1">{errors.school}</p>
                )}
              </div>
            </div>
          </section>

          {/* Location */}
          <section>
            <h3 className="font-bold text-xl text-gray-800 mb-6">
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
                    ${errors.country ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/10"}
                  `}
                />
                {errors.country && (
                  <p className="text-sm text-red-500 ml-1">{errors.country}</p>
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
                    ${errors.city ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/10"}
                  `}
                />
                {errors.city && (
                  <p className="text-sm text-red-500 ml-1">{errors.city}</p>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 bg-gray-50 px-8 py-6">
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              router.refresh()
              setShowBoxEdit(false)
            }}
            className="flex items-center disabled:cursor-default cursor-pointer disabled:hover:bg-transparent disabled:text-gray-400 gap-1 text-sm font-bold text-gray-500 hover:text-red-600 px-4 py-2 hover:bg-red-100 rounded-lg transition-all"
          >
            <IoMdClose size={18} />
            Cancel
          </button>

          <button
            disabled={loading}
            className="flex items-center disabled:bg-blue-100 cursor-pointer disabled:hover:bg-transparent disabled:cursor-wait gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl font-bold shadow-xl transition-all"
          >
            {loading ? <Loader /> : (
              <>
                <FaSave size={18} />
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
