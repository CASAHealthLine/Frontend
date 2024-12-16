import { Plus, Trash2, SlidersHorizontal, Search, Save } from "lucide-react";
import { useEffect, useState } from "react";

const TableRow = ({ label, content }) => {
  return (
    <tr>
      <td className="text-right pr-2 align-text-top">
        <b>{label}:</b>
      </td>
      <td className="text-left align-text-top">{content}</td>
    </tr>
  );
};

export const StaffInfo = (info) => {
  return (
    <>
      <h5 className="text-center">
        <u>Thông Tin Cá Nhân</u>
      </h5>
      <table className="mx-auto my-1">
        <TableRow label="Họ Tên" content="Nguyễn Văn A" />
        <TableRow label="Giới tính" content="Nam" />
        <TableRow label="Ngày Sinh" content="01/03/2001" />
        <TableRow
          label="Địa Chỉ Thường Trú"
          content="03 trần quốc vượng, dịch vọng, cầu giấy, hà nội"
        />
        <TableRow label="Mã CCCD" content="029182381821" />
        <TableRow label="Email" content="vanb@gmail.com" />
        <TableRow label="Số Điện Thoại" content="012345678" />
        <TableRow label="Chức vụ" content="Bác sĩ" />
      </table>
      <div className="flex">
        <button className="flex rounded-md px-2 py-1 mx-1 text-white shadow-md"
        style={{backgroundColor: "var(--primary-bg-color)"}}><Save/>Lưu</button>
        <button className="flex rounded-md px-2 py-1 mx-1 text-white shadow-md"
        style={{backgroundColor: "var(--primary-bg-color)"}}>Hủy Bỏ</button>
      </div>
    </>
  );
};
