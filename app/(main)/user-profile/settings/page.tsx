import EnableMFA from "@/app/(main)/_components/EnableMFA";
import Sessions from "@/app/(main)/_components/Sessions";

const Settings = () => {
  return (
    <main>
      {/* User settings main  */}

      {/* Top side */}
      <div className="flex max-w-3xl flex-col gap-2 mx-auto w-full md:max-w-5xl px-6 py-8">
        <h1 className="text-[28px] leading-[34px] tracking-[-0.416px] text-[#000509e3] dark:text-inherit font-extrabold">
          Setup your settings and preferences
        </h1>
        <p className="text-sm text-[#0007149f] dark:text-gray-100 font-normal">
          You can setup MFA, check your latest sessions, change preferences and
          much more...
        </p>
      </div>

      {/* MFA section */}
      <section className="relative max-w-3xl py-0 mx-auto w-full px-6 md:max-w-5xl">
        <div className="steps-gradient dark:bg-gray-800 absolute top-0 h-[700px] w-px"></div>
        <div className="flex flex-col gap-5">
          <div className="relative pl-6 transition duration-200 ease-in-out">
            <div className="bg-white dark:bg-background  absolute -left-[9.5px] top-7 z-10 block h-5 w-5 rounded-full">
              <div className="ml-1 mt-1 h-3 w-3 rounded-full border-2 transition duration-200 ease-in-out border-primary"></div>
            </div>
            <div>
              <EnableMFA />
            </div>
          </div>
        </div>

        {/* Sessions section */}
        <section className="flex flex-col gap-5">
          <div className="relative pl-6 transition duration-200 ease-in-out">
            <div className="bg-white dark:bg-background  absolute -left-[9.5px] top-7 z-10 block h-5 w-5 rounded-full">
              <div className="ml-1 mt-1 h-3 w-3 rounded-full border-2 transition duration-200 ease-in-out border-primary"></div>
            </div>
            <div>
              <Sessions />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Settings;
