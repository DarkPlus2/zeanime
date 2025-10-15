import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-panel border-t border-gray-800 py-6 mt-10">
    <div className="container text-center text-gray-400 text-sm space-y-2">
      <p>© {new Date().getFullYear()} Zeanime. All rights reserved.</p>
      <p>
        Built with ❤️ using <span className="text-primary">Next.js</span> +{" "}
        <span className="text-primary">Tailwind CSS</span>
      </p>
    </div>
  </footer>
);

export default Footer;
