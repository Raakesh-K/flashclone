"use client";

import {
  Box,
  Button,
  Flex,
  Input,
  SimpleGrid,
  Text,
  Link,
} from "@chakra-ui/react";
import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";
import { useFormContext } from "react-hook-form";

export default function RegisterStepOne({ onNext }) {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const handleContinue = async () => {
    const isValid = await trigger([
      "firstName",
      "lastName",
      "companyName",
      "designation",
      "email",
      "phone",
    ]);

    if (isValid && onNext) {
      onNext();
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
        mb="40px"
      >
        <Logo />
        <ThemeToggle />
      </Flex>

      {/* Progress Bar */}
      <Box w="100%" maxW="560px" mx="auto" mb="30px">
        <Box w="100%" h="4px" bg="gray.800" borderRadius="2px">
          <Box w="25%" h="100%" bg="#FFD900" borderRadius="2px" />
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
          Let's create your account
        </Text>

        <Text
          color="gray.400"
          fontSize="15px"
          mb="30px"
        >
          Enter your identity information
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} gapX="16px" gapY="20px" mb="30px">
          {/* First Name */}
          <Box>
            <Box as="label" display="block" fontSize="14px" fontWeight="500" mb="8px">
              First Name <Box as="span" color="red.500">*</Box>
            </Box>
            <Input
              {...register("firstName")}
              placeholder="Input your first name"
              height="48px"
              bg="white"
              color="black"
              borderRadius="4px"
              border="none"
              _placeholder={{ color: "gray.500" }}
            />
            {errors.firstName && (
              <Text color="red.400" fontSize="13px" mt="5px">
                {errors.firstName.message}
              </Text>
            )}
          </Box>

          {/* Last Name */}
          <Box>
            <Box as="label" display="block" fontSize="14px" fontWeight="500" mb="8px">
              Last Name <Box as="span" color="red.500">*</Box>
            </Box>
            <Input
              {...register("lastName")}
              placeholder="Input your last name"
              height="48px"
              bg="white"
              color="black"
              borderRadius="4px"
              border="none"
              _placeholder={{ color: "gray.500" }}
            />
            {errors.lastName && (
              <Text color="red.400" fontSize="13px" mt="5px">
                {errors.lastName.message}
              </Text>
            )}
          </Box>

          {/* Company Name */}
          <Box>
            <Box as="label" display="block" fontSize="14px" fontWeight="500" mb="8px">
              Company Name
            </Box>
            <Input
              {...register("companyName")}
              placeholder="Input your company name"
              height="48px"
              bg="white"
              color="black"
              borderRadius="4px"
              border="none"
              _placeholder={{ color: "gray.500" }}
            />
            {errors.companyName && (
              <Text color="red.400" fontSize="13px" mt="5px">
                {errors.companyName.message}
              </Text>
            )}
          </Box>

          {/* Designation */}
          <Box>
            <Box as="label" display="block" fontSize="14px" fontWeight="500" mb="8px">
              Designation <Box as="span" color="red.500">*</Box>
            </Box>
            <Input
              {...register("designation")}
              placeholder="Input your designation"
              height="48px"
              bg="white"
              color="black"
              borderRadius="4px"
              border="none"
              _placeholder={{ color: "gray.500" }}
            />
            {errors.designation && (
              <Text color="red.400" fontSize="13px" mt="5px">
                {errors.designation.message}
              </Text>
            )}
          </Box>

          {/* Email */}
          <Box>
            <Box as="label" display="block" fontSize="14px" fontWeight="500" mb="8px">
              Email <Box as="span" color="red.500">*</Box>
            </Box>
            <Input
              {...register("email")}
              type="email"
              placeholder="Input your email"
              height="48px"
              bg="white"
              color="black"
              borderRadius="4px"
              border="none"
              _placeholder={{ color: "gray.500" }}
            />
            {errors.email && (
              <Text color="red.400" fontSize="13px" mt="5px">
                {errors.email.message}
              </Text>
            )}
          </Box>

          {/* Phone Number */}
          <Box>
            <Box as="label" display="block" fontSize="14px" fontWeight="500" mb="8px">
              Phone Number <Box as="span" color="red.500">*</Box>
            </Box>
            <Flex gap="8px">
              <Box 
                as="select"
                width="80px" 
                height="48px" 
                bg="white" 
                color="black" 
                border="none" 
                borderRadius="4px"
                paddingLeft="10px"
              >
                <option value="SG">🇸🇬</option>
                <option value="US">🇺🇸</option>
              </Box>
              <Input
                {...register("phone")}
                flex="1"
                type="tel"
                placeholder="+65"
                height="48px"
                bg="white"
                color="black"
                borderRadius="4px"
                border="none"
                _placeholder={{ color: "gray.500" }}
              />
            </Flex>
            {errors.phone && (
              <Text color="red.400" fontSize="13px" mt="5px">
                {errors.phone.message}
              </Text>
            )}
          </Box>
        </SimpleGrid>

        {/* Continue Button */}
        <Button
          width="100%"
          height="52px"
          bg="#FFD900"
          color="black"
          borderRadius="4px"
          fontSize="16px"
          fontWeight="600"
          _hover={{ bg: "#E6C300" }}
          onClick={handleContinue}
          mb="20px"
        >
          Continue
        </Button>

        {/* Sign In Link */}
        <Text textAlign="center" fontSize="14px" color="gray.400">
          Have an account?{" "}
          <Link href="/auth/login" color="white" fontWeight="600" _hover={{ textDecoration: "underline" }}>
            Sign In
          </Link>
        </Text>
      </Box>
    </Box>
  );
}