import { useState, useEffect } from "react";
import { db, auth } from "../config/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import UserMenu from './UserMenu';

const Header = () => {
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setAdminName(`${data.firstName} ${data.lastName}`);
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching admin data:", error);
        }
      }
    });

    return () => unsubscribe(); // cleanup
  }, []);

  return (
    <header id="header" className="header ">
      <div className="top-left">
        <div className="navbar-header">
          <h1 className="m-0">
            <i className="fa fa-building text-warning me-3" />
            APEX
          </h1>
        </div>
      </div>

      <div className="top-right">
        <div className="header-menu">
          <div className="user-area dropdown float-right">
            <a href="#" className="user-link" data-toggle="dropdown">
              {adminName}
            </a>
            <div className="dropdown-menu">
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
