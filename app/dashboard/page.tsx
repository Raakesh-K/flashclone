import { Box, Text } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Box minH="100vh" p="50px">
      <Text fontSize="32px" fontWeight="bold" mb="16px">
        Welcome to the Dashboard
      </Text>
      <Text fontSize="18px" color="gray.400">
        You have successfully logged in!
      </Text>
    </Box>
  );
}
