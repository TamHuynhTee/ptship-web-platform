import { resStatisticOrder } from '../../SliceApis/Order/order.interface';

export interface OrderStateTypes {
    loading?: boolean;
    statistic?: resStatisticOrder;
}
