import { useEffect, useRef, useState } from "react";
import styles from "./Register.module.css";
import Button from "../Button/Button";
import { RiUser2Fill } from "react-icons/ri";
import { IoIosCheckmark } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

function Register() {
  const { register, reset, loading, error } = useAuth();
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uploaded, setUploaded] = useState("");
  const fileRef = useRef(null);
  const [showError, setShowError] = useState(false);

  function handleFileChange(e) {
    if (e.target.files.length > 0) {
      setUploaded(true);
    } else {
      setUploaded(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowError(true);
    const formData = new FormData(e.currentTarget);
    register(formData);
  }

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <section className={styles.login}>
      <form onSubmit={handleSubmit}>
        <input
          name="userName"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`${!username && showError && styles.error}`}
        />
        <div>
          <input
            name="firstName"
            placeholder="Firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className={`${!firstname && showError && styles.error}`}
          />
          <input
            name="lastName"
            placeholder="Lastname"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            className={`${!lastname && showError && styles.error}`}
          />
        </div>
        <input
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${!email && showError && styles.error}`}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${!password && showError && styles.error}`}
        />
        <div className={styles.file}>
          <label htmlFor="file">{uploaded ? <IoIosCheckmark /> : <RiUser2Fill />}</label>
          <input type="file" name="profilePic" id="file" ref={fileRef} onChange={handleFileChange} />
          <p>{uploaded ? "Image included :)" : "Maybe include a nice image of you?"}</p>
        </div>
        {loading && <Loading />}
        {error && <p className="error">{error}</p>}
        <Button text="Register">Register</Button>
        <Link to="/worldwise/login" className={styles.link}>
          Already have an account?
        </Link>
      </form>
    </section>
  );
}

export default Register;
