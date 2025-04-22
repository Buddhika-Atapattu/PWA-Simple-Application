import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Components/NavBar";

export default function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Prevent the automatic prompt
      setDeferredPrompt(event); // Save the event
      setShowInstallButton(true); // Show custom install button
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Trigger the install prompt

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };

  return (
    <div className="App">
      <Navbar />

      {/* Your App Content Below Navbar */}
      <div className="content">
        {/* Add your routing, pages, or components here */}
      </div>

      {/* Custom Install Button */}
      {showInstallButton && (
        <div className="install-button-wrapper">
          <button onClick={handleInstallClick} className="btn btn-primary">
            Install App
          </button>
        </div>
      )}
    </div>
  );
}
