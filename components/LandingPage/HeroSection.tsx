import Image from "next/image";

export default function HeroSection() {
  return (
    <section className=" bg-[#F6F8F7]">
       <div className="mx-auto max-w-7xl px-6 py-20 bg-[#F6F8F7]">
      <div className="grid items-center gap-12 grid-cols-2 px-16">
        <div>
          <h1 className="mb-6  font-bold text-[60px] leading-tight text-[#2DCC7C] ">
            NDDC <br /> Submission <br /> Portal
          </h1>

          <p className="mb-8 max-w-md text-[#707675] text-[20px]">
            Empowering transparency through automated document processing and
            real-time tracking for all regional development projects.
          </p>

          <div className="flex items-center gap-4">
            <button className="rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white hover:bg-green-600">
              Submit a Document
            </button>

            <button className="rounded-lg border border-green-500 px-6 py-3 text-sm font-medium text-green-500 hover:bg-green-50">
              Learn More
            </button>
          </div>
        </div>

        {/* Right card */}
        <div className="relative mx-auto w-full max-w-md rounded-2xl bg-teal-700  flex items-center justify-center">
          <div className="w-full h-full">
            <Image
              src="/Document-Hero.svg" // or /hero-document.svg
              alt="Hero Document"
              width={456} // adjust width as needed
              height={450} // adjust height as needed
              className="mx-auto rounded-2xl"
              priority
            />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
