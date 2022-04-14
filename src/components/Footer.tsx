import {
  FaBriefcase,
  FaGithub,
  FaLinkedinIn,
  FaMedium,
} from 'react-icons/fa';

export const Footer = ({ className }: { className?: string }) => (
  <footer className={className}>
    <ul>
      <li className="">
        <a href="https://github.com/SJTGSHIVAM" target="blank">
          <FaGithub />
        </a>
      </li>
      <li className="">
        <a href="https://sjtgshivam.medium.com" target="blank">
          <FaMedium />
        </a>
      </li>
      <li className="">
        <a
          href="https://www.linkedin.com/in/shivam-pandey-766524161"
          target="blank"
        >
          <FaLinkedinIn />
        </a>
      </li>
      <li className="">
        <a href="https://sjtgshivam.netlify.app/" target="blank">
          <FaBriefcase />
        </a>
      </li>
    </ul>
    <div className="">© 2021 | Shivam Pandey</div>
  </footer>
);
