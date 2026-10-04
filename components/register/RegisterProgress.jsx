"use client";

import { Box, Flex, Text } from "@chakra-ui/react";

const steps = [
  {
    number: 1,
    title: "Personal Details",
  },
  {
    number: 2,
    title: "Business Address",
  },
  {
    number: 3,
    title: "Password",
  },
];

export default function RegisterProgress({
  currentStep,
}) {
  return (
    <Box
      maxW="900px"
      mx="auto"
      mb="50px"
    >
      <Flex
        align="center"
        justify="center"
      >
        {steps.map((step, index) => {
          const isActive =
            currentStep >= step.number;

          const isLast =
            index === steps.length - 1;

          return (
            <Flex
              key={step.number}
              align="center"
              flex="1"
            >
              {/* Step */}

              <Flex
                direction="column"
                align="center"
                flexShrink="0"
              >
                <Flex
                  width="40px"
                  height="40px"
                  borderRadius="full"
                  align="center"
                  justify="center"
                  bg={
                    isActive
                      ? "#FFD900"
                      : "gray.700"
                  }
                  color={
                    isActive
                      ? "black"
                      : "gray.400"
                  }
                  fontWeight="700"
                >
                  {step.number}
                </Flex>

                <Text
                  fontSize="12px"
                  color={
                    isActive
                      ? "white"
                      : "gray.500"
                  }
                  mt="8px"
                  textAlign="center"
                  whiteSpace="nowrap"
                >
                  {step.title}
                </Text>
              </Flex>

              {/* Connector */}

              {!isLast && (
                <Box
                  flex="1"
                  height="2px"
                  bg={
                    currentStep >
                    step.number
                      ? "#FFD900"
                      : "gray.700"
                  }
                  mx="12px"
                  mt="-20px"
                />
              )}
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}