import { useState, useEffect } from "react";
import { db, auth } from "../config/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Profile() {
  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    profileImage:
      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchAdminData = async () => {
          try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setAdminData((prev) => ({ ...prev, ...docSnap.data() }));
            } else {
              setError("No such document!");
            }
          } catch (error) {
            console.error("Error fetching admin data:", error);
            setError("Error fetching admin data");
          } finally {
            setLoading(false);
          }
        };

        fetchAdminData();
      } else {
        setLoading(false);
        setError("User not authenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value,
    });
  };


  const validateForm = () => {
    const { firstName, lastName, email, phone, location } = adminData;
    if (!firstName || !lastName || !email || !phone || !location) {
      Swal.fire({
        title: "Error",
        text: "All fields are required.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }

    if (!/^[a-zA-Z]*$/.test(firstName) || !/^[a-zA-Z]*$/.test(lastName)) {
      Swal.fire({
        title: "Error",
        text: "First name and last name must contain only alphabets.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Swal.fire({
        title: "Error",
        text: "Invalid email format.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }
    if (!/^07\d{8}$/.test(phone)) {
      Swal.fire({
        title: "Error",
        text: "Phone number must start with 07 and be exactly 10 digits long.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }
    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, adminData);
        Swal.fire({
          title: "Profile updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error updating profile");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container className="py-5">
      <Row>
        <Col md={4} className="text-center mb-4">
          <Card className="p-3 shadow-sm">
            <Image
              src={adminData.profileImage}
              roundedCircle
              style={{ width: "120px", margin: "auto" }}
            />
            <h5 className="mt-3">
              {adminData.firstName} {adminData.lastName}
            </h5>
            <p className="text-muted mb-0">Administrator</p>
            <p className="text-muted">{adminData.location}</p>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <h4 className="mb-4">Edit Profile</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  value={adminData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  value={adminData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={adminData.email}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  name="phone"
                  value={adminData.phone}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter location"
                  name="location"
                  value={adminData.location}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update Profile
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
