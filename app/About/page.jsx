export default function page() {
  return (
    <div className="relative py-16 bg-background overflow-hidden">
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div
          className="relative h-full text-lg max-w-prose mx-auto"
          aria-hidden="true"
        ></div>
      </div>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
              About
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-primary sm:text-4xl">
              ExploreBooks
            </span>
          </h1>
          <p className="mt-8 text-xl text-accent leading-8">
            ExploreBooks is a dynamic web application designed to provide users
            with a comprehensive platform to manage, explore, and share their
            favorite books. Developed as a project to hone full-stack
            development skills, this application seamlessly integrates Node.js,
            Express, Next.js, to create a feature-rich experience for book
            enthusiasts. The primary goal of ExploreBooks is to allow users to
            add, delete, and edit books with PDF attachments, while also
            offering public access for anyone to view and download PDFs.
          </p>
        </div>
        <div className="mt-6 prose prose-indigo prose-lg text-accent mx-auto">
          <h3 className="text-text">Key Features:</h3>
          <ul role="list">
            <li>
              <strong className="text-text">Book Management</strong>: Users have
              the power to add, delete, and edit books, complete with details
              like title, author, publication year, and a PDF attachment. This
              feature-rich interface is designed to make book organization
              effortless.
            </li>
            <li>
              <strong className="text-text">PDF Attachment</strong>:
              ExploreBooks allows users to upload PDFs directly when adding or
              editing a book. This means that each book in the catalogue can
              have its own accompanying PDF for users to access and download.
            </li>
            <li>
              <strong className="text-text">Public Access</strong>: While
              registered users can manage their own book collection,
              ExploreBooks also enables public access for anyone to view the
              list of available books. This makes it a fantastic resource for
              sharing reading recommendations and discovering new titles.
            </li>
          </ul>
          <h3 className="text-text">Technologies Used: </h3>
          <ul role="list">
            <li>
              <strong className="text-text">Authentication</strong>: Built on
              Firebase, the application ensures secure user authentication,
              giving registered users exclusive access to their personalized
              book catalogue.
            </li>
            <li>
              <strong className="text-text">Database Integration</strong>:
              MongoDB serves as the backbone of the application's database,
              providing a robust and efficient storage solution for book data.
            </li>
            <li>
              <strong className="text-text">Responsive Design</strong>: The
              application boasts a responsive design that adapts seamlessly to
              various screen sizes, ensuring a consistent and engaging
              experience across devices.
            </li>
            <li>
              <strong className="text-text">Styles</strong>: ExploreBooks is
              beautifully styled using Tailwind CSS, ensuring a visually
              appealing and user-friendly interface that's both modern and
              intuitive. Icons by The application utilizes Heroicons to add
              visually appealing icons throughout the user interface, enhancing
              the overall aesthetic. Headless UI components are incorporated to
              enhance interactivity and user experience, making actions like
              form submission and navigation smooth and intuitive.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
