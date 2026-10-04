"use client";

import { useState, useEffect } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useTheme } from "next-themes";

export default function AuthLayout({
  children,
  image,
  title,
  description,
  slides,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

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
      bg={isDark ? "#090B10" : "white"}
      color={isDark ? "white" : "black"}
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