import { genSaltSync, hashSync, compareSync } from "bcryptjs"

export const hashPassword = (
   plainText: string
): string => hashSync(
   plainText,
   genSaltSync(12)
)

export const comparePasswords = (
   plainText: string,
   cypherText: string
): boolean => compareSync(plainText, cypherText)