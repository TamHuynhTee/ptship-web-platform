import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import addressApi from '../../../../../apis/Apis/addressApi';
import { ContentWrapper } from '../../../../../components';
import { selectAddressList } from '../../../../../Slice/Address/selector';
import { getAllAddressAsync } from '../../../../../Slice/Address/thunk';
import { FormTitle } from '../../../../Home/components';
import { AddAddressModal } from '../../components';

export const Addresses = () => {
    const dispatch = useDispatch();
    const addresses = useSelector(selectAddressList);
    React.useEffect(() => {
        dispatch(getAllAddressAsync());
    }, []);

    return (
        <ContentWrapper>
            <div className="d-flex justify-content-between align-items-center">
                <FormTitle title="QUẢN LÝ ĐỊA CHỈ" bold />
                <button
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#createAddress"
                >
                    <i className="bi bi-plus-square"></i> | Thêm
                </button>
            </div>
            <hr />
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Khu vực</th>
                        <th scope="col">Vùng</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {addresses?.map((e: any, i: number) => (
                        <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{e.address}</td>
                            <td>
                                {e.zone === 'PTN' ? 'Nội thành' : 'Ngoại thành'}
                            </td>
                            <td>
                                <Link to={`/dashboard/address/${e._id}`}>
                                    Chi tiết
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AddAddressModal />
        </ContentWrapper>
    );
};
