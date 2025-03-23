import { useEffect, useState } from "react";
import { db } from "../config/Firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Table, Card, Spinner, Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    location: "",
    role: "User",
  });

  // Fetch users from Firestore
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle adding a new user
  const handleAddUser = async () => {
    try {
      await addDoc(collection(db, "users"), newUser);
      setNewUser({ first_name: "", last_name: "", email: "", phone: "", location: "", role: "User" });
      setShowAddModal(false); // Close modal
      fetchUsers(); // Re-fetch users
      Swal.fire({
        title: 'User added successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteDoc(doc(db, "users", id));
        fetchUsers(); // Re-fetch users after deletion
        Swal.fire({
          title: 'User deleted successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (error) {
        console.error("Error deleting user", error);
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mx-3 mb-4 pb-4">
        <h2 className="text-center mb-0">Users List</h2>
        <Button
          variant="warning"
          onClick={() => setShowAddModal(true)}
          className="mb-4 text-center"
        >
          Add New User
        </Button>
      </div>

      <div className="row mb-4 text-center">
        <div className="col-md-4">
          <Card>
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text className="fs-1">
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  users.length
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-4">
          <Card>
            <Card.Body>
              <Card.Title>Active Users</Card.Title>
              <Card.Text className="fs-1">
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  users.filter((user) => user.role.toLowerCase() === "user")
                    .length
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-4">
          <Card>
            <Card.Body>
              <Card.Title>Admins</Card.Title>
              <Card.Text className="fs-1">
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  users.filter((user) => user.role.toLowerCase() === "admin").length
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      {loading ? (
        <Spinner animation="border" className="d-block mx-auto" />
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle table-bordered">
            <thead className="table-dark color-warning text-center">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Location</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td className="text-capitalize">{user.location}</td>
                  <td className="text-capitalize">{user.role}</td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for adding a new user */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center mt-4">Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={newUser.first_name}
                onChange={(e) =>
                  setNewUser({ ...newUser, first_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={newUser.last_name}
                onChange={(e) =>
                  setNewUser({ ...newUser, last_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={newUser.location}
                onChange={(e) =>
                  setNewUser({ ...newUser, location: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              >
                <option>User</option>
                <option>Admin</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;