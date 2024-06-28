import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product",
  description: "dsfasfafasfadsfsfd",
};

export default function page({ params }: { params: { id: string } }) {
  return <div>{params.id}</div>;
}
