import Image from 'next/image';

export const Wordmark = () => (
  <svg
    width="100"
    height="28"
    viewBox="0 0 100 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-auto"
  >
    <text
      x="0"
      y="20"
      fontFamily="Arial, sans-serif"
      fontSize="20"
      fontWeight="bold"
      fill="currentColor"
    >
      MACHINA
    </text>
  </svg>
);

export const Logo = () => (
  <Image src="/machina-logo-dark.svg" alt="Machina Logo" width={32} height={32} />
);
