import {StyleSheet} from "react-native";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import color from "@/constant/color.ts";

export const searchAndCleanModeStyles = StyleSheet.create({
    textFlex: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 3,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: widthPercentageToDP('4%'),
        fontWeight: 500,
    },
    imageButtonText: {
        color: color.gray500,
    },
    wrapper: {
        marginBottom: heightPercentageToDP('2.78%'),
    },
    title: {
        fontSize: heightPercentageToDP('2%'),
        fontWeight: 500,
        marginBottom: 12,
    },
    flex: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputPosition: {
        position: 'relative',
        width: '49%',
    },
    input: {
        width: '100%',
        fontSize: heightPercentageToDP('1.8%'),
        // borderColor: color.gray200,
        // borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 8,
        paddingTop: 15,
        height: 60,
        backgroundColor: color.gray100,
    },
    inputAbsoluteText: {
        position: 'absolute',
        left: 10,
        top: 10,
        color: color.gray500,
        fontSize: heightPercentageToDP('1.4%'),
        zIndex: 1,
    },
    gray: {
        backgroundColor: color.gray100,
    },
    textGray: {
        color: color.gray500,
        paddingTop: 1,
    },
    confirmBtn: {
        position: 'absolute',
        bottom: 0,
        // paddingTop: 10,
        height: 70,
        borderRadius: 0,
    },
})