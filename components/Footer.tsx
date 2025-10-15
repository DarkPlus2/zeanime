// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-primary text-white p-6 text-center mt-6 shadow-inner">
      <p>© {new Date().getFullYear()} ZeAnime. All rights reserved.</p>
    </footer>
  );
}
