import { Plus, Trash2, SlidersHorizontal, Search } from "lucide-react";
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

export const PatientPersonal = (info) => {
  return (
    <table className="mx-auto my-5">
      <TableRow label="Họ Tên" content="Nguyễn Văn A" />
      <TableRow label="Giới tính" content="Nam" />
      <TableRow label="Ngày Sinh" content="01/03/2001" />
      <TableRow
        label="Địa Chỉ Thường Trú"
        content="03 trần quốc vượng, dịch vọng, cầu giấy, hà nội"
      />
      <TableRow label="Mã CCCD" content="029182381821" />
      <TableRow label="Số Điện Thoại" content="012345678" />
      <TableRow label="Nghề Nghiệp" content="Tự Do" />
    </table>
  );
};
