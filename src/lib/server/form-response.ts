// 🔧 Helpers

export type FormState<
  TFields extends Record<string, string> = Record<string, string>,
  TErrors extends Record<string, string[]> = Record<string, string[]>,
> = {
  success: boolean;
  fields?: TFields;
  errors?: TErrors;
};

export function tooManyRequests<
  TFields extends Record<string, string> = Record<string, string>,
>(fields?: TFields): FormState<TFields> {
  return {
    success: false,
    fields,
    errors: { message: ["Too many requests"] },
  };
}

export function errorResponse<
  TFields extends Record<string, string> = Record<string, string>,
>(message: string, fields?: TFields): FormState<TFields> {
  return {
    success: false,
    fields,
    errors: { message: [message] },
  };
}

export function successResponse<
  TFields extends Record<string, string> = Record<string, string>,
>(fields?: TFields): FormState<TFields> {
  return {
    success: true,
    fields,
  };
}

export function fieldErrors<
  TFields extends Record<string, string>,
  TErrors extends Record<string, string[]>,
>(errors: TErrors, fields?: TFields): FormState<TFields, TErrors> {
  return {
    success: false,
    fields,
    errors,
  };
}
