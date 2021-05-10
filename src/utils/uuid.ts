import { v4, validate } from "uuid"

export const createUUID = (): string => v4()

export const validateUUID = (
   value: string
): boolean => validate(value)