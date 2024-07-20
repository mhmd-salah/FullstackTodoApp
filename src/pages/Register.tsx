import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/ui/InputErrorMessage";

interface IformInput {
  userName: string;
  email: string;
  password: string;
}

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IformInput>();
  const onSubmit: SubmitHandler<IformInput> = (data) =>{
    console.log(data);
  } ;
  console.log(errors)
  return (
    <div className="max-w-md mx-auto h-full mt-[40%] sm:mt-[15%]">
      <h2 className="text-3xl mb-4">Register Now</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            placeholder="User Name"
            {...register("userName", { required: true, maxLength: 20 })}
          />
          <div className="h-4">
            {" "}
            {errors?.userName && errors.userName.type === "required" && (
              <InputErrorMessage msg="User Name is Required" />
            )}
            {errors?.userName && errors.userName.type === "minLength" && (
              <InputErrorMessage msg="User Name is Required" />
            )}
          </div>
        </div>
        {/* email input  */}
        <div>
          <Input
            placeholder="Email Address"
            {...register("email", { required: "true", minLength: 5 })}
          />
          <div className="h-4">
            {errors?.email && errors.email.type === "required" && (
              <InputErrorMessage msg="Email is Required" />
            )}
            {errors?.email && errors.email.type === "minLength" && (
              <InputErrorMessage msg="Min Length is 5 character" />
            )}
          </div>
        </div>

        <div>
          <Input
            placeholder="Password"
            {...register("password", { required: "true" ,minLength:5})}
          />
          <div className="h-4">
            {errors?.password && errors.password.type === "required" && (
              <InputErrorMessage msg="password is Required" />
            )}
            {errors?.password && errors.password.type === "minLength" && (
              <InputErrorMessage msg="Min Length is 5 character" />
            )}
          </div>
        </div>
        <Button fullWidth type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};
export default Register;
