import React, { useEffect, useState } from "react";

const OfflineBanner: React.FC = () => {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const handle = () => setOffline(!navigator.onLine);
    handle();
    window.addEventListener("online", handle);
    window.addEventListener("offline", handle);
    return () => {
      window.removeEventListener("online", handle);
      window.removeEventListener("offline", handle);
    };
  }, []);

  if (!offline) return null;
  return (
    <div className="fixed top-0 w-full bg-red-600 text-white text-center py-2 z-50">
      ⚠️ You are offline. Some features may not work.
    </div>
  );
};

export default OfflineBanner;
