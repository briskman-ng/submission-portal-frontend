"use client";

import Image from "next/image";

const features = [
  {
    title: "Immutable Tracking",
    description:
      "Every document receives a unique hash and timestamp for audit purposes.",
    icon: "/Imutable-tracking.svg", 
  },
  {
    title: "Faster Processing",
    description:
      "Digital workflows reduce approval times by up to 60% compared to paper methods.",
    icon: "/FasterProcessing-icon.svg", 
  },
  {
    title: "Bank-Grade Security",
    description:
      "End-to-end encryption for all sensitive government submissions.",
    icon: "/BankGradeSecurity-icon.svg", 
  },
];

const stats = [
  {
    value: "24/7",
    label: "Availability",
    bgColor: "bg-[#E7F6F2]",
    textColor: "text-green-500",
  },
  {
    value: "100%",
    label: "Digital",
    bgColor: "bg-white",
    textColor: "text-green-500",
  },
  {
    value: "Real-time",
    label: "Updates",
    bgColor: "bg-white",
    textColor: "text-green-500",
  },
  {
    value: "Secure",
    label: "Portal",
    bgColor: "bg-[#E7F6F2]",
    textColor: "text-green-500",
  },
];

export default function TransparencyAutomation() {
  return (
    <section className="bg-[#F6F8F7]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-16 md:grid-cols-2">
          {/* Left content */}
          <div>
            <h2 className="mb-4 text-3xl font-semibold text-gray-900">
              Transparency & Automation
            </h2>

            <p className="mb-10 max-w-xl text-gray-600">
              The NDDC is committed to digital excellence. Our automated portal
              reduces human error and speeds up project vetting, ensuring every
              submission is tracked from receipt to final decision.
            </p>

            <div className="space-y-2">
              {features.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 p-2">
                    <Image
                      src={item.icon}
                      alt={item.title + " icon"}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <h4 className=" text-gray-900 font-bold">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right stats */}
          <div className="grid grid-cols-2 gap-6 py-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center justify-center rounded-2xl p-4 text-center ${stat.bgColor}`}
              >
                <span className={`text-3xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </span>
                <span className="mt-2 text-sm font-medium text-gray-600">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
