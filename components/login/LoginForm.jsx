"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";

import { FiEye, FiEyeOff } from "react-icons/fi";

import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";
import { useTheme } from "next-themes";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const handleLogin = () => {
    // Hardcoded credentials as requested by user
    if (email === "admin@example.com" && password === "Password123") {
      setError("");
      router.push("/dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
    }
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
        mb={{
          base: "80px",
          md: "110px",
          lg: "120px",
        }}
      >
        <Logo />

        <ThemeToggle />
      </Flex>

      {/* Form Container */}
      <Box
        width="100%"
        maxW="560px"
        mx="auto"
      >
        <Text
          fontSize={{
            base: "28px",
            sm: "32px",
            md: "36px",
          }}
          fontWeight="700"
          lineHeight="1.2"
          mb="12px"
          color={isDark ? "white" : "black"}
        >
          Log in to your account
        </Text>

        <Text
          fontSize={{
            base: "15px",
            md: "17px",
          }}
          color="gray.400"
          mb="40px"
        >
          Welcome! Enter your details to log in
        </Text>

        {/* Email */}
        <Box mb="24px">
          <Box as="label" display="block"
            fontSize="14px"
            fontWeight="500"
            mb="8px"
            color={isDark ? "white" : "black"}
          >
            Email <Box as="span" color="red.500">*</Box>
          </Box>

          <Input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Enter your email"
            width="100%"
            height="52px"
            bg={isDark ? "whiteAlpha.100" : "white"}
            color={isDark ? "white" : "black"}
            border={isDark ? "none" : "1px solid"}
            borderColor="gray.200"
            borderRadius="4px"
            fontSize="15px"
            _placeholder={{
              color: "gray.500",
            }}
            _focus={{
              boxShadow: "0 0 0 2px #FFD900",
            }}
          />
        </Box>

        {/* Password */}
        <Box mb="10px">
          <Box as="label" display="block"
            fontSize="14px"
            fontWeight="500"
            mb="8px"
            color={isDark ? "white" : "black"}
          >
            Password <Box as="span" color="red.500">*</Box>
          </Box>

          <HStack
            position="relative"
            width="100%"
          >
            <Input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              width="100%"
              height="52px"
              bg={isDark ? "whiteAlpha.100" : "white"}
              color={isDark ? "white" : "black"}
              border={isDark ? "none" : "1px solid"}
              borderColor="gray.200"
              borderRadius="4px"
              fontSize="15px"
              paddingRight="50px"
              _placeholder={{
                color: "gray.500",
              }}
              _focus={{
                boxShadow:
                  "0 0 0 2px #FFD900",
              }}
            />

            <Box
              position="absolute"
              right="15px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              color="gray.600"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword ? (
                <FiEyeOff size={20} />
              ) : (
                <FiEye size={20} />
              )}
            </Box>
          </HStack>
        </Box>

        {/* Forgot Password */}
        <Flex
          justify="flex-end"
          mb="32px"
        >
          <Link
            href="#"
            fontSize="14px"
            color={isDark ? "gray.300" : "gray.500"}
            _hover={{
              color: isDark ? "white" : "black",
            }}
          >
            Forgot Password?
          </Link>
        </Flex>

        {/* Error Message */}
        {error && (
          <Text color="red.400" fontSize="14px" mb="16px" textAlign="center">
            {error}
          </Text>
        )}

        {/* Sign In */}
        <Button
          width="100%"
          height="52px"
          bg="#FFD900"
          color="black"
          borderRadius="4px"
          fontSize="16px"
          fontWeight="600"
          _hover={{
            bg: "#E6C300",
          }}
          _active={{
            bg: "#D6B500",
          }}
          onClick={handleLogin}
        >
          Sign In
        </Button>

        {/* Sign Up */}
        <Text
          textAlign="center"
          mt="28px"
          fontSize="14px"
          color="gray.400"
        >
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            color={isDark ? "white" : "black"}
            fontWeight="600"
            _hover={{
              textDecoration: "underline",
            }}
          >
            Sign Up
          </Link>
        </Text>
      </Box>
    </Box>
  );
}