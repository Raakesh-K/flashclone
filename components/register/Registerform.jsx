"use client";

import { useState } from "react";
import {
  FormProvider,
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import RegisterStepOne from "./RegisterStepOne";
import RegisterStepTwo from "./RegisterStepTwo";
import RegisterPassword from "./RegisterPassword";

import { registerSchema } from "@/validations/registerSchema";

export default function RegisterForm() {
  const [step, setStep] = useState(1);

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

  const nextStep = () => {
    setStep((previousStep) => previousStep + 1);
  };

  const previousStep = () => {
    setStep((previousStep) => previousStep - 1);
  };

  return (
    <FormProvider {...methods}>
      {step === 1 && (
        <RegisterStepOne
          nextStep={nextStep}
        />
      )}

      {step === 2 && (
        <RegisterStepTwo
          nextStep={nextStep}
          previousStep={previousStep}
        />
      )}

      {step === 3 && (
        <RegisterPassword
          previousStep={previousStep}
        />
      )}
    </FormProvider>
  );
}