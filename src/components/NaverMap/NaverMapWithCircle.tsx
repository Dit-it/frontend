import {
  NaverMapCircleOverlay,
  NaverMapView,
} from '@mj-studio/react-native-naver-map';
import React from 'react';

interface NaverMapCircleOverlayProps {
  /** 위도 값 */
  latitude: number;
  /** 경도 값 */
  longitude: number;
  /** 지도에 원의 반지름을 미터 단위로 표시합니다. */
  radius: number;
  /**
   * 원의 색상입니다.
   * @default black
   */
  color?: string; // Hex color string
  /**
   * 외곽선의 색상입니다.
   * @default black
   */
  outlineColor?: string; // Hex color string
  /**
   * 외곽선의 굵기입니다. dp(android), pt(ios)
   * @default 0
   */
  outlineWidth?: number;
  /** 전역 z-index 값 */
  globalZIndex?: number;
  /** 원을 클릭할 때 호출되는 함수 */
  onTap?: () => void;
}

const NaverMapWithCircle = ({
  latitude,
  longitude,
  radius = 0,
  color = 'black',
  outlineWidth = 0,
  outlineColor = 'black',
  onTap,
}: NaverMapCircleOverlayProps) => {
  return (
    <NaverMapView
      initialCamera={{
        latitude: 35.1796,
        longitude: 129.0756,
        zoom: 9,
      }}>
      <NaverMapCircleOverlay
        latitude={33.17827398}
        longitude={126.349895729}
        radius={10000}
        color={'#f2f'}
        isHidden
        outlineColor={'#aaa'}
        outlineWidth={2}
        globalZIndex={-1}
        onTap={() => console.log('hi')}
      />
    </NaverMapView>
  );
};
export default NaverMapWithCircle;
