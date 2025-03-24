import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCol, MDBRow, MDBInput } from 'mdb-react-ui-kit';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '/public/css/input.css';
import Swal from 'sweetalert2'
function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        phone,
        location,
        email,
        role
      });

      Swal.fire({
        title: 'Registration successful!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate("/auth");
      });

      
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use. Please use a different email.");
      } else {
        setError(err.message);
      }
    }
  };

  const validateForm = () => {
    if (!firstName || !lastName || !email || !phone || !location || !password) {
      setError("All fields are required.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    if (!/^07\d{8}$/.test(phone)) {
      setError("Phone number must start with 07 and be exactly 10 digits long.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  return (
    <>
      
      <MDBContainer fluid className='my-3 align-items-center w-50'>
        <MDBRow className='g-0 align-items-center'>
          <MDBCol col='6'>
            <MDBCard className='cascading-right form-background'>
              <MDBCardBody className='p-3 shadow-5 text-center rounded-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '8px' }}>
                <h2 className="fw-bold mb-5 text-light">Register</h2>
                <form onSubmit={handleSignUp}>
                  <MDBRow>
                    <MDBCol col='6'>
                      <MDBInput wrapperClass='mb-4' className='input-transparent' placeholder='First Name' type='text'
                        value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </MDBCol>
                    <MDBCol col='6'>
                      <MDBInput wrapperClass='mb-4' className='input-transparent' placeholder='Last Name' type='text'
                        value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol col='6'>
                      <MDBInput wrapperClass='mb-4' className='input-transparent' placeholder='Phone Number' type='text'
                      value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </MDBCol>
                    <MDBCol col='6'>
                      <MDBInput wrapperClass='mb-4' className='input-transparent' placeholder='Location' type='text'
                        value={location} onChange={(e) => setLocation(e.target.value)} required />
                    </MDBCol>
                  </MDBRow>
                  <MDBInput wrapperClass='mb-4' className='input-transparent' placeholder='Email' type='email'
                    value={email} onChange={(e) => setEmail(e.target.value)} required />
                  
                  <MDBInput wrapperClass='mb-4' className='input-transparent' placeholder='Password' type='password'
                    value={password} onChange={(e) => setPassword(e.target.value)} required />
                  {/* <div className="mb-4">
                    <select className="input-transparent" value={role} onChange={(e) => setRole(e.target.value)} required>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div> */}
                  <button className='w-100 mb-4 btn btn-warning' size='md' type="submit">Register</button>
                </form>
                  {error && (
                    <p className="text-danger bg-light" style={{ fontSize: "1rem" }}>{error}</p>
                  )}
                <div className="text-center text-light">
                  <p>Already have an account? <a href="/auth">Sign In</a></p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      
    </>
  );
}

export default Register;