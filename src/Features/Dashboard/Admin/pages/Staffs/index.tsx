import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContentWrapper } from "../../../../../components";
import { selectAllStaff } from "../../../../../Slice/Staff/slice/selector";
import { getAllStaffAsync } from "../../../../../Slice/Staff/slice/thunk";
import { DEFAULT_AVATAR } from "../../../../../static/DefaultAvatar";
import { FormTitle } from "../../../../Home/components";

interface Props {}

export const Staffs = (props: Props) => {
  const staff = useSelector(selectAllStaff);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllStaffAsync({ skip: 1, limit: 20 }));
  }, []);

  return (
    <ContentWrapper>
      <div className="d-flex justify-content-between align-items-center">
        <FormTitle title="QUẢN LÝ NHÂN VIÊN" bold />
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
          {staff?.map((e: any, i: number) => (
            <tr id="tableUser" key={i}>
              <th scope="row">{i + 1}</th>
              <td>
                <img
                  src={e.avatar || DEFAULT_AVATAR}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
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
          marginLeft: "auto",
          marginRight: "auto",
          width: "fit-content",
        }}
      ></div>
    </ContentWrapper>
  );
};
