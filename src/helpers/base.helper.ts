export const formatMoney = (money: number): string =>
    money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
