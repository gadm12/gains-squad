import { Link } from "react-router-dom";

import {
  notFoundDiv,
  notFoundHeader,
  notFoundDescription,
  notFoundParagraph,
  notFoundLink,
} from "./styles/tailwindStyles";

export default function NotFoundPage() {
  //!code

  return (
    <>
      <div className={notFoundDiv}>
        <h1 className={notFoundHeader}>404</h1>
        <h2 className={notFoundDescription}>
          Looks Like You Took a Wrong Turn
        </h2>
        <p className={notFoundParagraph}>
          This page skipped the workout. Let's get you back
          on track.
        </p>
        <Link className={notFoundLink} to="/">
          Back to Gains Squad
        </Link>
      </div>
    </>
  );
}
