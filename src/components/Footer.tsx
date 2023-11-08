import { version } from "../../package.json";

const Footer = () => {
  return (
    <footer className="text-xs text-gray-500 text-center">
      Made with ❤️ by DuffmanCC. Cheating Wordle v{version}
    </footer>
  );
};

export default Footer;
