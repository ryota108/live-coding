import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import React from "react";

const SetupPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return <div>create server</div>;
};

export default SetupPage;
