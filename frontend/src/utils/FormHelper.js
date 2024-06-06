import * as yup from "yup";

export const userSignUpauthSchema = yup.object().shape({
  userName: yup
    .string()
    .required()
    .strict(true)
    .trim("white space before/after name are not allowed"),
  emailId: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@[-`{-~]).{8,15}$",
      "Must contain 8 chracters,one uppercase,lowercase,number and a special case charcter"
    ),
  passwordConfirm: yup
    .string()
    .required()
    .matches(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@[-`{-~]).{8,15}$",
      "Must contain 8 chracters,one uppercase,lowercase,number and a special case charcter"
    )
}).required();