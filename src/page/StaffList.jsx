import { Plus, Table } from "lucide-react";
import { useEffect, useState } from "react";
import "../styles/StaffList.css";

export const StaffList = () => {
  return (
    <div className="m-2">
      <div className="">
        <h5 className="text-center">Danh sách nhân viên</h5>
        <button type="button">
          <Plus />
        </button>
        <input />
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
          <tr>
            <td>1</td>
            <td>Nguyễn Văn A</td>
            <td>Nam</td>
            <td>01/03/2001</td>
            <td>Bác sĩ</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Nguyễn Văn A</td>
            <td>Nam</td>
            <td>01/03/2001</td>
            <td>Bác sĩ</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Nguyễn Văn A</td>
            <td>Nam</td>
            <td>01/03/2001</td>
            <td>Bác sĩ</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Nguyễn Văn A</td>
            <td>Nam</td>
            <td>01/03/2001</td>
            <td>Bác sĩ</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Nguyễn Văn A</td>
            <td>Nam</td>
            <td>01/03/2001</td>
            <td>Bác sĩ</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
