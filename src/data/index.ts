import { ILoginInput } from "../interfaces";
// interface Ivalid {
//   validation?: {
//     required?: boolean ;
//     minLength?: number;
//     pattern?:RegExp;
//     [key: string]: unknown;
//   };
// }

type valid = Record<string,boolean|number|string|RegExp>
type InputDetails = "name"|"placeholder"|"type"|"validation"
type Register = Record<InputDetails, string | number | boolean | valid>;

export const REGISTER_FORM: Register[] = [
  {
    name: "username",
    placeholder: "Username",
    type: "text",
    validation: {
      required: true,
      minLength: 5,
    },
  },
  {
    name: "email",
    placeholder: "Email",
    type: "email",
    validation: {
      required: true,
      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    },
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];

export const LOGIN_FORM: ILoginInput[] = [
  {
    name: "identifier",
    placeholder: "Email",
    type: "email",
    validation: {
      required: true,
      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    },
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];

// 26-7-2024