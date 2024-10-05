import React, {useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import SeaItem, {SeaItemProps} from './SeaItem';

const width = Dimensions.get('window').width;
const defaultDataWith6Colors = [
  '#B0604D',
  '#899F9C',
  '#B3C680',
  '#5C6265',
  '#F5D399',
  '#F1F1F1',
];

interface CarouselContainerProps {
  data: SeaItemProps[];
  setCenter: (coastLonlat: { lat: number; lon: number; }) => void;
}

const CarouselContainer = ({data, setCenter}: CarouselContainerProps) => {
  const progress = useSharedValue<number>(0);

  return (
    <View
      id="carousel-component"
      style={{flex: 1, position: 'absolute', bottom: 75, zIndex: 30}}>
      <Carousel
        autoPlay={false}
        autoPlayInterval={2000}
        autoPlayReverse={false}
        data={data}
        height={258}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        vertical={false}
        width={410}
        style={{
          width: widthPercentageToDP(100),
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={progress}
        renderItem={item => (
            <SeaItem
                sigunguName={item.item.sigunguName}
                coastCode={item.item.coastCode}
                coastName={item.item.coastName}
                coastlineLen={item.item.coastlineLen}
                coastLonlat={item.item.coastLonlat}
            />
        )}
      />
    </View>
  );
};

export default CarouselContainer;
