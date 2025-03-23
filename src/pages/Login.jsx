import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
} from "mdb-react-ui-kit";
import { auth, db } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import "/public/css/input.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.role === "admin") {
          // Dynamically load the admin entry point
          import("/src/admin/main-admin.jsx").then(() => {
            navigate("/admin");
          });
        } else {
          // Dynamically load the main entry point
          import("/src/main.jsx").then(() => {
            navigate("/");
          });
        }
      } else {
        setError("User data not found in the database.");
      }
    } catch (err) {
      console.error("Login Error:", err.message);

      if (err.code === "auth/user-not-found") {
        setError("Email not registered. Please sign up.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many requests. Try again later.");
      } else if (err.code === "auth/invalid-credential") {
        setError("Invalid credential. Try again.");
      } else {
        setError("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <>
      <MDBContainer fluid className="my-2 align-items-center w-75">
        <MDBRow className="g-0 justify-content-center">
          {/* <MDBCol md='6'>
          <img 
            src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
            className="w-100 rounded-4 shadow-4"
            alt="Login Illustration"
          />
        </MDBCol> */}

          <MDBCol md="6">
            <MDBCard className="my-5 cascading-right form-background ">
              <MDBCardBody
                className="p-5 text-center"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  borderRadius: "8px",
                }}
              >
                <h2 className="fw-bold mb-5 text-light">Login</h2>

                <form onSubmit={handleLogin}>
                  <MDBInput
                    wrapperClass="mb-4"
                    placeholder="Email"
                    className="input-transparent"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <MDBInput
                    wrapperClass="mb-4"
                    placeholder="Password"
                    className="input-transparent"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    className="w-100 mb-4 btn text-white"
                    style={{ backgroundColor: "#FDA12B" }}
                    size="md"
                    type="submit"
                  >
                    Login
                  </button>

                  {error && (
                    <p
                      className="text-danger bg-light"
                      style={{ fontSize: "1rem" }}
                    >
                      {error}
                    </p>
                  )}

                  <small className="text-light">
                    Don't have an account?{" "}
                    <a href="/auth/register" style={{ color: "#FDA12B" }}>
                      Register here
                    </a>
                  </small>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default Login;
