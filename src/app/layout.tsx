import type { Metadata } from "next";
import "./globals.css";
import { SortingAlgorithmProvider } from "@/context/visualizer";

export const metadata: Metadata = {
  title: "Sorting Visualizer",
  description: "A sorting visualizer built with NextJS and TypeScript by Adeeb Khan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <SortingAlgorithmProvider>{children}</SortingAlgorithmProvider>
      </body>
    </html>
  );
}
