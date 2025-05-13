
import { cn } from "@/lib/utils";

interface ButtonProps {
  value: string;
  onClick: () => void;
  variant?: "number" | "operation" | "clear" | "equals";
  className?: string;
  doubleWidth?: boolean;
}

const Button = ({ 
  value, 
  onClick, 
  variant = "number", 
  className = "",
  doubleWidth = false
}: ButtonProps) => {
  const baseClasses = "flex items-center justify-center text-xl font-medium rounded-lg shadow-md hover:shadow-lg active:animate-button-press transition-all duration-150 h-16";
  
  const variantClasses = {
    number: "bg-calculator-number text-calculator-text hover:bg-gray-50",
    operation: "bg-calculator-operation text-white hover:bg-indigo-700",
    clear: "bg-calculator-clear text-white hover:bg-red-500",
    equals: "bg-calculator-primary text-white hover:bg-indigo-500"
  };

  return (
    <button 
      onClick={onClick}
      className={cn(
        baseClasses, 
        variantClasses[variant],
        doubleWidth ? "col-span-2" : "",
        className
      )}
    >
      {value}
    </button>
  );
};

export default Button;
