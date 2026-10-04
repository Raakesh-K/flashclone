"use client";

import {
  Box,
  Button,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";
import { useFormContext } from "react-hook-form";

export default function RegisterPassword({ onNext, onPrev }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const onSubmit = (data) => {
    console.log("Complete Registration Data:");
    console.log(data);
    if (onNext) onNext();
  };

  return (
    <Box
      minH="100vh"
      px={{
        base: "24px",
        sm: "32px",
        md: "50px",
        lg: "70px",
        xl: "90px",
      }}
      py={{
        base: "24px",
        md: "35px",
      }}
    >
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        mb="40px"
      >
        <Logo />
        <ThemeToggle />
      </Flex>

      {/* Progress Bar */}
      <Box w="100%" maxW="560px" mx="auto" mb="30px">
        <Box w="100%" h="4px" bg="gray.800" borderRadius="2px">
          <Box w="100%" h="100%" bg="#FFD900" borderRadius="2px" />
        </Box>
      </Box>

      {/* Form Container */}
      <Box
        width="100%"
        maxW="560px"
        mx="auto"
      >
        {/* Heading */}
        <Text
          fontSize={{
            base: "24px",
            md: "28px",
          }}
          fontWeight="bold"
          mb="8px"
        >
          Create your password
        </Text>

        <Text
          color="gray.400"
          fontSize="15px"
          mb="30px"
        >
          Create a secure password for your account.
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Password */}
          <Box mb="20px">
            <Box as="label" display="block" fontSize="14px" fontWeight="500" mb="8px">
              Password <Box as="span" color="red.500">*</Box>
            </Box>
            <Input
              {...register("password")}
              type="password"
              placeholder="Enter password"
              height="48px"
              bg="white"
              color="black"
              borderRadius="4px"
              border="none"
              _placeholder={{ color: "gray.500" }}
            />
            {errors.password && (
              <Text color="red.400" fontSize="13px" mt="5px">
                {errors.password.message}
              </Text>
            )}
          </Box>

          {/* Confirm Password */}
          <Box mb="30px">
            <Box as="label" display="block" fontSize="14px" fontWeight="500" mb="8px">
              Confirm Password <Box as="span" color="red.500">*</Box>
            </Box>
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm password"
              height="48px"
              bg="white"
              color="black"
              borderRadius="4px"
              border="none"
              _placeholder={{ color: "gray.500" }}
            />
            {errors.confirmPassword && (
              <Text color="red.400" fontSize="13px" mt="5px">
                {errors.confirmPassword.message}
              </Text>
            )}
          </Box>

          {/* Password Requirements */}
          <Box
            bg="#11141B"
            border="1px solid"
            borderColor="gray.700"
            borderRadius="8px"
            p="20px"
            mb="35px"
          >
            <Text
              fontSize="14px"
              fontWeight="600"
              mb="12px"
            >
              Password requirements
            </Text>

            <Text fontSize="13px" color="gray.400" mb="6px">
              • At least 8 characters
            </Text>
            <Text fontSize="13px" color="gray.400" mb="6px">
              • At least one uppercase letter
            </Text>
            <Text fontSize="13px" color="gray.400" mb="6px">
              • At least one lowercase letter
            </Text>
            <Text fontSize="13px" color="gray.400">
              • At least one number
            </Text>
          </Box>

          {/* Buttons */}
          <Flex direction="column" gap="12px">
            <Button
              type="submit"
              width="100%"
              height="52px"
              bg="#FFD900"
              color="black"
              borderRadius="4px"
              fontSize="16px"
              fontWeight="600"
              _hover={{ bg: "#E6C300" }}
            >
              Create Account
            </Button>

            <Button
              type="button"
              width="100%"
              height="52px"
              bg="white"
              color="black"
              borderRadius="4px"
              fontSize="16px"
              fontWeight="600"
              _hover={{ bg: "gray.100" }}
              onClick={() => {
                if (onPrev) onPrev();
              }}
            >
              &larr; Previous
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}