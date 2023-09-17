export const Items_per_page=10;
export function disscountPrice(item){
    return Math.round(item.price * (1 - item.discountPercentage / 100),2)
}