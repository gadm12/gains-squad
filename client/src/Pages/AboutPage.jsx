import {
  aboutHeader,
  aboutParagraphOne,
  aboutParagraphTwo,
} from "./styles/tailwindStyles";

export default function AboutPage() {
  //!code

  return (
    <>
      <h1 className={aboutHeader}>About Gains Squad</h1>
      <p className={aboutParagraphOne}>
        Gains Squad is a fitness tracking app designed to
        make planning and tracking workouts simple. Users
        can discover exercises, build workouts, track their
        training progress, and keep their fitness
        information organized in one place. Whether you're
        just getting started or working toward your next
        goal, Gains Squad helps you stay consistent and keep
        moving forward. Train. Track. Progress.
      </p>

      <p className={aboutParagraphTwo}>
        
        Gains Squad is also a full-stack software
        development project built with React on the frontend
        and Django REST Framework on the backend. The
        application integrates REST APIs, authentication, a
        PostgreSQL database, testing, Docker, and CI/CD to
        create a complete application from development
        through deployment.
      </p>
    </>
  );
}
