import Footer from "../components/Footer/Footer";
import SessionHistory from "./SessionHistory";

const HomePage = () => {
  return (
    <main className="flex min-h-screen justify-center">
      <div className="mt-20">
        <SessionHistory />
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;
