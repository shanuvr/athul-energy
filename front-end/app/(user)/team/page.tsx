import TeamPage, { metadata as baseMetadata } from "../about/team/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "/about/team",
  },
};

export default TeamPage;
