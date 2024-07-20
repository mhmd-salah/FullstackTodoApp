import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";

interface IformInput {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
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
        <div className="h-4">
          {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
        </div>
      </div>
    )
  );

  // Handler
  const onSubmit: SubmitHandler<IformInput> = (data) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <div className="max-w-md mx-auto h-full mt-[40%] sm:mt-[15%]">
      <h2 className="text-3xl mb-4">Register Now</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderRegisterForm}
        <Button fullWidth type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};
export default Register;
