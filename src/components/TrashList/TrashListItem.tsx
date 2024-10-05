import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from '../Common/CustomText';
import color from '@/constant/color';
import {useQuery} from "react-query";

interface ImagesMap {
    [key: string]: ImageSourcePropType;
}

const images: ImagesMap = {
    fishing_net: require('@assets/icon/trashList/fishing_net.png'),
    floating: require('@assets/icon/trashList/floating.png'),
    large_trash: require('@assets/icon/trashList/large_trash.png'),
    living_trash: require('@assets/icon/trashList/living_trash.png'),
    tree: require('@assets/icon/trashList/tree.png'),
}

interface TrashListItemProps {
    litterTypeCode?: string | null
}

// @ts-ignore
const TrashListItem = ({litterTypeCode, setLitterTypeCode}) => {

    const fetchTrashListItem = async () => {
        return await (await fetch('https://www.didit.store/api/v1/litter')).json();
    }

    const {data, isError, error, isLoading} = useQuery('trashList', () => fetchTrashListItem());

    return (
        <View style={styles.container}>
            {data?.map((item: {
                litterIcon: string;
                litterTypeCode: React.Key;
                litterTypeName: string;
            }, index: number) => (
                <TouchableOpacity
                    onPress={() => setLitterTypeCode(item.litterTypeCode)}
                    key={item.litterTypeCode}
                    style={[
                        styles.item,
                        {backgroundColor: litterTypeCode === item.litterTypeCode ? color.primary : color.gray100},
                    ]}>
                    <View style={styles.description}>
                        <Image source={images[item.litterIcon]}
                               style={styles.trashIcon}/>
                        <CustomText
                            style={{color: litterTypeCode === item.litterTypeCode ? color.white : color.black}}>{item.litterTypeName}</CustomText>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

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
        backgroundColor: color.gray100,
        borderRadius: 10,
        padding: 10,
        marginBottom: 8,
    },
    description: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    trashIcon: {
        width: 50,
        height: 50,
    }
});
