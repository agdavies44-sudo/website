import type { Metadata } from "next";
import { EditClient } from "./EditClient";

export const metadata: Metadata = {
  title: "Edit work content",
  robots: { index: false, follow: false },
};

export default function EditPage() {
  return <EditClient />;
}
