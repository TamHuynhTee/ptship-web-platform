import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContentWrapper } from '../../../components';
import { formatMoney } from '../../../helpers/base.helper';
import { selectStatistic } from '../../../Slice/Order/selector';
import { getOrderStatisticsAsync } from '../../../Slice/Order/thunk';

export const Statistic = () => {
    const dispatch = useDispatch();
    const statistic = useSelector(selectStatistic);

    React.useEffect(() => {
        dispatch(
            getOrderStatisticsAsync({
                startTime: '2021-08-01',
                endTime: '2022-02-03',
            })
        );
    }, []);
    return (
        <ContentWrapper>
            <div className="row">
                <div className="col-3">
                    <div className="card text-center">
                        <div className="card-header">Tổng số đơn</div>
                        <div className="card-body">{statistic?.totalOrder}</div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card text-center">
                        <div className="card-header">Tổng COD</div>
                        <div className="card-body">
                            {formatMoney(statistic?.totalCOD || 0)}
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card text-center">
                        <div className="card-header">Đã thu COD</div>
                        <div className="card-body">
                            {formatMoney(statistic?.thuCOD || 0)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-3">
                    <div className="card text-center">
                        <div className="card-header">Tổng doanh thu</div>
                        <div className="card-body">
                            {formatMoney(statistic?.total || 0)}
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card text-center">
                        <div className="card-header">Tổng chi</div>
                        <div className="card-body">
                            {formatMoney(statistic?.totalProfit || 0)}
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card text-center">
                        <div className="card-header">Tổng lợi nhuận</div>
                        <div className="card-body">
                            {formatMoney(statistic?.totalRevenueShipper || 0)}
                        </div>
                    </div>
                </div>
            </div>
        </ContentWrapper>
    );
};
