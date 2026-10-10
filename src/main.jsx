import React from "react";
import { createRoot } from "react-dom/client";
import "@chris-antonio/dfts-react/styles.css"; // DFTS tokens + component styles
import "./app.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
