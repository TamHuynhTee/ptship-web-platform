import React from 'react';
import addressApi from '../../../../../apis/Apis/addressApi';
import { ContentWrapper } from '../../../../../components';
import { FormTitle } from '../../../../Home/components';
import { AddAddressModal } from '../../components';

export const Addresses = () => {
    const [address, setAddress] = React.useState([]);

    React.useEffect(() => {
        const getAddress = async () => {
            const res: any = await addressApi.getAllAddress();
            const newAddress = res.data.map((e: any) => ({
                id: e._id,
                zone: e.key,
                address: e.address,
            }));
            setAddress(newAddress);
        };
        getAddress();
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
                    </tr>
                </thead>
                <tbody>
                    {address.map((e: any, i: number) => (
                        <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{e.address}</td>
                            <td>
                                {e.zone === 'PTN' ? 'Nội thành' : 'Ngoại thành'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AddAddressModal />
        </ContentWrapper>
    );
};
