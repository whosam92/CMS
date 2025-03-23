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
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name} ${user.email} ${user.phone} ${user.location} ${user.role}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Handle adding a new user
  const handleAddUser = async () => {
    try {
      await addDoc(collection(db, "users"), newUser);
      setNewUser({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        location: "",
        role: "User",
      });
      setShowAddModal(false);
      fetchUsers();
      Swal.fire({
        title: "User added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "users", id));
          fetchUsers();
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting user", error);
        }
      }
    });
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Users List</h2>
        <Button variant="warning" onClick={() => setShowAddModal(true)}>
          Add New User
        </Button>
      </div>

      <div className="row mb-4">
        {["Total Users", "Active Users", "Admins"].map((title, index) => (
          <div className="col-md-4" key={index}>
            <Card>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text className="fs-1">
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : title === "Total Users" ? (
                    users.length
                  ) : (
                    users.filter(
                      (user) =>
                        user.role.toLowerCase() ===
                        (title === "Admins" ? "admin" : "user")
                    ).length
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <Spinner animation="border" className="d-block mx-auto" />
      ) : (
        <Table striped bordered hover>
          <thead className="table-dark text-center">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.location}</td>
                <td>{user.role}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["first_name", "last_name", "email", "phone", "location"].map(
              (field, index) => (
                <Form.Group key={index}>
                  <Form.Label>
                    {field.replace("_", " ").toUpperCase()}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser[field]}
                    onChange={(e) =>
                      setNewUser({ ...newUser, [field]: e.target.value })
                    }
                  />
                </Form.Group>
              )
            )}
            <Form.Group>
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
