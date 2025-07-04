"use client";

import { useCurrentTheme } from "@/hooks/use-current-theme";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

interface Props {
  showName?: boolean;
}

export const UserControl = ({ showName }: Props) => {
  const currentTheme = useCurrentTheme();

  return (
    <UserButton
      showName={showName}
      appearance={{
        elements: {
          userButtonBox: "rounded-lg!",
          userButtonAvatarBox: "rounded-lg! size-8!",
          userButtonTrigger: "rounded-lg!",
        },
        baseTheme: currentTheme === "dark" ? dark : undefined,
      }}
    />
  );
};
