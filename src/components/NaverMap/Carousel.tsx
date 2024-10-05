// import React, {useState} from 'react';
// import {ScrollView, View, StyleSheet} from 'react-native';

// const Carousel = () => {
//   const data = ['tomato', 'skyblue', 'green', 'beige', 'yellow'];
//   const [itemWidth, setItemWidth] = useState(0);

//   return (
//     <View style={styles.carouselContainer}>
//       <ScrollView
//         style={styles.scrollView}
//         horizontal
//         pagingEnabled
//         contentContainerStyle={{width: `${100 * data.length}%`}}
//         scrollEventThrottle={200}
//         decelerationRate="fast"
//         onContentSizeChange={w => setItemWidth(w / data.length)}
//         showsHorizontalScrollIndicator={false}>
//         <View style={styles.row}>
//           {data.map((item: string) => {
//             return (
//               <View
//                 key={item}
//                 style={[styles.carouselItemContainer, {width: itemWidth}]}>
//                 <View style={[styles.carouselItem, {backgroundColor: item}]} />
//               </View>
//             );
//           })}
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   carouselContainer: {
//     flex: 1,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   row: {
//     flexDirection: 'row',
//   },
//   carouselItemContainer: {
//     height: '100%',
//     padding: 20,
//   },
//   carouselItem: {
//     flex: 1,
//   },
// });

// export default Carousel;

// import React from 'react';
// import {Image, StyleSheet, View} from 'react-native';
// import {FlatList} from 'react-native-gesture-handler';

// interface CarouselProps {
//   images: string[];
//   gap: number;
//   offset: number;
//   pageWidth: number;
// }

// const Carousel = (props: CarouselProps) => {
//   const renderItem = (item: string, index: number) => {
//     return (
//       <Image
//         key={item}
//         source={{uri: item}}
//         style={{
//           width: props.pageWidth,
//           marginHorizontal: props.gap / 2,
//           marginLeft: 0,
//           borderRadius: 5,
//           marginRight: index === props.images.length - 1 ? 0 : 20,
//         }}
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {props.images.length === 1 ? (
//         <Image source={{uri: props.images[0]}} style={styles.image} />
//       ) : (
//         <FlatList
//           data={props.images}
//           horizontal
//           pagingEnabled
//           decelerationRate="fast"
//           snapToInterval={props.pageWidth + props.gap} // 페이지 너비 + 간격
//           snapToAlignment="start"
//           renderItem={item => renderItem(item.item, item.index)}
//           showsHorizontalScrollIndicator={false}
//           keyExtractor={item => item} // keyExtractor 추가
//         />
//       )}
//     </View>
//   );
// };

// export default Carousel;

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: 210,
//   },
//   // imageWrapper: {
//   //   width: widthPercentageToDP(50),
//   //   height: 210,
//   // },
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 5,
//   },
// });

import color from '@/constant/color';
import React from 'react';
import {Text, View} from 'react-native';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const CarouselContainer = () => {
  const width = Dimensions.get('window').width;
  return (
    <View style={{flex: 1}}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({index}) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: 'center',
              backgroundColor: color.gray500,
            }}>
            <Text style={{textAlign: 'center', fontSize: 30}}>{index}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CarouselContainer;
