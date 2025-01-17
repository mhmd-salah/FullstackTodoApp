import { SubmitHandler, useForm, RegisterOptions } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import { useState } from "react";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import { Link, useNavigate } from "react-router-dom";
import { Notyf } from "notyf";

interface IformInput {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const notyf = new Notyf({
    types: [
      {
        type: "success",
        background: "teal",
        icon: {
          className: "text-white",
          tagName: "i",
        },
      },
    ],
  });
  const navigate = useNavigate();
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
          type={type as string}
          placeholder={placeholder as string}
          {...register(name as keyof IformInput, validation as RegisterOptions<IformInput, keyof IformInput>)}
        />
        <div className="h-3">
          {errors[name as keyof IformInput] && <InputErrorMessage msg={errors[name as keyof IformInput]?.message} />}
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
        notyf.success("you will navigate to the Home");
      }
      setTimeout(() => {
        navigate("/login")
      }, 2000);
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      const errorMsg = errorObj.response?.data?.error?.message;
      if (errorMsg === "Email or Username are already taken") navigate("/login")
        notyf.error(`Error: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 w-[400px] mx-auto">
      <h2 className="text-3xl mb-4">Register Now</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderRegisterForm}
        <Button fullWidth type="submit" className="h-14" isLoading={isLoading}>
          {isLoading ? "Loading" : "Register"}
        </Button>
      </form>
      <p className="mt-3 text-center">
        Do you have an account?{" "}
        <Link className="text-blue-700 underline" to={"/login"}>
          login
        </Link>
      </p>
    </div>
  );
};
export default Register;