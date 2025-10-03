"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </UserProvider>
  );
}
