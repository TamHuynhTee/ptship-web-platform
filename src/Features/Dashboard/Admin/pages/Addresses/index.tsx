import React from 'react';
import addressApi from '../../../../../apis/Apis/addressApi';
import { ContentWrapper } from '../../../../../components';
import { FormTitle } from '../../../../Home/components';
import { AddEditAddress } from '../../components';

interface Props {}

export const Addresses = (props: Props) => {
    const [editMode, setEditMode] = React.useState(false);
    const [editData, setEditData] = React.useState({});
    const [haveModal, setHaveModal] = React.useState(false);
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

    const handleAddMode = () => {
        setEditMode(false);
        setEditData({});
        setHaveModal(true);
    };

    const handleEditMode = (data: any) => {
        setHaveModal(true);
        setEditMode(true);
        setEditData(data);
    };

    return (
        <ContentWrapper>
            <div className="d-flex justify-content-between align-items-center">
                <FormTitle title="QUẢN LÝ ĐỊA CHỈ" />
                <button
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#createAddress"
                    onClick={handleAddMode}
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
                        <tr
                            key={i}
                            onClick={() => handleEditMode(e)}
                            data-bs-toggle="modal"
                            data-bs-target="#createAddress"
                        >
                            <th scope="row">{i + 1}</th>
                            <td>{e.address}</td>
                            <td>
                                {e.zone === 'PTN' ? 'Nội thành' : 'Ngoại thành'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {haveModal ? (
                <AddEditAddress isEdit={editMode} data={editData} />
            ) : (
                ''
            )}
        </ContentWrapper>
    );
};
