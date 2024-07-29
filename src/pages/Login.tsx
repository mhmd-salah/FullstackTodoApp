import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { LOGIN_FORM } from "../data";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/login.css"
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
        toast.success("email and password is correct");
        localStorage.setItem("loggedInUser", JSON.stringify(resData));
        setIsLoading(false);
        setTimeout(() => {
          location.replace("/");
        }, 2000);
      }
    } catch (error) {
      const errorAxios = error as AxiosError<IError>;
      const errMsg = errorAxios.response?.data?.error.message;
      toast.remove(errMsg);
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
          {errors[name] && <InputErrorMessage msg={errors[name].message} />}
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
