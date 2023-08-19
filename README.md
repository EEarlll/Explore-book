# ExploreBooks - Full Stack CRUD Practice Project - [https://explorebooks.vercel.app](https://explorebooks.vercel.app)

ExploreBooks is a web application developed to practice full stack development with CRUD capabilities. The main focus of the project is to provide users with the ability to view, upload, edit, delete and manage PDF books while also allowing them to bookmark their favorite titles. The application has been built using modern technologies to ensure a seamless and user-friendly experience.

## Features

- **View and Download PDF Books:** ExploreBooks enables users to view and download a collection of PDF books. All users, whether logged in or not, can access this feature.

- **User Authentication:** The application incorporates Firebase authentication to manage user accounts. Users can create accounts, log in, and maintain their profiles securely.

- **Upload, Edit, and Delete PDFs:** Logged-in users have the privilege to upload their own PDF books, edit the details of their uploaded books, and even remove them if needed.

- **Bookmark Books:** Users can bookmark their favorite books, allowing them to quickly access and revisit them later. The bookmark data is stored in the MongoDB database.

## Technologies Used

ExploreBooks utilizes a variety of technologies to create a robust and dynamic web application:

- **Frontend Frameworks:** The frontend is built using React.js and Next.js. React.js provides a component-based UI development approach, while Next.js offers server-side rendering and routing capabilities for improved performance and SEO.

- **Backend Framework:** For the backend, Node.js and Express.js are used to create a RESTful API that handles data processing and interactions with the database.

- **Styling:** The UI is styled using Tailwind CSS, a utility-first CSS framework that allows for rapid and responsive design.

- **Database:** The MongoDB database is employed to store information about books and user bookmarks. This facilitates efficient data retrieval and management.

- **Authentication and Storage:** Firebase is used for user authentication and storing PDFs and images. Firebase's authentication services ensure secure user accounts, and its storage services facilitate easy management of uploaded files.

## Getting Started

To run the ExploreBooks application locally:

1. Clone the repository: `git clone https://github.com/your-username/ .git`
2. Navigate to the project directory: `cd Explore-Books`
3. Install dependencies: `npm install`
4. Set up environment variables: Create a `.env` file in the root directory and include necessary variables such as database connection URL, Firebase API keys, etc.
5. Run the development server: `npm run dev`

Make sure to replace `your-username` with your actual GitHub username.

## Live Demo

Check out the live demo of ExploreBooks at [https://explorebooks.vercel.app](https://explorebooks.vercel.app).

## Contributions

Contributions to ExploreBooks are welcome! Feel free to submit pull requests for new features, bug fixes, or improvements. Please follow the existing code style and guidelines.

## Contact

If you have any questions or feedback, you can reach out to us at `earleustacio@gmail.com`.

## License

ExploreBooks is released under the [MIT License](LICENSE).

---

Start exploring and managing your favorite books today with ExploreBooks!.
