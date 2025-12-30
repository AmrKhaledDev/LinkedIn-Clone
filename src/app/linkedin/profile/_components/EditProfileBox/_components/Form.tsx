"use client";
import { User } from "@prisma/client";
import { useState } from "react";
// ===========================================================
function Form({ user }: { user: User }) {
  const [name, setName] = useState(user.name ?? "");
  const [headline, setHeadline] = useState(user.headline ?? "");
  const [school, setSchool] = useState(user.school ?? "");
  const [country, setCountry] = useState(user.country ?? "");
  const [city, setCity] = useState(user.city ?? "");
  return (
    <form className="flex flex-col gap-7">
      <div className="px-5 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-gray-700">
            Name
          </label>
          <input
            defaultValue={name}
            type="text"
            id="name
          "
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-700" htmlFor="headline">
            Headline
          </label>
          <textarea
            defaultValue={headline}
            id="headline"
            className="border rounded px-2 py-1"
            rows={5}
          />
        </div>
        <div className="flex flex-col gap-1 mt-8">
          <h1 className="text-2xl font-bold">Education</h1>
          <div className="flex flex-col gap-1">
            <label className="text-gray-700" htmlFor="school">
              School
            </label>
            <input
              defaultValue={school}
              className="border rounded px-2 py-1"
              type="text"
              id="school"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-8">
          <h1 className="text-2xl font-bold">Location</h1>
          <div className="flex flex-col gap-1 mb-5">
            <label className="text-gray-700" htmlFor="country">
              Country/Region
            </label>
            <input
              defaultValue={country}
              className="border rounded px-2 py-1"
              type="text"
              id="school"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-700" htmlFor="city">
              City
            </label>
            <input
              defaultValue={city}
              className="border rounded px-2 py-1"
              type="text"
              id="school"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end border-t border-t-gray-200 px-3 py-3">
        <button className="text-white cursor-pointer bg-primary py-1.5 font-bold px-5 w-fit rounded-full">
          Save
        </button>
      </div>
    </form>
  );
}

export default Form;
