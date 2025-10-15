import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import OfflineBanner from "./OfflineBanner";
import ErrorBoundary from "./ErrorBoundary";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <ErrorBoundary>
    <div className="flex flex-col min-h-screen bg-surface text-gray-100">
      <Header />
      <OfflineBanner />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  </ErrorBoundary>
);

export default Layout;
