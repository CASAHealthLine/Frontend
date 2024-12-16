import { Plus, Trash2, SlidersHorizontal, Search } from "lucide-react";
import { useEffect, useState } from "react";

const TableRow = ({ label, content }) => {
  return (
    <tr>
      <td className="text-right w-1/5 pr-2 align-text-top">
        <b>{label}:</b>
      </td>
      <td className="text-left align-text-top">{content}</td>
    </tr>
  );
};

const Record = (room, result, start, end) => {
  return (
    <div className="bg-gray-200 rounded-md mx-10 my-10">
      <div className="bg-blue-500 rounded-t-md text-center text-white">
        Ngày: {"10/10/1010"}
      </div>
      <div>
        <table>
          <TableRow label="Kết quả" content="123" />
          <TableRow label="Thời gian chỉ định" content="17:04 9/10/2024" />
          <TableRow label="Thời gian kết thúc" content="17:04 9/10/2024" />
        </table>
      </div>
    </div>
  );
};

export const PatientStatus = (info) => {
  return (
    <>
      <Record />
    </>
  );
};
