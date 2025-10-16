import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Zeanime",
  description: "Watch Anime Online - Zeanime",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
        
      </body>
    </html>
  );
}
