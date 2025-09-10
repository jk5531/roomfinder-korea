import "./globals.css";

export const metadata = {
  title: "Roomfinder Korea",
  description: "Find low deposit rooms in Korea"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
