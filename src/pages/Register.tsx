import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import { useNavigate } from "react-router-dom";

interface IformInput {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IformInput>({ resolver: yupResolver(registerSchema) });
  // Render
  const renderRegisterForm = REGISTER_FORM.map(
    ({ name, placeholder, type, validation }, idx) => (
      <div key={idx}>
        <Input
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />
        <div className="h-3">
          {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
        </div>
      </div>
    )
  );

  // Handler
  const onSubmit: SubmitHandler<IformInput> = async (data) => {
    setIsLoading(true);
    try {
      const { status } = await axiosInstance.post("/auth/local/register", data);
      if (status === 200) {
        toast.success("you will navigate to the Home", {
          position: "bottom-right",
          duration: 4000,
          style: {
            background: "teal ",
            color: "white",
          },
        });
      }
      setTimeout(() => {
        navigate("/login")
      }, 2000);
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      const errorMsg = errorObj.response?.data?.error?.message;
      toast.error(`Error: ${errorMsg}`, {
        duration: 2000,
        style: {
          width: "fit-content",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };
  console.log(errors);
  return (
    <div className="max-w-md mx-auto h-full mt-[40%] sm:mt-[15%]">
      <h2 className="text-3xl mb-4">Register Now</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderRegisterForm}
        <Button fullWidth type="submit" className="h-14" isLoading={isLoading}>
          {isLoading ? "Loading" : "Register"}
        </Button>
      </form>
    </div>
  );
};
export default Register;
