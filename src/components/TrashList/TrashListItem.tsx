import React, {useEffect} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomText from '../Common/CustomText';
import color from '@/constant/color';
import {useQuery} from 'react-query';

interface ImagesMap {
  [key: string]: ImageSourcePropType;
}

const images: ImagesMap = {
  fishing_net: require('@assets/icon/trashList/fishing_net.png'),
  floating: require('@assets/icon/trashList/floating.png'),
  large_trash: require('@assets/icon/trashList/large_trash.png'),
  living_trash: require('@assets/icon/trashList/living_trash.png'),
  tree: require('@assets/icon/trashList/tree.png'),
};

const imagesWhite: ImagesMap = {
  fishing_net: require('@assets/icon/trashList/fishing_net(white).png'),
  floating: require('@assets/icon/trashList/floating(white).png'),
  large_trash: require('@assets/icon/trashList/large_trash(white).png'),
  living_trash: require('@assets/icon/trashList/living_trash(white).png'),
  tree: require('@assets/icon/trashList/tree(white).png'),
};

const subText: {[key: string]: string} = {
  폐어구류: '그물, 밧줄, 양식 자재 등',
  부표류: '스티로폼 부표, 인증부표 등',
  생활쓰레기류: '음료수병, 포장비닐, 과자봉지, 캔 등',
  '대형 투기쓰레기류': '가전제품, 타이어 등',
  초목류: '자연목, 인공목 등',
};
interface TrashListItemProps {
  litterTypeCode?: string | null;
  setLitterTypeCode: (code: string) => void; // setLitterTypeCode 함수 타입 정의
}

// API 응답 데이터 타입 정의
interface TrashListItem {
  litterIcon: string;
  litterTypeCode: string;
  litterTypeName: string;
}

// @ts-ignore
const TrashListItem: React.FC<TrashListItemProps> = ({
  litterTypeCode,
  setLitterTypeCode,
}) => {
  const fetchTrashListItem = async (): Promise<TrashListItem[]> => {
    const response = await fetch('https://www.didit.store/api/v1/litter');
    return response.json();
  };

  const {data, isError, error, isLoading} = useQuery<TrashListItem[]>(
    'trashList',
    fetchTrashListItem,
  );

  useEffect(() => {
    if (isError) {
      console.error('Error fetching trash list:', error);
    } else {
      console.log('data: ', data);
    }
  }, [data, isError, error]);

  return (
    <View style={styles.container}>
      {data?.map((item, index) => (
        <TouchableOpacity
          onPress={() => setLitterTypeCode(item.litterTypeCode)}
          key={item.litterTypeCode}
          style={[
            styles.item,
            {
              backgroundColor:
                litterTypeCode === item.litterTypeCode
                  ? color.primary
                  : color.gray100,
            },
          ]}>
          <View style={styles.description}>
            <Image
              source={
                litterTypeCode === item.litterTypeCode
                  ? imagesWhite[item.litterIcon]
                  : images[item.litterIcon]
              }
              style={styles.trashIcon}
            />
            <CustomText
              style={{
                color:
                  litterTypeCode === item.litterTypeCode
                    ? color.white
                    : color.black,
              }}>
              {item.litterTypeName}
            </CustomText>
          </View>
          <View>
            <CustomText
              style={[
                styles.subText,
                {
                  color:
                    litterTypeCode === item.litterTypeCode
                      ? color.white
                      : color.black,
                },
              ]}>
              {subText[item.litterTypeName]}
            </CustomText>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TrashListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  item: {
    width: '49%',
    height: 95,
    backgroundColor: color.gray100,
    borderRadius: 10,
    padding: 10,
    paddingVertical: 15,
    marginBottom: 8,
  },
  description: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trashIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  subText: {
    fontSize: 12,
    marginTop: 8,
  },
});
