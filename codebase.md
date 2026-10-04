# Codebase Overview

## app/page.tsx

```tsx
import { Box, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box minH="100vh" bg="#090B10" color="white" p="50px">
      <Text fontSize="32px" fontWeight="bold" mb="16px">
        Welcome to the Home Page
      </Text>
      <Text fontSize="18px" color="gray.400">
        You have successfully logged in!
      </Text>
    </Box>
  );
}
```

## app/auth/login/page.jsx

```jsx
import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  const loginSlides = [
    {
      image: "/images/login/login-banner.png",
      title: "Comprehensive Data",
      description: "Analyze your business data with our platform",
    },
    {
      image: "/images/login/login-banner-2.png",
      title: "Collaborative Insights",
      description: "Work together to uncover actionable business intelligence",
    },
    {
      image: "/images/login/login-banner-3.png",
      title: "Advanced Analytics",
      description: "Harness the power of high-speed data processing",
    },
  ];

  return (
    <AuthLayout slides={loginSlides}>
      <LoginForm />
    </AuthLayout>
  );
}
```

## app/auth/signup/page.jsx

```jsx
"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/Validation/registerShema";

import RegisterStart from "@/components/register/RegisterStart";
import Registerstepone from "@/components/register/Registerstepone";
import Registersteptwo from "@/components/register/Registersteptwo";
import Registerpassword from "@/components/register/Registerpassword";
import AuthLayout from "@/components/layout/AuthLayout";

function SignupFlow() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "START";

  const methods = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      designation: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const handleNext = (nextStep) => {
    router.push(`${pathname}?step=${nextStep}`);
  };

  const handlePrev = (prevStep) => {
    router.push(`${pathname}?step=${prevStep}`);
  };

  return (
    <FormProvider {...methods}>
      {step === "START" && (
        <RegisterStart onNext={() => handleNext("IDENTITY")} />
      )}

      {step === "IDENTITY" && (
        <AuthLayout
          image="/images/register/handshake.png"
          title="Submit Incorporation"
          description="Join with us through our platform"
        >
          <Registerstepone onNext={() => handleNext("ADDRESS")} />
        </AuthLayout>
      )}

      {step === "ADDRESS" && (
        <AuthLayout
          image="/images/register/writing.png"
          title="Book an appointment"
          description="Talk more and discuss your business with our expert"
        >
          <Registersteptwo 
            onNext={() => handleNext("PASSWORD")} 
            onPrev={() => handlePrev("IDENTITY")}
          />
        </AuthLayout>
      )}

      {step === "PASSWORD" && (
        <AuthLayout
          image="/images/register/password.png"
          title="Secure Your Account"
          description="Set up your secure password and complete your registration"
        >
          <Registerpassword 
            onNext={() => handleNext("DONE")} 
            onPrev={() => handlePrev("ADDRESS")}
          />
        </AuthLayout>
      )}

      {step === "DONE" && (
        <div>Registration Complete</div>
      )}
    </FormProvider>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupFlow />
    </Suspense>
  );
}

```

## components/layout/AuthLayout.jsx

```jsx
"use client";

import { useState } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function AuthLayout({
  children,
  image,
  title,
  description,
  slides,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isCarousel = Array.isArray(slides) && slides.length > 0;
  
  const currentImage = isCarousel ? slides[currentIndex].image : image;
  const currentTitle = isCarousel ? slides[currentIndex].title : title;
  const currentDescription = isCarousel ? slides[currentIndex].description : description;
  const totalDots = isCarousel ? slides.length : 4;

  const handlePrev = () => {
    if (!isCarousel) return;
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!isCarousel) return;
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <Flex
      minH="100vh"
      bg="#090B10"
      color="white"
    >
      {/* Left Section */}
      <Box
        width={{ base: "100%", lg: "50%" }}
        position="relative"
      >
        {children}
      </Box>

      {/* Right Section */}
      <Box
        display={{ base: "none", lg: "block" }}
        width="50%"
        position="relative"
        backgroundImage={`url('${currentImage}')`}
        backgroundSize="cover"
        backgroundPosition="center"
        transition="background-image 0.5s ease-in-out"
      >
        {/* Dark Overlay */}
        <Box
          position="absolute"
          inset="0"
          bg="blackAlpha.600"
        />

        {/* Right Side Content */}
        <Flex
          position="relative"
          zIndex="1"
          minH="100vh"
          justify="flex-end"
          align="center"
          direction="column"
          textAlign="center"
          pb="60px"
          px="10"
        >
          <Box>
            <Box
              fontSize={{ base: "28px", lg: "36px" }}
              fontWeight="bold"
              mb="3"
            >
              {currentTitle}
            </Box>

            <Box
              fontSize={{ base: "16px", lg: "20px" }}
              color="gray.200"
              maxW="600px"
              mb="40px"
            >
              {currentDescription}
            </Box>

            <Flex justify="center" align="center" gap="4">
              {isCarousel && (
                <IconButton
                  aria-label="Previous slide"
                  icon={<FiChevronLeft />}
                  size="sm"
                  variant="ghost"
                  color="white"
                  _hover={{ bg: "whiteAlpha.200" }}
                  onClick={handlePrev}
                />
              )}
              
              <Flex gap="2">
                {Array.from({ length: totalDots }).map((_, index) => (
                  <Box
                    key={index}
                    w="6px"
                    h="6px"
                    borderRadius="full"
                    bg={
                      isCarousel
                        ? index === currentIndex
                          ? "white"
                          : "whiteAlpha.500"
                        : index === 0
                        ? "white"
                        : "whiteAlpha.500"
                    }
                    cursor={isCarousel ? "pointer" : "default"}
                    onClick={() => isCarousel && setCurrentIndex(index)}
                    transition="background-color 0.3s"
                  />
                ))}
              </Flex>

              {isCarousel && (
                <IconButton
                  aria-label="Next slide"
                  icon={<FiChevronRight />}
                  size="sm"
                  variant="ghost"
                  color="white"
                  _hover={{ bg: "whiteAlpha.200" }}
                  onClick={handleNext}
                />
              )}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
```

## components/login/LoginForm.jsx

```jsx
"use client";

import { useState } from "react";
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

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Hardcoded credentials as requested by user
    if (email === "admin@example.com" && password === "Password123") {
      setError("");
      router.push("/");
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
        {/* Heading */}
        <Text
          fontSize={{
            base: "28px",
            sm: "32px",
            md: "36px",
          }}
          fontWeight="700"
          lineHeight="1.2"
          mb="12px"
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
            bg="white"
            color="black"
            border="none"
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
              bg="white"
              color="black"
              border="none"
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
            color="gray.300"
            _hover={{
              color: "white",
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
            color="white"
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
```

## components/register/RegisterStart.jsx

```jsx
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
```

## components/register/Registerstepone.jsx

```jsx
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
```

## components/register/Registersteptwo.jsx

```jsx
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
```

## components/register/Registerpassword.jsx

```jsx
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
```

## Validation/registerShema.js

```js
import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must contain at least 2 characters"),

  lastName: z
    .string()
    .min(2, "Last name must contain at least 2 characters"),

  companyName: z
    .string()
    .optional(),

  designation: z
    .string()
    .min(2, "Designation is required"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .min(10, "Phone number must contain at least 10 digits"),

  address1: z
    .string()
    .min(5, "Address is required"),

  address2: z
    .string()
    .optional(),

  city: z
    .string()
    .min(2, "City is required"),

  state: z
    .string()
    .min(2, "State is required"),

  country: z
    .string()
    .min(2, "Country is required"),

  postalCode: z
    .string()
    .min(4, "Postal code is required"),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .regex(
      /[A-Z]/,
      "Password must contain at least one uppercase letter"
    )
    .regex(
      /[a-z]/,
      "Password must contain at least one lowercase letter"
    )
    .regex(
      /[0-9]/,
      "Password must contain at least one number"
    ),

  confirmPassword: z
    .string()
    .min(1, "Please confirm your password"),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);
```

