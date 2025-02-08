import LogoSvg from '@/assets/logo_label.svg';

interface LogoLabelProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function LogoLabel(props: LogoLabelProps) {
  const { className, width = 80, height } = props;

  return <LogoSvg className={className} width={width} height={height} />;
}
