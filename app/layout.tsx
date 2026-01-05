import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Devil Fruits Explorer",
  description: "Explore One Piece Devil Fruits",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
