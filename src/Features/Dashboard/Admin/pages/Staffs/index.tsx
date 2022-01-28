import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ContentWrapper, LoadingComponent } from '../../../../../components';
import { getDetailStaff } from '../../../../../Slice/Staff';
import {
    selectAllStaff,
    selectStaffLoading,
} from '../../../../../Slice/Staff/selector';
import { getAllStaffAsync } from '../../../../../Slice/Staff/thunk';
import { DEFAULT_AVATAR } from '../../../../../static/DefaultAvatar';
import { FormTitle } from '../../../../Home/components';
import { RegisterStaffModal } from '../../components';
import { StaffDetailModal } from '../../components/StaffDetailModal';
import { AnimatePresence } from 'framer-motion';

export const Staffs = () => {
    const dispatch = useDispatch();
    const staff = useSelector(selectAllStaff);
    const loading = useSelector(selectStaffLoading);
    const [showAddModal, setShowAddModal] = React.useState(false);
    const [showDetailModal, setShowDetailModal] = React.useState(false);
    React.useEffect(() => {
        dispatch(getAllStaffAsync({ skip: 1, limit: 20 }));
    }, []);

    const handleEditStaff = (staff: any) => {
        setShowDetailModal(true);
        dispatch(getDetailStaff(staff));
    };

    return (
        <ContentWrapper>
            <div className="d-flex justify-content-between align-items-center">
                <FormTitle title="QUẢN LÝ NHÂN VIÊN" bold />
                <button
                    className="btn btn-success"
                    onClick={() => setShowAddModal(true)}
                >
                    <i className="bi bi-plus-square"></i> | Thêm
                </button>
            </div>
            <hr />
            {loading ? (
                <LoadingComponent />
            ) : (
                <>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Avatar</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Địa Chỉ</th>
                                <th scope="col">SĐT</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {staff?.map((e: any, i: number) => (
                                <tr id="tableUser" key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>
                                        <img
                                            src={e.avatar || DEFAULT_AVATAR}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                            }}
                                        ></img>
                                    </td>
                                    <td>{e.displayName}</td>
                                    <td>{e.address}</td>
                                    <td>{e.phone}</td>
                                    <td>
                                        <Link
                                            to={'#'}
                                            onClick={() => handleEditStaff(e)}
                                        >
                                            Chi tiết
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            <div
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: 'fit-content',
                }}
            ></div>
            <AnimatePresence initial={false} exitBeforeEnter={true}>
                {showAddModal && (
                    <RegisterStaffModal
                        onClose={() => setShowAddModal(false)}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence initial={false} exitBeforeEnter={true}>
                {showDetailModal && (
                    <StaffDetailModal
                        onClose={() => setShowDetailModal(false)}
                    />
                )}
            </AnimatePresence>
        </ContentWrapper>
    );
};
