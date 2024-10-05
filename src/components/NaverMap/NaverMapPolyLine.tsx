import {nAssert} from '@/services/nAseert';
import {default as NativeNaverMapPolyline} from '../../services/RNCNaverMapPolylineNativeComponent';
import {
  BaseOverlayProps,
  CapType,
  Coord,
  JoinType,
  NaverMapPolygonOverlay,
  NaverMapView,
  Region,
} from '@mj-studio/react-native-naver-map';
import React from 'react';
import {ColorValue, processColor, SafeAreaView, StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export interface NaverMapPolylineOverlayProps extends BaseOverlayProps {
  coords: Coord[];
  /**
   * 두께를 지정할 수 있습니다.
   *
   * dp, pt단위입니다.
   *
   * @default 1
   */
  width?: number;
  /**
   * color속성을 사용해 선의 색상을 지정할 수 있습니다.
   *
   * @default black
   */
  color?: ColorValue;
  pattern?: number[];
  /**
   * capType 속성을 사용해 끝 지점의 모양을 지정할 수 있습니다.
   *
   * 다음 그림은 위에서부터 차례대로 Round, Butt, Square 모양을 나타냅니다.
   *
   * @description
   *
   * <img src="https://navermaps.github.io/ios-map-sdk/assets/5-4-captype.png" width="300" alt="preview">
   *
   * @see {@link CapType}
   * @default Round
   */
  capType?: CapType;
  /**
   * joinType 속성을 사용해 연결점의 모양을 지정할 수 있습니다.
   *
   * 다음 그림은 위에서부터 차례대로 Round, Butt, Square 모양을 나타냅니다.
   *
   * @description
   *
   * <img src="https://navermaps.github.io/ios-map-sdk/assets/5-4-join-bevel.png" width="300" alt="preview">
   * <img src="https://navermaps.github.io/ios-map-sdk/assets/5-4-join-miter.png" width="300" alt="preview">
   * <img src="https://navermaps.github.io/ios-map-sdk/assets/5-4-join-round.png" width="300" alt="preview">
   *
   * @see {@link JoinType}
   * @default Round
   */
  joinType?: JoinType;
}

const NaverMapPolyLine = ({
  zIndex = 0,
  globalZIndex = -123123123,
  isHidden = false,
  minZoom = 0,
  maxZoom = 21,
  isMinZoomInclusive = true,
  isMaxZoomInclusive = true,
  coords = [],
  width = 1,
  capType = 'Round',
  joinType = 'Round',
  color = 'black',
  onTap,
}: NaverMapPolylineOverlayProps) => {
  if (coords) {
    nAssert(
      coords.length >= 2,
      `[NaverMapPolylineOverlay] coords length should be equal or greater than 2, is ${coords.length}.`,
    );
  }
  return (
    <NativeNaverMapPolyline
      zIndexValue={zIndex}
      globalZIndexValue={globalZIndex}
      isHidden={isHidden}
      minZoom={minZoom}
      maxZoom={maxZoom}
      coords={coords}
      width={width}
      isMinZoomInclusive={isMinZoomInclusive}
      isMaxZoomInclusive={isMaxZoomInclusive}
      color={processColor(color) as number}
      capType={capType}
      joinType={joinType}
      onTapOverlay={onTap}
    />
  );

  return (
    <NaverMapView
      style={styles.fullMap}
      initialCamera={{
        latitude: 35.1796,
        longitude: 129.0756,
        zoom: 10,
      }}>
      {/* {polygon.map((p, polygonIndex) => (
        <NaverMapPolygonOverlay
          key={polygonIndex}
          outlineWidth={1}
          outlineColor={'#104DD0'}
          color={'rgba(16, 77, 208, 0.15)'}
          coords={p}
          zIndex={9}
        />
      ))} */}
    </NaverMapView>
  );
};

export default NaverMapPolyLine;

const styles = StyleSheet.create({
  minMap: {height: heightPercentageToDP(40)},
  fullMap: {height: heightPercentageToDP(100)},
});
