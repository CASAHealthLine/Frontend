import { Plus, Trash2, SlidersHorizontal, Search } from "lucide-react";
import { useEffect, useState } from "react";
import "../styles/StaffList.css";
import { StaffInfo } from "../component/staff/StaffInfo";

const SearchButton = ({ content }) => {
  return (
    <button
      type="button"
      className="mx-1 rounded hover:bg-gray-200"
      style={{ color: "gray" }}
    >
      {content}
    </button>
  );
};

const TableRow = ({ id, fullname, gender, dob, occupation }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{fullname}</td>
      <td>{gender}</td>
      <td>{dob}</td>
      <td>{occupation}</td>
    </tr>
  );
};

export const StaffList = () => {
  return (
    <div className="m-2">
      <div className="flow-root">
        <h5 className="text-center float-left">Danh sách nhân viên</h5>
        <div className="float-right flex">
          <SearchButton content={<Plus />} />
          <SearchButton content={<Trash2 />} />
          <div className="rounded-md border-2 h-8 flex flex-row">
            <div
              className="mx-1 rounded hover:bg-gray-200"
              style={{ color: "gray" }}
            >
              <Search />
            </div>
            <input className="align-middle" />
            <SearchButton content={<SlidersHorizontal />} />
          </div>
        </div>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>
              <div>ID</div>
            </th>
            <th>
              <div>Họ tên</div>
            </th>
            <th>
              <div>Giới tính</div>
            </th>
            <th>
              <div>Ngày sinh</div>
            </th>
            <th>
              <div>Chức vụ</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <TableRow
            id={"1"}
            fullname={"Nguyễn Văn A"}
            gender={"Nam"}
            dob={"01/03/2001"}
            occupation={"Bác sĩ"}
          />
          <TableRow
            id={"1"}
            fullname={"Nguyễn Văn A"}
            gender={"Nam"}
            dob={"01/03/2001"}
            occupation={"Bác sĩ"}
          />
          <TableRow
            id={"1"}
            fullname={"Nguyễn Văn A"}
            gender={"Nam"}
            dob={"01/03/2001"}
            occupation={"Bác sĩ"}
          />
        </tbody>
      </table>
      <StaffInfo />
    </div>
  );
};
