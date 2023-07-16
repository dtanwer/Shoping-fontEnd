export const getDateDifference = (date) => {
    const date2 = new Date();
    const date1 = new Date(date);
    const diffInMilliseconds =(date2 - date1);
    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    console.log(hours,"fun")
    return hours;
}