export type FormFieldConfig<T> = {
  [K in keyof T]: {
    value: T[K];
  };
};
