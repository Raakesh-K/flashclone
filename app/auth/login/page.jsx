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