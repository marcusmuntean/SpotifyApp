import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        navigate("/Home");
        //<Route path="/" element={<Home />} />
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toast.error("Incorrect Email or Password");
      });
  };
  const styles = `
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: #1976d2 !important;
    -webkit-box-shadow: 0 0 0px 1000px #121212 inset !important;
  }
`;

  return (
    <>
      {" "}
      <style>{styles}</style>
      <main>
        <section>
          <div style={{ marginTop: "30px" }}>
            <h1
              style={{
                display: "flex",
                margin: "auto",
                justifyContent: "center",
                fontFamily: "Arial, sans-serif",
                fontSize: "32px",
                fontWeight: "bold",
                color: "#0087f5",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              Thomas Jefferson Academic Information System
            </h1>
            <h4
              style={{
                display: "flex",
                margin: "auto",
                justifyContent: "center",
                marginTop: "15px",
              }}
            >
              "Unlocking Potential, Igniting Excellence"
            </h4>
            <br></br>
            <form>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                  marginTop: "40px",
                }}
              >
                <Box style={{ width: "250px" }}>
                  <TextField
                    variant="outlined"
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    label="Email Address"
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <Box style={{ width: "250px" }}>
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      required
                      fullWidth
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </Box>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" onClick={onLogin}>
                  Login
                </Button>
              </div>
            </form>
            <form>
              <ToastContainer /> 
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
