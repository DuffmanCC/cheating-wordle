import KeyboardKeysStateInterface from "./KeyboardKeysStateInterface";

interface RegexInterface {
  included: string[];
  notIncluded: string[];
  pattern: string;
  keyboardKeysState: KeyboardKeysStateInterface;
}

export default RegexInterface;
