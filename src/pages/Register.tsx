import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import toast from "react-hot-toast";

interface IformInput{
  userName:string,
  email:string,
  password:string
}

const  Register=()=>{
  const { register,formState:{errors}, handleSubmit } = useForm<IformInput>();
  const onSubmit:SubmitHandler<IformInput>=(data)=>console.log(data)

return (
  <div className="max-w-md mx-auto h-full mt-[40%] sm:mt-[20%]">
    <h2 className="text-3 xl mb-4">Register Now</h2>
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="User Name"
        {...register("userName", { required: true, maxLength: 20 })}
        aria-invalid={errors.userName ? "true" : "false"}
        
      />
      {errors.userName?.type === "required" && (
        <p role="alert" className="text-red-600">First name is required</p>
      )}
      <Input placeholder="Email Address" {...register("email")} />
      <Input placeholder="Password" {...register("password")} />
      <Button fullWidth type="submit">
        Register
      </Button>
    </form>
  </div>
);
}
export default Register;
