import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    ContentWrapper,
    CustomModal,
    LoadingComponent,
} from '../../../../../components';
import { getAddressDetail } from '../../../../../Slice/Address';
import {
    selectAddressList,
    selectAddressLoading,
} from '../../../../../Slice/Address/selector';
import { getAllAddressAsync } from '../../../../../Slice/Address/thunk';
import { FormTitle } from '../../../../Home/components';
import { AddAddressModal } from '../../components';
import { AddressDetailModal } from '../../components/AddressDetailModal';
import { ConfirmDeleteAddress } from '../../components/ConfirmDeleteAddress';

export const Addresses = () => {
    const dispatch = useDispatch();
    const addresses = useSelector(selectAddressList);
    const loading = useSelector(selectAddressLoading);
    React.useEffect(() => {
        dispatch(getAllAddressAsync());
    }, []);
    const [show, setShow] = React.useState(false);
    const [showDelete, setShowDelete] = React.useState(false);

    const handleEditAddress = (address: any) => {
        setShow(true);
        dispatch(getAddressDetail(address));
    };
    const handleDeleteAddress = (address: any) => {
        setShowDelete(true);
        dispatch(getAddressDetail(address));
    };

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
            {loading ? (
                <LoadingComponent />
            ) : (
                <>
                    <h4 className="text-primary fw-bold">
                        Có {addresses?.length} địa chỉ
                    </h4>
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
                                        {e.key === 'PTN'
                                            ? 'Nội thành'
                                            : 'Ngoại thành'}
                                    </td>
                                    <td>
                                        <Link
                                            to={`#`}
                                            onClick={() => handleEditAddress(e)}
                                        >
                                            Chỉnh sửa
                                        </Link>
                                        {'   '}
                                        <Link
                                            to={'#'}
                                            onClick={() =>
                                                handleDeleteAddress(e)
                                            }
                                            className="text-danger"
                                        >
                                            Xóa
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            <AddAddressModal />
            {show ? <AddressDetailModal onClose={() => setShow(false)} /> : ''}
            {showDelete ? (
                <ConfirmDeleteAddress onClose={() => setShowDelete(false)} />
            ) : (
                ''
            )}
        </ContentWrapper>
    );
};
