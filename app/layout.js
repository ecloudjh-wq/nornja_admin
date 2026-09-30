import "./globals.css";

export const metadata = {
  title: "노른자국어 관리자센터",
  description: "노른자국어 관리자센터",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
