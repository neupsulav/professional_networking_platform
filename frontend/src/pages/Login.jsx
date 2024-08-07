import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import Cookies from "universal-cookie";

const Login = () => {
  //   const navigate = useNavigate();
  //   const location = useLocation();
  //   const [errorMessage, setErrorMessage] = useState("");
  //   const cookies = new Cookies();

  //   const [user, setUser] = useState({
  //     email: "",
  //     password: "",
  //   });

  //   let name, value;
  //   const handleInputs = (event) => {
  //     name = event.target.name;
  //     value = event.target.value;

  //     setUser({ ...user, [name]: value });
  //   };

  //   const postData = async (e) => {
  //     e.preventDefault();

  //     const { email, password } = user;

  //     const res = await fetch("/api/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: email,
  //         password: password,
  //       }),
  //     });

  //     const response = await res.json();

  //     if (res.status === 400) {
  //       setErrorMessage("Please fill all the fields");
  //     } else if (res.status === 401) {
  //       setErrorMessage("Invalid user credentials");
  //     } else if (res.status === 406) {
  //       setErrorMessage("Email is not verified");
  //     } else {
  //       // setting cookies
  //       cookies.set("jwtToken", response.token, {
  //         path: "/",
  //         expires: new Date(Date.now() + 2629800000),
  //       });

  //       // navigate to home page
  //       navigate("/");
  //     }
  //   };

  return (
    <>
      {/* login page */}
      <div className="login_page">
        <div className="login_Container">
          <div className="login_form">
            <div className="login_image">
              <img src="https://www.go.ooo/img/bg-img/Login.jpg" alt="login" />
            </div>
            <div className="form">
              <div className="heading">
                <h1>Login</h1>
              </div>
              <div className="form_inputs">
                <div className="data_input">
                  <AiOutlineMail className="login_icons" />

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    autoComplete="off"
                    required
                    // value={user.name}
                    // onChange={handleInputs}
                  />
                </div>

                <div className="data_input">
                  <RiLockPasswordLine className="login_icons" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    // value={user.password}
                    // onChange={handleInputs}
                  />
                </div>
              </div>
              <div>
                <button type="submit" className="login_btn">
                  Login
                </button>
              </div>
              <div className="register_message">
                <p>
                  Haven't registered yet?
                  <Link to="/signup-options" className="register_btn_link">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
