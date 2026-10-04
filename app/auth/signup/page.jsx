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
