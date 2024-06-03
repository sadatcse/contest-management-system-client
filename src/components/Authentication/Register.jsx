import { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Swal from 'sweetalert2';
import { AuthContext } from './../../providers/AuthProvider';
import { updateProfile } from "firebase/auth";
import UseAxioSecure from '../Hook/UseAxioSecure';

const Register = () => {
  const { createUser, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = UseAxioSecure();

  const handleRegister = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    const gender = e.target.Gender.value;
    const Photourl = e.target.Photourl.value;
    const role = 'user';

    if (name.trim() === '') {
      Swal.fire('Error', 'Please enter your name.', 'error');
      return;
    } else if (name.length < 3) {
      Swal.fire('Error', 'Name should be at least 3 characters long.', 'error');
      return;
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      Swal.fire('Error', 'Please enter a valid name (alphabetic characters and spaces only).', 'error');
      return;
    } else if (password.length < 6) {
      Swal.fire('Error', 'Password should be at least 6 characters or longer.', 'error');
      return;
    } else if (!/(?=.*[A-Z])(?=.*[^A-Za-z0-9])/.test(password)) {
      Swal.fire('Error', 'Your password should have at least one uppercase character and one special character.', 'error');
      return;
    } else if (!/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) {
      Swal.fire('Error', 'Please enter a valid email address.', 'error');
      return;
    } else if (!accepted) {
      Swal.fire('Error', 'Please accept our terms and conditions.', 'error');
      return;
    }
    createUser(email, password)
      .then(result => {
        updateProfile(result.user, {
          displayName: name,
          photoURL: Photourl,
        });

        const userEmail = result.user?.email;

        const user = { name, Photourl, email: userEmail, gender, role };
        axiosSecure.post('/user/post', user)
          .then(data => {
            console.log(data);
          })
          .then(() => {
            Swal.fire('Success', 'New User Created Successfully', 'success').then(() => {
              navigate(location.state?.from || "/dashboard");
            });
          })
          .catch(error => {
            Swal.fire('Error', error.message, 'error');
          });
      })
      .catch(error => {
        Swal.fire('Error', error.message, 'error');
      });
  };

    return (
      
<div className="bg-gray-100 min-h-screen flex items-center justify-center">
  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <h2 className="text-5xl mb-8 text-center">Sign up!</h2>
    <form onSubmit={handleRegister}>
      <input
        className="mb-4 border rounded-lg w-full py-2 px-4"
        type="text"
        name="name"
        placeholder="Full Name"
        id="namereg"
        required
      />
      <input
        className="mb-4 border rounded-lg w-full py-2 px-4"
        type="text"
        name="email"
        placeholder="Email Address"
        id="emailreg"
        required
      />
      <div className="mb-4">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="Gender"
          className="w-full border rounded-lg py-2 px-4"
          required
        >
          <option value="" disabled defaultValue>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="mb-4">
        <div className="relative">
          <input
            className="w-full border rounded-lg py-2 px-4"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            id="passreg"
            required
          />
          <span
            className="absolute top-3 right-2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>
      <div className="mb-2">
        <input type="checkbox" name="terms" id="terms" />
        <label className="ml-2" htmlFor="terms">
          Accept our Terms and Conditions
        </label>
      </div>
      <div className="mb-2">
        <h3>Photolink</h3>
        <input
          className="mb-2 border rounded-lg w-full py-2 px-4"
          type="text"
          name="Photourl"
          placeholder="Photourl"
          id="photourl"
          required
        />
      </div>
      <input
        className="btn btn-secondary mb-4 rounded-lg w-full py-2 px-4 bg-blue-500 text-white"
        type="submit"
        value="Register"
      />
    </form>
    <p className="text-center">
      Already have an account? Please <Link to="/login">Login</Link>
    </p>
  </div>
</div>

    );
};

export default Register;

