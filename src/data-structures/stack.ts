
/**
 * Stack data structure implementation
 */
class Stack {
    private items: any[] = [];

    /**
     * Checks if the parentheses in a given string are balanced.
     * @param input - The input string.
     * @returns True if the parentheses are balanced, false otherwise.
        */
    public static balanceParentheses(input: string): boolean {
        const stack = new Stack();
        const openingBrackets = ['(', '[', '{'];
        const closingBrackets = [')', ']', '}'];

        for (let i = 0; i < input.length; i++) {
            if (openingBrackets.includes(input[i])) {
                stack.push(input[i]);
            } else if (closingBrackets.includes(input[i])) {
                const lastItem = stack.pop();
                if (openingBrackets.indexOf(lastItem) !== closingBrackets.indexOf(input[i])) {
                    return false;
                }
            }
        }

        return stack.isEmpty();
    }

    /**
     * Reverses a string using a stack.
     * @param input - The input string.
     * @returns The reversed string.
     */
    public static reverseString(input: string): string {
        const stack = new Stack();
        let reversedString = '';

        for (let i = 0; i < input.length; i++) {
            stack.push(input[i]);
        }

        while (!stack.isEmpty()) {
            reversedString += stack.pop();
        }

        return reversedString;
    }

    /**
     * Evaluates a postfix expression.
     * @param expression - The postfix expression.
     * @returns The result of the expression.
     */
    public static evaluatePostfixExpression(expression: string): number {
        const stack = new Stack();
        const operators = ['+', '-', '*', '/'];

        for (let i = 0; i < expression.length; i++) {
            if (operators.includes(expression[i])) {
                const operand2 = stack.pop();
                const operand1 = stack.pop();
                stack.push(Stack.evaluate(expression[i], operand1, operand2));
            } else {
                stack.push(parseInt(expression[i]));
            }
        }

        return stack.pop();
    }

    constructor() { }

    public push(item: any): void {
        this.items.push(item);
    }

    public pop(): any {
        return this.items.pop();
    }

    public peek(): any {
        return this.items[this.items.length - 1];
    }

    public isEmpty(): boolean {
        return this.items.length === 0;
    }

    private static evaluate(operator: string, operand1: number, operand2: number): number {
        switch (operator) {
            case '+':
                return operand1 + operand2;
            case '-':
                return operand1 - operand2;
            case '*':
                return operand1 * operand2;
            case '/':
                return operand1 / operand2;
            default:
                return 0;
        }
    }
}

export default Stack;