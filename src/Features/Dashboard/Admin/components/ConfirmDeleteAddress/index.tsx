import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../../../../apis/axiosClient';
import { CustomModal, ModalProps } from '../../../../../components';
import { selectAddressDetail } from '../../../../../Slice/Address/selector';
import { getAllAddressAsync } from '../../../../../Slice/Address/thunk';
import { notifyError, notifySuccess } from '../../../../../utils/notify';

export const ConfirmDeleteAddress = (props: ModalProps) => {
    const { onClose } = props;
    const dispatch = useDispatch();
    const address = useSelector(selectAddressDetail);
    const confirmDelete = async () => {
        const result = await axiosClient.delete(
            `address/deleteAddress/${address?._id}`
        );
        if (result.data) {
            dispatch(getAllAddressAsync());
            onClose();
            notifySuccess('Đã xóa địa chỉ');
        } else {
            notifyError('Có lỗi');
        }
    };

    return (
        <CustomModal onClose={onClose} title="Xác nhận xóa địa chỉ">
            <h5>Bạn chắc muốn xóa địa chỉ này chứ ?</h5>
            <button className="btn btn-danger" onClick={confirmDelete}>
                Xóa
            </button>
        </CustomModal>
    );
};
