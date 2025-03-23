import { useState, useEffect } from "react";
import { db, auth } from "./admin/config/Firebase";
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
import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
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
        const fetchUserData = async () => {
          try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setUserData((prev) => ({ ...prev, ...docSnap.data() }));
            } else {
              setError("No such document!");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Error fetching user data");
          } finally {
            setLoading(false);
          }
        };

        fetchUserData();
      } else {
        setLoading(false);
        setError("User not authenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { firstName, lastName, email, phone, location } = userData;
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
    if (!validateForm(e)) return;
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, userData);
        Swal.fire({
          title: "Profile updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
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
    <Container className="py-5 mt-5">
      <Row>
        <Col md={4} className="text-center mb-4">
          <Card className="p-3 shadow-sm border-0">
            <Image
              src={userData.profileImage}
              roundedCircle
              style={{ width: "120px", margin: "auto", border: "3px solid #007bff" }}
            />
            <h5 className="mt-3 text-primary">
              {userData.firstName} {userData.lastName}
            </h5>
            <p className="text-muted mb-0">User</p>
            <p className="text-muted">{userData.location}</p>
          </Card>
          <Card className="mt-3 shadow-sm border-0">
            <Card.Body>
              <Card.Title className="text-primary">Contact</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {userData.email}
              </Card.Text>
              <Card.Text>
                <strong>Phone:</strong> {userData.phone}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mt-3 shadow-sm border-0">
            <Card.Body>
              <Card.Title className="text-primary mb-4">Actions</Card.Title>
              <Button
                variant="outline-primary"
                className="mb-4 w-100"
                onClick={() => navigate("/profile/contracts")}
              >
                View Contracts
              </Button>
              {/* <Button variant="outline-danger" className="w-100">
                Delete Account
              </Button> */}
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="p-4 shadow-sm border-0">
            <h4 className="mb-4 text-primary">Edit Profile</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label className="text-dark">First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  className="shadow-sm"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label className="text-dark">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  className="shadow-sm"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label className="text-dark">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={userData.email}
                  readOnly
                  className="shadow-sm"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label className="text-dark">Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="shadow-sm"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLocation">
                <Form.Label className="text-dark">Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter location"
                  name="location"
                  value={userData.location}
                  onChange={handleChange}
                  className="shadow-sm"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 shadow-sm">
                Update Profile
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
