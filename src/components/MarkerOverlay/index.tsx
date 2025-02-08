// MarkerOverlay.tsx
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import * as styles from "./styles.css";

interface Place {
  name: string;
  lat: number;
  lng: number;
}

interface MarkerOverlayProps {
  position: {
    lat: number;
    lng: number;
  };
}

export default function MarkerOverlay(props: MarkerOverlayProps) {
  const { position } = props;

  return (
    <CustomOverlayMap position={position} zIndex={3}>
      <div className={styles.container}>
        <div className={styles.outerCircle} />
        <div className={styles.innerCircle} />
      </div>
    </CustomOverlayMap>
  );
}
