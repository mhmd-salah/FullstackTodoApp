import { TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({ ...rest }: IProps) => {
  return (
    <textarea
      className="border-[1px] border-gray-300 shadow-md  focus:outline-none focus:ring-1 focus:ring-teal-600 rounded-lg px-3 py-3 text-md w-full bg-transparent my-3 resize-none"
      rows={6}
      {...rest}
    />
  );
};

export default Textarea;
