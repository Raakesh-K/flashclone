"use client";

import { Box, HStack, Text, VStack } from "@chakra-ui/react";

export default function Logo() {
  return (
    <HStack gap="3" align="center">
      
      {/* Logo Symbol */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 8px)"
        gap="3px"
      >
        {[...Array(4)].map((_, index) => (
          <Box
            key={index}
            width="8px"
            height="8px"
            bg="yellow.400"
            borderRadius="full"
          />
        ))}
      </Box>

      {/* Logo Text */}
      <VStack gap="0" align="start">
        <Text
          fontSize="28px"
          fontWeight="700"
          lineHeight="1"
          letterSpacing="1px"
        >
          flash
        </Text>

        <Text
          fontSize="9px"
          fontWeight="500"
          letterSpacing="3px"
          lineHeight="1"
        >
          ACCOUNTANT
        </Text>
      </VStack>

    </HStack>
  );
}