"use client";

import { IconButton } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <IconButton
        aria-label="Toggle theme"
        variant="outline"
        borderColor="gray.600"
        color="white"
        bg="transparent"
        size="md"
      >
        <FiMoon />
      </IconButton>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <IconButton
      aria-label="Toggle theme"
      variant="outline"
      borderColor={isDark ? "gray.600" : "gray.300"}
      color={isDark ? "white" : "black"}
      bg="transparent"
      size="md"
      _hover={{
        bg: isDark ? "gray.800" : "gray.100",
      }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </IconButton>
  );
}