import "../styles/globals.css";
import Layout from "@/components/Layout";

export const metadata = {
  title: "StockED",
  description: "Market analysis dashboard built with Next.js + FastAPI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
