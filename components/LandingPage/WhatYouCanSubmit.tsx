import Image from "next/image";

const items = [
  {
    title: "Proposals",
    description:
      "Detailed infrastructure and social project proposals for regional development.",
    iconSrc: "/Proposal-icon.svg",
  },
  {
    title: "Requests",
    description:
      "Formal requests for agency interventions, funding, or administrative support.",
    iconSrc: "/Request-icon.svg",
  },
  {
    title: "Reports",
    description:
      "Monthly operational updates and project completion certifications.",
    iconSrc: "/Report-icon.svg",
  },
  {
    title: "Complaints",
    description:
      "Official feedback and incident reports for prompt investigative action.",
    iconSrc: "/Complaints-icon.svg",
  },
];

export default function WhatYouCanSubmit() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      {/* Section header */}
      <div className="mb-14 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          What You Can Submit
        </h2>
        <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-green-500" />
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-[#D0E7E1] bg-[#F6F8F7] p-6 transition hover:border-green-300 hover:shadow-md"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg">
              <Image
                src={item.iconSrc}
                alt={item.title + " icon"}
                width={20}
                height={20}
              />
            </div>

            <h3 className="mb-2 text-base font-semibold text-gray-900">
              {item.title}
            </h3>

            <p className="text-sm text-[#707675] mt-4">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
