export const getOrderStatus=(status,isCancel)=>{
    if(isCancel) return 2;
    switch (status) {
        case "ordered":
            return 0;
            break;
        case "shipped":
            return 1;
            break;
        case "delivered":
            return 2;
            break;
        case "cancel":
            return 2;
            break;
        default:
            return 1;
            break;
    }
}