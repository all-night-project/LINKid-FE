import { useState } from "react";
import SignupAccountStep from "../components/signup/SignupAccountStep";
import SignupChildStep from "../components/signup/SignupChildStep";

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

    const registerUser = async () => {
        try {
            const payload = {
                loginId: formData.id,
                password: formData.password,
                name: formData.name,
                childName: formData.birth,
                childBirth: formData.birth,
            }
        }
    }

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