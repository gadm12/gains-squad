import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="py-6 text-center text-sm">
      <div className="flex items-center justify-center gap-3">
        <p>
          <span className="font-semibold text-blue-400">
            Built by{" "}
          </span>

          <a
            href="https://gadm12.github.io/portfolio/#about"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-yellow-500 underline hover:text-yellow-400"
          >
            Mohamed Gad | Software Engineer
          </a>
        </p>

        <a
          href="https://github.com/gadm12"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Mohamed Gad's GitHub"
          className="text-xl text-white hover:text-yellow-500"
        >
          <FaGithub />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
