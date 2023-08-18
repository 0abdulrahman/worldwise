import { useNavigate } from "react-router-dom";

import styles from "./Homepage.module.css";

function Homepage() {
  const navigate = useNavigate();
  return (
    <>
      <main className={styles.main}>
        <section>
          <h1 className="visually-hidden">WorldWise - Keep track of your adventures.</h1>
          <h2>
            You travel the world. <br /> WorldWise keeps track of your adventures.
          </h2>
          <p>
            A world map that tracks your footsteps into every city you can think of. <br /> Never forget your wonderful
            experiences, and show your friends how you have wandered the world.
          </p>
          <button onClick={() => navigate("/worldwise/app")}>Start tracking now</button>
        </section>
      </main>
    </>
  );
}

export default Homepage;
