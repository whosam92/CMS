import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebaseConfig"; // Import Firebase auth config
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Topbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check if user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // Redirect to homepage after logout
  };

  return (
    <>
      {/* Topbar Start */}
      <div className="container-fluid bg-light p-0">
        <div className="row gx-0 d-none d-lg-flex">
          <div className="col-lg-7 px-5 text-start">
            <div className="h-100 d-inline-flex align-items-center border-start border-end px-3">
              <small className="fa fa-phone-alt me-2" />
              <small>  +962777777777
              </small>
            </div>
            <div className="h-100 d-inline-flex align-items-center border-end px-3">
              <small className="far fa-envelope-open me-2" />
              <small> apex@gmail.com </small>
            </div>
            <div className="h-100 d-inline-flex align-items-center border-end px-3">
              <small className="far fa-clock me-2" />
              <small>Mon - Fri : 09 AM - 09 PM</small>
            </div>
          </div>
          <div className="col-lg-5 px-5 text-end">
            <div className="container-fluid bg-light p-0">
              <div className="row gx-0 d-none d-lg-flex justify-content-end">
                <div className="col-lg-5 px-5 text-end">
                  <div className="h-100 d-inline-flex align-items-center">
                    {/* Conditionally render buttons based on user state */}
                    {user ? (
                      <>
                        <button
                          className="btn btn-primary me-2 py-1 my-1"
                          onClick={() => navigate("/profile")}
                        >
                          Profile
                        </button>
                        <button
                          className="btn btn-danger py-1 my-1"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary me-2 py-1 my-1"
                          onClick={() => navigate("/auth/")}
                        >
                          Login
                        </button>
                        <button
                          className="btn btn-secondary py-1 my-1"
                          onClick={() => navigate("/auth/register")}
                        >
                          Register
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Topbar End */}
    </>
  );
}
