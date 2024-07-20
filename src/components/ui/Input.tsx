import { forwardRef, InputHTMLAttributes, Ref } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(({ ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      className="border-[1px] border-gray-300 shadow-lg focus:border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg px-3 py-3 text-md w-full bg-transparent"
      {...rest}
    />
  );
});

export default Input;
