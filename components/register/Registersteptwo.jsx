"use client";

import {
  Box,
  Button,
  Flex,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";
import { useFormContext } from "react-hook-form";

export default function RegisterStepTwo({ onNext, onPrev }) {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const handleContinue = async () => {
    const isValid = await trigger([
      "address1",
      "address2",
      "city",
      "state",
      "country",
      "postalCode",
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
          <Box w="66%" h="100%" bg="#FFD900" borderRadius="2px" />
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
          Enter your location information
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} gapX="16px" gapY="20px" mb="30px">
          {/* Address 1 */}
          <Box>
            <Box as="label" display="block" fontSize="14px" fontWeight="500" mb="8px">
              Address 1 <Box as="span" color="red.500">*</Box>
            </Box>
            <Input
              {...register("address1")}
              placeholder="Input your address 1"
              height="48px"
              bg="white"
              color="black"
              borderRadius="4px"
              border="none"
              _placeholder={{ color: "gray.500" }}
            />
            {errors.address1 && (
              <Text color="red.400" fontSize="13px" mt="5px">
                {errors.address1.message}
              </Text>
            )}
          </Box>

          {/* Address 2 */}
          <Box>
            <Box as="label" display="block" fontSize="14px" fontWeight="500" mb="8px">
              Address 2
            </Box>
            <Input
              {...register("address2")}
              placeholder="Input your address 2"
              height="48px"
              bg="white"
              color="black"
              borderRadius="4px"
              border="none"
              _placeholder={{ color: "gray.500" }}
            />
            {errors.address2 && (
              <Text color="red.400" fontSize="13px" mt="5px">
                {errors.address2.message}
              </Text>
            )}
          </Box>

          {/* City */}
          <Box>
            <Box as="label" display="block" fontSize="14px" fontWeight="500" mb="8px">
              City <Box as="span" color="red.500">*</Box>
            </Box>
            <Input
              {...register("city")}
              placeholder="Input your city"
              height="48px"
              bg="white"
              color="black"
              borderRadius="4px"
              border="none"
              _placeholder={{ color: "gray.500" }}
            />
            {errors.city && (
              <Text color="red.400" fontSize="13px" mt="5px">
                {errors.city.message}
              </Text>
            )}
          </Box>

          {/* State */}
          <Box>
            <Box as="label" display="block" fontSize="14px" fontWeight="500" mb="8px">
              State <Box as="span" color="red.500">*</Box>
            </Box>
            <Input
              {...register("state")}
              placeholder="Input your state"
              height="48px"
              bg="white"
              color="black"
              borderRadius="4px"
              border="none"
              _placeholder={{ color: "gray.500" }}
            />
            {errors.state && (
              <Text color="red.400" fontSize="13px" mt="5px">
                {errors.state.message}
              </Text>
            )}
          </Box>

          {/* Country */}
          <Box>
            <Box as="label" display="block" fontSize="14px" fontWeight="500" mb="8px">
              Country <Box as="span" color="red.500">*</Box>
            </Box>
            <Box
              as="select"
              {...register("country")}
              width="100%"
              height="48px"
              bg="white"
              color="black"
              borderRadius="4px"
              border="none"
              paddingLeft="10px"
            >
              <option value="" disabled hidden>Select your country</option>
              <option value="SG">Singapore</option>
              <option value="US">United States</option>
            </Box>
            {errors.country && (
              <Text color="red.400" fontSize="13px" mt="5px">
                {errors.country.message}
              </Text>
            )}
          </Box>

          {/* Postal Code */}
          <Box>
            <Box as="label" display="block" fontSize="14px" fontWeight="500" mb="8px">
              Postal Code <Box as="span" color="red.500">*</Box>
            </Box>
            <Input
              {...register("postalCode")}
              placeholder="Input your postal code"
              height="48px"
              bg="white"
              color="black"
              borderRadius="4px"
              border="none"
              _placeholder={{ color: "gray.500" }}
            />
            {errors.postalCode && (
              <Text color="red.400" fontSize="13px" mt="5px">
                {errors.postalCode.message}
              </Text>
            )}
          </Box>
        </SimpleGrid>

        {/* Buttons */}
        <Flex direction="column" gap="12px">
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
          >
            Continue
          </Button>

          <Button
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
      </Box>
    </Box>
  );
}