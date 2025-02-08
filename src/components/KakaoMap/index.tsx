import Script from 'next/script';
import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

let isAlreadyLoaded = false;

export default function KakaoMap() {
  const [loaded, setLoaded] = useState(isAlreadyLoaded);

  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=9e90625d20e5ccc24c5163dfe02fa5a2&autoload=false`;

  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy='beforeInteractive' />
      <Map
        center={{ lat: 37.5665, lng: 126.978 }}
        style={{ width: '100%', height: '100%' }}></Map>
    </>
  );
}
