import LogoSvg from '@/assets/logo.svg';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo(props: LogoProps) {
  const { className, size = 100 } = props;

  return <LogoSvg className={className} width={size} height={size} />;
}
