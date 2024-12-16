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

const Record = (date, diag, summary, testRes, diagRes, prescription) => {
  return (
    <div className="bg-gray-200 rounded-md mx-10 my-10">
      <div className="bg-gray-500 rounded-t-md text-center text-white">
        Ngày: {"10/10/1010"}
      </div>
      <div>
        <table>
          <TableRow label="Chẩn Đoán" content="Trào ngược dịch dạ dày nhẹ" />
          <TableRow
            label="Tóm Tắt Triệu Chứng"
            content="Ợ nóng, ợ chua. Người bệnh sẽ ợ hơi thường xuyên để đẩy bớt lượng khí trong dạ dày ra ngoài, giảm khó chịu cho dạ dày, buồn nôn, nôn, đắng miệng. ..."
          />
          <TableRow label="Kết Quả Xét Nghiệm" content="1....s241.pdf" />
          <TableRow label="Kết Quả Chẩn Đoán" content="1....s241.pdf" />
          <TableRow label="Đơn Thuốc" content="1....s241.pdf" />
        </table>
      </div>
    </div>
  );
};

export const PatientRecord = (info) => {
  return (
    <>
      <Record />
    </>
  );
};
