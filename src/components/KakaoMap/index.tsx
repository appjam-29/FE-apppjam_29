import Script from "next/script";
import React from "react";
import { Map, MapProps } from "react-kakao-maps-sdk";

interface KakaoMapProps extends MapProps {
  children?: React.ReactNode;
  width?: string;
  height?: string;
}

export default function KakaoMap({
  width = "100%",
  height = "100%",
  ...props
}: KakaoMapProps) {
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=9e90625d20e5ccc24c5163dfe02fa5a2&autoload=false`;

  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map {...props} style={{ width: width, height: height }}>
        {props.children}
      </Map>
    </>
  );
}
