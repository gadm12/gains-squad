import { Link } from "react-router-dom";

export default function NotFoundPage() {
  //!code

  return (
    <>
      <div>
        <h1>404</h1>
        <h2>Looks Like You Took a Wrong Turn</h2>
        <p>
          This page skipped the workout. Let's get you back
          on track.
        </p>
        <Link to="/">Back to Gains Squad</Link>
      </div>
      
    </>
  );
}
