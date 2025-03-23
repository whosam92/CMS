import { useState, useEffect } from "react";
import { db, auth } from "../config/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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

const Profile = () => {
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
    const fetchAdminData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setAdminData((prev) => ({ ...prev, ...docSnap.data() }));
          } else {
            setError("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setError("Error fetching admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, adminData);
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
};

export default Profile;
