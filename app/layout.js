import "./globals.css";
import ScrollMotion from "@/components/ScrollMotion";

export const metadata = {
  title: "Mansoori Mobility | Move Goods. Move People.",
  description: "A trusted marketplace for freight transport and car rentals.",
  applicationName: "Mansoori Mobility"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ScrollMotion />
        {children}
      </body>
    </html>
  );
}
