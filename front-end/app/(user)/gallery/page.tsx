import type { Metadata } from "next";
import GalleryClient from "@/components/user/GalleryClient";

export const metadata: Metadata = {
  title: "Field Archive & Photo Gallery | Athul Energy Consultants",
  description:
    "Field photographs from Athul Energy Consultants — verified energy audits, infrared thermal imaging surveys, electrical safety audits, and technical workshops across Kerala.",
  keywords: [
    "Athul Energy gallery",
    "Energy audit field photos",
    "Thermal imaging survey Kerala",
    "Electrical safety inspection",
    "BEE energy auditor training photos",
  ],
};

export default function GalleryPage() {
  return <GalleryClient />;
}
