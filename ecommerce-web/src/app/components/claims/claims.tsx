"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Text,
  Skeleton,
  Avatar,
  useClipboard,
  Button,
  Icon,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";

export function Claims() {
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>();
  const { user } = useUser();
  const { hasCopied, onCopy } = useClipboard(accessToken ?? "");

  useEffect(() => {
    async function retrieveAccessToken() {
      const response = await fetch("/api/account");
      if (response.ok) {
        const content = await response.text();
        setAccessToken(content.replaceAll('"', ""));
      }
      setLoading(false);
    }

    retrieveAccessToken();
  }, []);

  return (
    <Box>
      <Card>
        <CardHeader>
          <Heading size="md">Claims</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Avatar size="md" src={user?.picture ?? ""} />
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Username
              </Heading>
              <Text pt="2" fontSize="sm">
                {user?.name}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Email address
              </Heading>
              <Text pt="2" fontSize="sm">
                {user?.email}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Token
              </Heading>
              {loading ? (
                <Stack>
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                </Stack>
              ) : (
                <Box>
                  <Text pt="2" fontSize="sm">
                    {accessToken}
                  </Text>
                  <Button onClick={onCopy} mt={2}>
                    {hasCopied ? "Copied" : "Copy"}
                  </Button>
                </Box>
              )}
            </Box>
          </Stack>
        </CardBody>
      </Card>
      <Link
        href="/api/auth/logout"
        colorScheme="teal"
        variant="solid"
        mt={5}
        ml={5}
      >
        <Icon as={IoIosLogOut} />
        Log out
      </Link>
    </Box>
  );
}
