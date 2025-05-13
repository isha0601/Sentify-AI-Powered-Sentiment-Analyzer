
import Calculator from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Simple Calculator</h1>
      <Calculator />
    </div>
  );
};

export default Index;
