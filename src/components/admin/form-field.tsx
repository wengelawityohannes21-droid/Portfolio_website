"use client";

import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
};

type InputFieldProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    as?: "input";
  };

type TextareaFieldProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: "textarea";
  };

type SelectFieldProps = BaseProps &
  InputHTMLAttributes<HTMLSelectElement> & {
    as: "select";
    options: { label: string; value: string }[];
  };

type CheckboxFieldProps = BaseProps & {
  as: "checkbox";
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
};

export type FormFieldProps =
  | InputFieldProps
  | TextareaFieldProps
  | SelectFieldProps
  | CheckboxFieldProps;

export function FormField(props: FormFieldProps) {
  const { label, error, hint, className } = props;

  let control: ReactNode;

  if (props.as === "textarea") {
    const { as: _, label: __, error: ___, hint: ____, className: _____, ...rest } = props;
    control = (
      <textarea
        {...rest}
        className={cn(
          "min-h-[100px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
          error && "border-red-400 focus:border-red-400 focus:ring-red-100",
          className
        )}
      />
    );
  } else if (props.as === "select") {
    const { as: _, label: __, error: ___, hint: ____, options, className: _____, ...rest } = props;
    control = (
      <select
        {...rest}
        className={cn(
          "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
          error && "border-red-400",
          className
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  } else if (props.as === "checkbox") {
    control = (
      <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
        <input
          type="checkbox"
          name={props.name}
          checked={props.checked}
          onChange={(e) => props.onChange?.(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
        />
        {label}
      </label>
    );
    return (
      <div className={cn("space-y-1", className)}>
        {control}
        {hint && <p className="text-xs text-slate-500">{hint}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  } else {
    const { as: _, label: __, error: ___, hint: ____, className: _____, ...rest } = props;
    control = (
      <input
        {...rest}
        className={cn(
          "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
          error && "border-red-400 focus:border-red-400 focus:ring-red-100",
          className
        )}
      />
    );
  }

  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      {control}
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
