import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const FormInput = ({ className, ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={cn(
        "w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none transition-colors text-foreground",
        className,
      )}
    />
  );
};

export default FormInput;
