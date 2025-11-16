import { useState } from "react";
import SignupAccountStep from "./SignupAccountStep";
import SignupChildStep from "./SignupChildStep";

const SignupPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        id: "",
        password: "",
        confirmPassword: "",
        name: "",
        childName: "",
        birth: "",
        gender: "",
    });

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <>
            {step === 1 && (
                <SignupAccountStep formData={formData} setFormData={setFormData} nextStep={nextStep} />
            )}
            {step === 2 && (
                <SignupChildStep formData={formData} setFormData={setFormData} prevStep={prevStep} />
            )}
        </>
    );
};

export default SignupPage;