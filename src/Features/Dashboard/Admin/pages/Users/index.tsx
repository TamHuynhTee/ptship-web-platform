import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ContentWrapper } from '../../../../../components';
import SearchInput from '../../../../../components/SearchInput';
import { selectAllUser } from '../../../../../Slice/User/selector';
import { getAllUserAsync } from '../../../../../Slice/User/thunk';
import { DEFAULT_AVATAR } from '../../../../../static/DefaultAvatar';
import { FormTitle } from '../../../../Home/components';
import './style.scss';

export const Users = () => {
    const user = useSelector(selectAllUser);
    // const loading = useSelector(selectUserLoading);
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(1);
    React.useEffect(() => {
        dispatch(getAllUserAsync({ skip: 1, limit: 20 }));
    }, []);

    const handleLoadMore = () => {
        dispatch(getAllUserAsync({ skip: page + 1, limit: 20 }));
        setPage(page + 1);
    };

    const handleSearch = (keyword: string) => {
        console.log(keyword);
    };

    return (
        <ContentWrapper>
            <div className="d-flex justify-content-between align-items-center">
                <FormTitle title="QUẢN LÝ NGƯỜI DÙNG" bold />
            </div>
            <SearchInput
                handleSearch={handleSearch}
                placeholder="Nhập số điện thoại hoặc tên"
            />
            <hr />
            {/* {loading ? (
                <LoadingComponent />
            ) : ( */}
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Địa Chỉ</th>
                        <th scope="col">SĐT</th>
                        <th scope="col">Tùy chỉnh</th>
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
                            <td>
                                {e.address || (
                                    <span className="text-warning">
                                        Chưa cập nhật
                                    </span>
                                )}
                            </td>
                            <td>
                                {e.phone || (
                                    <span className="text-warning">
                                        Chưa cập nhật
                                    </span>
                                )}
                            </td>
                            <td>
                                <Link
                                    to={'#'}
                                    // onClick={() => handleEditStaff(e)}
                                >
                                    Chi tiết
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleLoadMore}
            >
                Xem thêm
            </button>
        </ContentWrapper>
    );
};
