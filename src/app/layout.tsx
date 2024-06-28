"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import movie from "../../public/Movie.png";
import oval from "../../public/Oval.png";
import bookmark from "../../public/Bookmark.png";
import shape from "../../public/Shape.png";
import shape2 from "../../public/Shape (1).png";
import shapeGray from "../../public/Shape(gray).png";
import shapeWhite from "../../public/Shape (1)(white).png";
import tvWhite from "../../public/tv(white).png";
import markBookWhite from "../../public/Bookmark(white).png";
import tv from "../../public/tv.png";

const inter = Outfit({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Company name",
//   description: "Company description",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeLink, setActiveLink] = useState<string>("");

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <header className="flex flex-col items-center justify-between w-[96px] h-[860px] bg-[#161D2F] px-2 py-5 rounded-3xl m-4">
            <div className="flex flex-col items-center justify-between gap-14">
              <div>
                <Image
                  src={movie}
                  alt="Movie"
                  className=" w-8 h-7"
                  width={32}
                  height={26}
                />
              </div>
              <div className="flex flex-col gap-5 text-white font-bold">
                <Link href={"/"} onClick={() => setActiveLink("home")}>
                  <Image
                    src={activeLink === "home" ? shape : shapeGray}
                    alt="Shape"
                  />
                </Link>
                <Link href={"/about"} onClick={() => setActiveLink("about")}>
                  <Image
                    src={activeLink === "about" ? shapeWhite : shape2}
                    alt="shape"
                  />
                </Link>
                <Link
                  href={"/contacts"}
                  onClick={() => setActiveLink("contacts")}
                >
                  <Image
                    src={activeLink === "contacts" ? tvWhite : tv}
                    alt="Tv"
                  />
                </Link>
                <Link
                  href={"/bookmark"}
                  onClick={() => setActiveLink("bookmark")}
                >
                  <Image
                    src={activeLink === "bookmark" ? markBookWhite : bookmark}
                    alt="Bookmark"
                  />
                </Link>
              </div>
            </div>

            <div>
              <Link href={"/"}>
                <Image src={oval} alt="User" />
              </Link>
            </div>
          </header>
          <main className="flex-1 p-5">{children}</main>
        </div>
      </body>
    </html>
  );
}
