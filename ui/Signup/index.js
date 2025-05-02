"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import styles from "./styles.module.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otpData, setOtpData] = useState({
    otp: "",
    verified: false,
    sent: false,
  });
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const sendOTP = async () => {
    try {
      setLoading(true);
      await axios.post("/api/auth/send-otp", { email: formData.email });
      setOtpData((prev) => ({ ...prev, sent: true }));
      setTimer(120); // 2 minutes countdown
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const verifyOTP = async () => {
    try {
      setLoading(true);
      await axios.post("/api/auth/verify-otp", {
        email: formData.email,
        otp: otpData.otp,
      });
      setOtpData((prev) => ({ ...prev, verified: true }));
    } catch (err) {
      console.error(err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpData.verified) {
      setError("Please verify your email first");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    const formattedData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
    };

    try {
      const { data } = await axios.post("/api/auth/signup", formattedData);
      await login(data.user);
      window.location.href = "/game";
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} ${styles.responsive_wrapper}`}>
        <div className={styles.welcome_panel}>
          <h2 className={styles.welcome_title}>Welcome Back!</h2>
          <p className={styles.welcome_text}>
            Already have an account? Sign in here!
          </p>
          <Link href="/login">
            <button className={styles.switch_button}>Sign In</button>
          </Link>
        </div>
        <div className={styles.form_panel}>
          <h2 className={styles.title}>Create Your Account</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={styles.input}
              disabled={loading}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className={styles.input}
              disabled={loading}
              required
            />
            <div className={styles.email_verification}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                disabled={loading || otpData.verified}
                required
              />
              {!otpData.verified && (
                <button
                  type="button"
                  onClick={sendOTP}
                  className={styles.otp_button}
                  disabled={loading || !formData.email || timer > 0}
                >
                  {timer > 0
                    ? `Resend in ${timer}s`
                    : otpData.sent
                      ? "Resend OTP"
                      : "Send OTP"}
                </button>
              )}
            </div>

            {otpData.sent && !otpData.verified && (
              <div className={styles.otp_section}>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otpData.otp}
                  onChange={(e) =>
                    setOtpData((prev) => ({ ...prev, otp: e.target.value }))
                  }
                  className={`${styles.input} ${styles.otp_input}`}
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={verifyOTP}
                  className={styles.verify_button}
                  disabled={loading || !otpData.otp}
                >
                  Verify OTP
                </button>
              </div>
            )}

            {otpData.verified && (
              <>
                <input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={loading}
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={loading}
                  required
                />
              </>
            )}

            {/* Submit button and error message */}
            <div className={styles.submit_button_wrapper}>
              <button
                type="submit"
                className={styles.submit_button}
                disabled={loading || !otpData.verified}
              >
                {loading ? (
                  <div className={styles.loader}>
                    <div className={styles.spinner}></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
