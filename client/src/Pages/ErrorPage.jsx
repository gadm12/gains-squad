import {
  errorDiv,
  errorHeader,
  errorParagraph,
} from "./styles/tailwindStyles";

export default function ErrorPage() {
  //!code

  return (
    <>
      <div className={errorDiv}>
        <h1 className={errorHeader}>
          Something went wrong
        </h1>

        <p className={errorParagraph}>
          Please try again later.
        </p>
      </div>
    </>
  );
}
