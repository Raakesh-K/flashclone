"use client";

import { useState } from "react";

import {
  Box,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";

import { FiCheck } from "react-icons/fi";

export default function RegisterStart({ onNext }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {
      id: 1,
      title:
        "I want to register a business and incorporate a company with your services",
    },
    {
      id: 2,
      title:
        "I own a company and would like to switch my Accountant",
    },
    {
      id: 3,
      title:
        "I want to talk to an expert",
    },
  ];

  return (
    <Box
      minH="100vh"
      bg="#090B10"
      color="white"
      px={{
        base: "24px",
        md: "50px",
        lg: "80px",
      }}
      py={{
        base: "30px",
        md: "50px",
      }}
    >
      {/* Heading */}
      <Box
        maxW="750px"
        mx="auto"
        textAlign="center"
        mb="50px"
      >
        <Text
          fontSize={{
            base: "28px",
            md: "36px",
          }}
          fontWeight="700"
          mb="12px"
        >
          How can we help you?
        </Text>

        <Text
          color="gray.400"
          fontSize={{
            base: "15px",
            md: "17px",
          }}
        >
          Select the option that best describes what
          you would like to do.
        </Text>
      </Box>

      {/* Options */}
      <Box
        maxW="700px"
        mx="auto"
      >
        {options.map((option) => {
          const isSelected =
            selectedOption === option.id;

          return (
            <Box
              key={option.id}
              mb="16px"
              border="1px solid"
              borderColor={
                isSelected
                  ? "#FFD900"
                  : "gray.700"
              }
              bg={
                isSelected
                  ? "#FFD900"
                  : "transparent"
              }
              borderRadius="8px"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{
                borderColor: "#FFD900",
              }}
              onClick={() =>
                setSelectedOption(option.id)
              }
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="60px"
            >
                {/* Option Text */}
                <Text
                  fontSize={{
                    base: "15px",
                    md: "16px",
                  }}
                  lineHeight="1.5"
                  color={
                    isSelected
                      ? "black"
                      : "white"
                  }
                  textAlign="center"
                >
                  {option.title}
                </Text>
              </Box>
          );
        })}

        {/* Next Button */}
        {selectedOption && (
          <Box position="fixed" bottom="30px" right="30px" zIndex="10">
            <Button
              width="100px"
              height="44px"
              bg="#FFD900"
              color="black"
              cursor="pointer"
              _hover={{
                bg: "#E6C300",
              }}
              onClick={() => {
                if (onNext) onNext();
              }}
            >
              Next
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}