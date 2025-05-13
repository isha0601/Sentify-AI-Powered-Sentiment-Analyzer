
import { useState } from "react";
import Button from "./Button";
import Display from "./Display";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const clearAll = () => {
    setDisplay("0");
    setExpression("");
    setWaitingForOperand(false);
    setStoredValue(null);
    setOperator(null);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (storedValue === null) {
      setStoredValue(inputValue);
    } else if (operator) {
      const result = calculate(storedValue, inputValue, operator);
      setDisplay(String(result));
      setStoredValue(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
    setExpression(nextOperator === "=" ? "" : `${storedValue === null ? inputValue : storedValue} ${nextOperator}`);
  };

  const calculate = (leftOperand: number, rightOperand: number, operation: string): number => {
    switch (operation) {
      case "+":
        return leftOperand + rightOperand;
      case "-":
        return leftOperand - rightOperand;
      case "×":
        return leftOperand * rightOperand;
      case "÷":
        return leftOperand / rightOperand;
      default:
        return rightOperand;
    }
  };

  const handleEquals = () => {
    if (storedValue === null || operator === null) {
      return;
    }

    const inputValue = parseFloat(display);
    const result = calculate(storedValue, inputValue, operator);
    
    setExpression(`${storedValue} ${operator} ${inputValue} =`);
    setDisplay(String(result));
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  return (
    <div className="bg-calculator-background p-6 rounded-2xl shadow-lg w-full max-w-xs">
      <Display value={display} expression={expression} />
      
      <div className="grid grid-cols-4 gap-3">
        <Button value="C" onClick={clearAll} variant="clear" />
        <Button value="+/-" onClick={() => setDisplay(String(-parseFloat(display)))} variant="operation" />
        <Button value="%" onClick={() => setDisplay(String(parseFloat(display) / 100))} variant="operation" />
        <Button value="÷" onClick={() => performOperation("÷")} variant="operation" />
        
        <Button value="7" onClick={() => inputDigit("7")} />
        <Button value="8" onClick={() => inputDigit("8")} />
        <Button value="9" onClick={() => inputDigit("9")} />
        <Button value="×" onClick={() => performOperation("×")} variant="operation" />
        
        <Button value="4" onClick={() => inputDigit("4")} />
        <Button value="5" onClick={() => inputDigit("5")} />
        <Button value="6" onClick={() => inputDigit("6")} />
        <Button value="-" onClick={() => performOperation("-")} variant="operation" />
        
        <Button value="1" onClick={() => inputDigit("1")} />
        <Button value="2" onClick={() => inputDigit("2")} />
        <Button value="3" onClick={() => inputDigit("3")} />
        <Button value="+" onClick={() => performOperation("+")} variant="operation" />
        
        <Button value="0" onClick={() => inputDigit("0")} doubleWidth />
        <Button value="." onClick={inputDecimal} />
        <Button value="=" onClick={handleEquals} variant="equals" />
      </div>
    </div>
  );
};

export default Calculator;
