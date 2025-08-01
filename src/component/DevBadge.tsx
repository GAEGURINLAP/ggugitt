import { DevBadgeContainer } from "../style/dev-badge";

interface DevBadgeProps {
  style?: React.CSSProperties;
}

export default function DevBadge({ style }: DevBadgeProps) {
  const isDevelopment = import.meta.env.MODE === "development";

  if (!isDevelopment) {
    return null;
  }

  return <DevBadgeContainer style={style}>DEV</DevBadgeContainer>;
}
