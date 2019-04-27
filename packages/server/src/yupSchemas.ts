import * as yup from "yup";
import { passwordNotLongEnough } from "@airbnb-clone/common";

export const registerPasswordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(255);
