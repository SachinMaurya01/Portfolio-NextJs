import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { VariantProvider } from "@/utils/hooks";
import { constructMetadata } from "@/utils";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')return;if(t==='dark'||!matchMedia('(prefers-color-scheme: light)').matches)document.documentElement.classList.add('dark')}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${grotesk.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <VariantProvider>
          <CustomCursor />
          {children}
        </VariantProvider>
      </body>
    </html>
  );
}
