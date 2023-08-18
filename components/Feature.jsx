import {
  LockClosedIcon,
  BookOpenIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Read Anywhere, Anytime",
    description:
      " Enjoy the pleasure of reading on your smartphone, tablet, or computer. Dive into a book during your commute, on a break, or curled up in bed.",
    icon: BookOpenIcon,
  },
  {
    name: "Download PDFs",
    description:
      "Keep your favorite books forever by downloading them in PDF format for offline reading.",
    icon: DocumentArrowDownIcon,
  },
  {
    name: "Ad-Free",
    description:
      "Relax and read without distractions in a safe, ad-free environment.",
    icon: LockClosedIcon,
  },
];

export default function Feature() {
  return (
    <div className="relative bg-background py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base font-semibold uppercase tracking-wider text-text">
          Introducing
        </h2>
        <p className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          ExploreBooks
        </p>
        <p className="mx-auto mt-5 max-w-prose text-xl text-accent">
          Embark on a literary adventure with ExploreBooks. Discover, read, and
          expand your horizons!
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root rounded-lg bg-primary px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-accent p-3 shadow-lg">
                        <feature.icon
                          className="h-6 w-6 text-text"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight text-background">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
