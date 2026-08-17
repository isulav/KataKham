import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/login", async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  try {
    const [rows] = await pool.query(
      `SELECT l.Username, l.password, c.Full_Name, c.PhoneNumber
       FROM login l
       LEFT JOIN createpage c ON c.Email = l.Username
       WHERE l.Username = ?`,
      [identifier]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const user = rows[0];

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        username: user.Username,
        name: user.Full_Name,
        phone: user.PhoneNumber,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error. Please try again." });
  }
});

app.post("/api/signup", async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  if (!name || !email || !phone || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  try {
    const [existing] = await pool.query(
      "SELECT Username FROM login WHERE Username = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO createpage (Full_Name, Email, PhoneNumber, Confirmpwd) VALUES (?, ?, ?, ?)",
      [name, email, phone, hashedPassword]
    );

    await pool.query(
      "INSERT INTO login (Username, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    return res.status(201).json({
      message: "Account created successfully",
      user: { username: email, name, phone },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Server error. Please try again." });
  }
});

// Update the logged-in user's phone number
app.put("/api/user/phone", async (req, res) => {
  const { username, phone } = req.body;

  if (!username || !phone) {
    return res.status(400).json({ error: "Username and phone are required." });
  }

  const phonePattern = /^[0-9+\-\s()]{7,15}$/;
  if (!phonePattern.test(phone)) {
    return res.status(400).json({ error: "Please enter a valid phone number." });
  }

  try {
    const [result] = await pool.query(
      "UPDATE createpage SET PhoneNumber = ? WHERE Email = ?",
      [phone, username]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Account not found." });
    }

    return res.status(200).json({
      message: "Phone number updated successfully.",
      phone,
    });
  } catch (err) {
    console.error("Update phone error:", err);
    return res.status(500).json({ error: "Server error. Please try again." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));