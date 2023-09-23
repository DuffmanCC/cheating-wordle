import { version } from "../../package.json";

const Footer = () => {
  return (
    <footer className="text-xs text-gray-500 text-center">
      Copyright © 2023 Carlos Ortiz. Cheating Wordle v{version}
    </footer>
  );
};

export default Footer;
