import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { LOGIN_FORM } from "../data";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import { AxiosError } from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/login.css"
import { Notyf } from "notyf";
interface IError {
  error: {
    message?: string;
  };
}

interface IFormInput {
  identifier: string;
  password: string;
}
const LoginPage = () => {
    const notyf = new Notyf({
      types: [
        {
          type: "success",
          background: "#0d9488",
        },
      ],
    });
  // const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({ resolver: yupResolver(loginSchema) });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setIsLoading(true);
      const { status, data: resData } = await axiosInstance.post(
        "/auth/local",
        data
      );
      console.log(resData);
      if (status === 200) {
        notyf.success("email and password is correct");
        localStorage.setItem("loggedInUser", JSON.stringify(resData));
        setIsLoading(false);
        setTimeout(() => {
          location.replace("/");
        }, 2000);
      }
    } catch (error) {
      const errorAxios = error as AxiosError<IError>;
      const errMsg = errorAxios.response?.data?.error.message;
      notyf.error(`${errMsg}`);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(errors);

  // render
  const RenderInputLogin = LOGIN_FORM.map(
    ({ name, type, placeholder, validation }, idx) => (
      <div key={idx}>
        <Input
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />
        <div className="h-3">
          {errors[name as keyof IFormInput] && <InputErrorMessage msg={errors[name as keyof IFormInput]?.message} />}
        </div>
      </div>
    )
  );
  return (
    <div className="login absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 w-[400px] mx-auto ">
      <h2 className="text-3xl mb-4">Login</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {RenderInputLogin}
        <Button fullWidth isLoading={isLoading} >
          {isLoading ? "loading" : "Login"}
        </Button>
      </form>
      <p className="mt-3 text-center">
        No Account?{" "}
        <Link className="text-blue-700 underline" to={"/register"}>
          register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
