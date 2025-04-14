import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [mode, setMode] = useState("password"); // "password" or "otp"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  // Email/Password Login
  const handlePasswordLogin = async () => {
    try {
      const res = await axios.post("https://login-application-heyd.onrender.com/api/auth/login", { email, password });
      alert(res.data.message);
      toast.success(res.data.message)
      navigate("/")
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // Send OTP
  const handleSendOtp = async () => {
    try {
      await axios.post("/api/send-otp", { phone });
      setOtpSent(true);
      alert("OTP sent to your number");
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  // Verify OTP
  const handleOtpLogin = async () => {
    try {
      const res = await axios.post("/api/verify-otp", { phone, otp });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <div style={styles.toggle}>
        <button
          style={mode === "password" ? styles.activeBtn : styles.btn}
          onClick={() => setMode("password")}
        >
          Password Login
        </button>
        <button
          style={mode === "otp" ? styles.activeBtn : styles.btn}
          onClick={() => setMode("otp")}
        >
          OTP Login
        </button>
      </div>

      {mode === "password" ? (
        <div style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
          />
          <button onClick={handlePasswordLogin} style={styles.btnFull}>Login</button>
        </div>
      ) : (
        <div style={styles.form}>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            style={styles.input}
          />

          {otpSent ? (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                style={styles.input}
              />
              <button onClick={handleOtpLogin} style={styles.btnFull}>Verify OTP</button>
            </>
          ) : (
            <button onClick={handleSendOtp} style={styles.btnFull}>Send OTP</button>
          )}
        </div>
      )}
      <button onClick={()=>{
        navigate("/register");
      }}>REgister</button>
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
    fontFamily: "Arial"
  },
  toggle: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },
  btn: {
    flex: 1,
    padding: "10px",
    cursor: "pointer",
    border: "1px solid #ccc",
    background: "#f9f9f9"
  },
  activeBtn: {
    flex: 1,
    padding: "10px",
    cursor: "pointer",
    border: "1px solid #007bff",
    background: "#007bff",
    color: "#fff"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "10px",
    fontSize: "14px"
  },
  btnFull: {
    padding: "10px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  }
};

export default Login;
