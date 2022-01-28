import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContentWrapper } from '../../../../../components';
import {
    selectAllUser,
    selectUserLoading,
} from '../../../../../Slice/User/selector';
import { getAllUserAsync } from '../../../../../Slice/User/thunk';
import { DEFAULT_AVATAR } from '../../../../../static/DefaultAvatar';
import { FormTitle } from '../../../../Home/components';
import './style.scss';

interface Props {}

export const Users = (props: Props) => {
    const user = useSelector(selectAllUser);
    const loading = useSelector(selectUserLoading);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getAllUserAsync({ skip: 1, limit: 20 }));
    }, []);

    console.log(user);
    return (
        <ContentWrapper>
            <div className="d-flex justify-content-between align-items-center">
                <FormTitle title="QUẢN LÝ NGƯỜI DÙNG" bold />
                {/* <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#createAddress"
        >
          <i className="bi bi-plus-square"></i> | Thêm
        </button> */}
            </div>
            <hr />
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Địa Chỉ</th>
                        <th scope="col">SĐT</th>
                    </tr>
                </thead>
                <tbody>
                    {user?.map((e: any, i: number) => (
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
                            {/* <td>
                <Link to={`/dashboard/address/${e._id}`}>Chi tiết</Link>
              </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: 'fit-content',
                }}
            ></div>
        </ContentWrapper>
    );
};
