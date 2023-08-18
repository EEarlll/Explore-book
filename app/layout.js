import "@/styles/global.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "ExploreBooks",
  description:
    "Explore a vast collection of books in our catalog and enjoy reading them in PDF format. Discover new titles, genres, and authors.",
  keywords:
    "book catalogue, book reader, PDF books, reading platform, online library, book catalog, digital books, ExploreBooks, Explore Books, Books Explore, BooksExplore",
  ogTitle: "ExploreBooks - Explore and Read Books in PDF Format",
  ogDescription:
    "Discover a diverse collection of books in our comprehensive catalog and enjoy reading them in PDF format. Find your next favorite title today.",
  // ogImage: "https://example.com/book-catalogue-reader.jpg",
  twitterTitle: "ExploreBooks - Explore and Read Books in PDF Format",
  twitterDescription:
    "Discover a diverse collection of books in our comprehensive catalog and enjoy reading them in PDF format. Find your next favorite title today.",
  // twitterImage: "https://example.com/book-catalogue-reader.jpg",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="bg-background">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
