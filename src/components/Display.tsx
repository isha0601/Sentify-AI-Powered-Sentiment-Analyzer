
interface DisplayProps {
  value: string;
  expression: string;
}

const Display = ({ value, expression }: DisplayProps) => {
  return (
    <div className="bg-calculator-display w-full h-24 rounded-lg shadow-inner mb-4 p-4 flex flex-col justify-end items-end overflow-hidden">
      {expression && (
        <div className="text-gray-500 text-sm h-6 overflow-hidden w-full text-right">
          {expression}
        </div>
      )}
      <div className="text-3xl font-semibold text-calculator-text overflow-x-auto w-full text-right">
        {value}
      </div>
    </div>
  );
};

export default Display;
