import Layout from "@/components/layout/Layout";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children} </Layout>
      </body>
    </html>
  );
}
