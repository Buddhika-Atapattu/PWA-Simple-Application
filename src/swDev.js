export default function swDev() {
  if ("serviceWorker" in navigator && navigator.onLine) {
    // Check if service worker feature is available AND user is online

    const swURL = `${process.env.PUBLIC_URL}/sw.js`;

    navigator.serviceWorker.getRegistration().then((registration) => {
      if (!registration) {
        // No service worker registered yet, so register a new one
        navigator.serviceWorker
          .register(swURL)
          .then((response) => {
            console.warn("Service Worker Registered:", response);
          })
          .catch((error) => {
            console.error("Service Worker Registration Failed:", error);
          });
      } else {
        // Already registered
        console.warn("Service Worker already registered:", registration);

        if (navigator.onLine) {
          registration.update(); // Try to update if online
        }
      }
    });
  } else {
    console.log("Service Worker not registered (offline or unsupported)");
  }
}
