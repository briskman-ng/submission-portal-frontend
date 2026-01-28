import Image from "next/image";

const steps = [
  {
    step: "1",
    title: "Prepare",
    description: "Gather all necessary documents in PDF or Word format.",
    iconSrc: "/Prepare-icon.svg",
  },
  {
    step: "2",
    title: "Upload",
    description: "Fill the form below and upload your documentation securely.",
    iconSrc: "/UploadOne-icon.svg",
  },
  {
    step: "3",
    title: "Track",
    description:
      "Receive a tracking ID and monitor your submission status in real-time.",
    iconSrc: "/Track-icon.svg",
  },
];

export default function HowItWorks() {
  return (
    <section className=" bg-[#F6F8F7]">
      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">How It Works</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600">
            Our streamlined 3-step digital process ensures your submission is
            handled efficiently.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="flex flex-col items-center text-center"
            >
              {/* Icon circle */}
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-green-500">
                <Image
                  src={item.iconSrc}
                  alt={item.title + " icon"}
                  width={24} 
                  height={24}
                />
              </div>

              <h3 className="mb-2 text-base font-semibold text-gray-900">
                {item.step}. {item.title}
              </h3>

              <p className="max-w-xs text-sm text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
