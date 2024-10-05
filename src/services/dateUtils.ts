export const getDateString = (date : Date) => {
    return `${date?.getFullYear()}${
        // @ts-ignore
        date?.getMonth() + 1 > 9 ? date?.getMonth() + 1 : '0' + (date?.getMonth() + 1)}${
        // @ts-ignore
        date?.getDate() > 9 ? date?.getDate() : '0' + date?.getDate()}${
        date?.getHours()}${date?.getMinutes()}`;
}