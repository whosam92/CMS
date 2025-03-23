import { useEffect, useState } from "react";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackTop from "./components/BackTop";

export default function Contact() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ subject: "", message: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setUser({
            fullName: `${data.firstName} ${data.lastName}`,
            email: data.email,
          });
        }
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    let newErrors = {};
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await addDoc(collection(db, "contact_us"), {
        Email: user.email,
        "Full Name": user.fullName,
        Subject: formData.subject,
        Message: formData.message,
      });
      Swal.fire({
        title: "Message Sent!",
        text: "Your message has been received. We'll get back to you shortly.",
        icon: "success",
        confirmButtonColor: "#fda12b",
      });
      setFormData({ subject: "", message: "" });
    } catch (err) {
      console.error("Error saving message:", err);
    }
  };

  return (
    <>
      <Header title="Contact Us" />
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              {/* Google Map */}
              <iframe
                className="w-100 h-100"
                style={{ minHeight: 450, border: 0 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d68200.47735200678!2d35.810771238605795!3d32.01044834106399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca376353d78e7%3A0xd43933b341374f91!2sOrange%20digital%20center%20-%20salt!5e0!3m2!1sen!2sjo!4v1742655185588!5m2!1sen!2sjo"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            <div className="col-lg-6">
              <div className="border-start border-5 border-primary ps-4 mb-4">
                <h6 className="text-body text-uppercase mb-2">Contact Us</h6>
                <h1 className="display-6 mb-0">Send Us a Message</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control border-0 bg-light"
                    value={user?.fullName || ""}
                    disabled
                  />
                  <label>Your Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control border-0 bg-light"
                    value={user?.email || ""}
                    disabled
                  />
                  <label>Your Email</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`form-control border-0 bg-light ${
                      errors.subject ? "is-invalid" : ""
                    }`}
                    placeholder="Subject"
                  />
                  <label>Subject</label>
                  {errors.subject && (
                    <div className="text-danger ms-1 mt-1 small">
                      {errors.subject}
                    </div>
                  )}
                </div>

                <div className="form-floating mb-3">
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-control border-0 bg-light ${
                      errors.message ? "is-invalid" : ""
                    }`}
                    placeholder="Message"
                    style={{ height: 120 }}
                  ></textarea>
                  <label>Message</label>
                  {errors.message && (
                    <div className="text-danger ms-1 mt-1 small">
                      {errors.message}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary px-4 py-2">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <BackTop />
    </>
  );
}
