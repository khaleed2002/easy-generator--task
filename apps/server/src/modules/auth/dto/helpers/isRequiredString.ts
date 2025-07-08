import { applyDecorators } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";

export function IsRequiredString(property: string, location?: string) {
  return applyDecorators(
    IsNotEmpty({ message: getRequiredPropertyMessage(property, location) }),
    IsString({ message: getTypeErrorMessage(property, "string") })
  );
}

export function getTypeErrorMessage(property: string, type: string) {
  return `property \`${property}\` should be ${type}.`;
}

export function getRequiredPropertyMessage(
  property: string,
  location = "request body"
) {
  return `property \`${property}\` should be provided in ${location}.`;
}
