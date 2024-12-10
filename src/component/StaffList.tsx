import React, { useEffect, useState } from 'react';
import Modal from "react-modal";
import { Plus, Trash2 } from 'lucide-react'; // Thư viện react-lucide
import Button from 'react-bootstrap/Button';
Modal.setAppElement("#root");
import specialties from '../data/specialties.json';
type Specialty = (typeof specialties)[number];
type Staff = {
    id: number;
    name: string;
    gender: string;
    birthday: string;
    specialty: Specialty;
    email: string;
    phone: string;
    address: string;
    username: string;
    employment_date: string;
    created_at: string;
};

const formatToDDMMYYYY = (isoDate) => {
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
};

const formatToISO = (ddmmyyyy) => {
    const [day, month, year] = ddmmyyyy.split("/");
    return `${year}-${month}-${day}`;
};

export const StaffList = () => {
    const [staffData, setStaffData] = useState<Staff[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(""); // Dữ liệu tìm kiếm
    const [searchField, setSearchField] = useState<string>("name"); // Trường tìm kiếm (mặc định là họ tên)
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null); // Nhân viên được chọn
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [newStaff, setNewStaff] = useState<Partial<Staff>>({
        name: "",
        gender: "",
        birthday: "",
        specialty: specialties[0],
        email: "",
        phone: "",
        address: "",
        username: "",
        employment_date: "",
        created_at: "",
    });

    const fetchStaffData = async () => {
        try {
            const response = await fetch('/data/staff.json');
            const data = await response.json();
            setStaffData(data);
        } catch (error) {
            console.error('Error loading staff data:', error);
        }
    };

    useEffect(() => {
        fetchStaffData();
    }, []);

    const handleAddStaff = () => {
        if (staffData.some((staff) => staff.username === newStaff.username)) {
            alert("Username đã tồn tại!");
            return;
        }

        const newId = staffData.length > 0 ? Math.max(...staffData.map(s => s.id)) + 1 : 1;
        const addedStaff = { ...newStaff, id: newId } as Staff;

        setStaffData([...staffData, addedStaff]);
        setIsAddModalOpen(false);
    };

    const filteredData = staffData.filter((staff) => {
        const value = staff[searchField as keyof Staff];
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleRowSelect = (id: number) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const handleDelete = () => {
        // Call delete API or update state
        const updatedStaffData = staffData.filter(staff => !selectedRows.includes(staff.id));
        setStaffData(updatedStaffData);
        setSelectedRows([]);
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="flex flex-col pt-[2.5%]">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4 pl-[5%]">Danh sách nhân viên</h1>
                <div className="flex items-center gap-4 mb-4 pr-[5%]">
                    <Plus className="cursor-pointer" onClick={() => setIsAddModalOpen(true)} />
                    <Trash2 className="cursor-pointer" onClick={() => setIsDeleteModalOpen(true)} />
                    <div className="flex items-center gap-2">
                        {/* Dropdown chọn trường tìm kiếm */}
                        <select
                            className="border rounded px-2 py-1"
                            value={searchField}
                            onChange={(e) => setSearchField(e.target.value)}
                        >
                            <option value="id">ID</option>
                            <option value="name">Họ tên</option>
                            <option value="gender">Giới tính</option>
                            <option value="birthday">Ngày sinh</option>
                            <option value="specialty">Chuyên ngành</option>
                        </select>
                        {/* Ô nhập tìm kiếm */}
                        <input
                            type="text"
                            className="border rounded px-2 py-1"
                            placeholder={`Tìm kiếm theo ${searchField}`}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-full">
                <table className="w-[90%]">
                    <thead className="table-dark">
                        <tr>
                            <th></th>
                            <th className="px-4 py-2 text-center">ID</th>
                            <th className="px-4 py-2 text-center">Họ tên</th>
                            <th className="px-4 py-2 text-center">Giới tính</th>
                            <th className="px-4 py-2 text-center">Ngày sinh</th>
                            <th className="px-4 py-2 text-center">Chuyên ngành</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((staff) => (

                            <tr
                                key={staff.id}
                                onClick={(event) => {
                                    const target = event.target as HTMLElement;
                                    // Kiểm tra nếu người dùng nhấn vào checkbox, không kích hoạt sự kiện onClick
                                    if (target.tagName !== 'INPUT') {
                                        setSelectedStaff(staff);
                                        setIsModalOpen(true);
                                    }
                                }}
                                style={{ cursor: "pointer" }}
                            >
                                <td>
                                    <input
                                        type="checkbox"
                                        className="w-6 h-6 border-2 border-gray-500 rounded"
                                        checked={selectedRows.includes(staff.id)}
                                        onChange={(event) => {
                                            event.stopPropagation(); // Ngăn sự kiện lan lên <tr>
                                            handleRowSelect(staff.id);
                                        }}
                                    />
                                </td>

                                <td className="px-4 py-2 text-center">{staff.id}</td>
                                <td className="px-4 py-2 text-center">{staff.name}</td>
                                <td className="px-4 py-2 text-center">{staff.gender}</td>
                                <td className="px-4 py-2 text-center">{staff.birthday}</td>
                                <td className="px-4 py-2 text-center">{staff.specialty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedStaff && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    className="bg-white rounded-lg max-w-md mx-auto mt-20 p-6 shadow-lg focus:outline-none"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                >
                    <h2 className="text-center">Thông tin chi tiết</h2>
                    <p>Username : {selectedStaff.username}</p>
                    <p>Tên : {selectedStaff.name}</p>
                    <p>Email : {selectedStaff.email}</p>
                    <p>Số điện thoại : {selectedStaff.phone}</p>
                    <p>Địa chỉ : {selectedStaff.address}</p>
                    <p>Ngày sinh : {selectedStaff.birthday}</p>
                    <p>Chuyên ngành : {selectedStaff.specialty}</p>
                    <Button variant="outline-danger" onClick={() => setIsModalOpen(false)}>Đóng</Button>
                </Modal>
            )}
            {isAddModalOpen && (
                <Modal
                    isOpen={isAddModalOpen}
                    onRequestClose={() => setIsAddModalOpen(false)}
                    className="bg-white rounded-lg max-w-md mx-auto mt-4 p-6 shadow-lg focus:outline-none"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                >
                    <h2 className="text-xl font-bold mb-4 text-center">Thêm nhân viên</h2>
                    {/* Form thêm nhân viên */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAddStaff(); // Gọi hàm handleAddStaff để xử lý logic thêm nhân viên
                        }}
                    >
                        <div className="flex flex-col gap-3">
                            {/* Họ tên */}
                            <div className="flex items-center gap-4">
                                <label className="font-semibold w-32 text-left">Họ tên:</label>
                                <input
                                    type="text"
                                    value={newStaff.name}
                                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                                    className="border px-3 py-2 rounded flex-1"
                                    required
                                />
                            </div>

                            {/* Giới tính */}
                            <div className="flex items-center gap-4">
                                <label className="font-semibold w-32 text-left">Giới tính:</label>
                                <select
                                    value={newStaff.gender}
                                    onChange={(e) => setNewStaff({ ...newStaff, gender: e.target.value })}
                                    className="border px-3 py-2 rounded flex-1"
                                    required
                                >
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                            </div>

                            {/* Ngày sinh */}
                            <div className="flex items-center gap-4">
                                <label className="font-semibold w-32 text-left">Ngày sinh:</label>
                                <input
                                    type="date"
                                    value={newStaff.birthday ? formatToISO(newStaff.birthday) : ""}
                                    onChange={(e) =>
                                        setNewStaff({ ...newStaff, birthday: formatToDDMMYYYY(e.target.value) })
                                    }
                                    className="border px-3 py-2 rounded flex-1"
                                    required
                                />
                            </div>

                            {/* Chuyên ngành */}
                            <div className="flex items-center gap-4">
                                <label className="font-semibold w-32 text-left">Chuyên ngành:</label>
                                <select
                                    value={newStaff.specialty}
                                    onChange={(e) => setNewStaff({ ...newStaff, specialty: e.target.value })}
                                    className="border px-3 py-2 rounded flex-1"
                                    required
                                    style={{
                                        maxHeight: "100px", // Giới hạn chiều cao
                                        overflowY: "auto", // Thêm cuộn dọc nếu cần
                                    }}
                                >
                                    {specialties
                                        .sort((a, b) => a.localeCompare(b)) // Sắp xếp theo bảng chữ cái
                                        .map((specialty) => (
                                            <option key={specialty} value={specialty}>
                                                {specialty}
                                            </option>
                                        ))}
                                </select>
                            </div>


                            {/* Email */}
                            <div className="flex items-center gap-4">
                                <label className="font-semibold w-32 text-left">Email:</label>
                                <input
                                    type="email"
                                    value={newStaff.email}
                                    onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                                    className="border px-3 py-2 rounded flex-1"
                                    required
                                />
                            </div>

                            {/* Số điện thoại */}
                            <div className="flex items-center gap-4">
                                <label className="font-semibold w-32 text-left">Số điện thoại:</label>
                                <input
                                    type="text"
                                    value={newStaff.phone}
                                    onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                                    className="border px-3 py-2 rounded flex-1"
                                    required
                                />
                            </div>

                            {/* Địa chỉ */}
                            <div className="flex items-center gap-4">
                                <label className="font-semibold w-32 text-left">Địa chỉ:</label>
                                <input
                                    type="text"
                                    value={newStaff.address}
                                    onChange={(e) => setNewStaff({ ...newStaff, address: e.target.value })}
                                    className="border px-3 py-2 rounded flex-1"
                                    required
                                />
                            </div>

                            {/* Username */}
                            <div className="flex items-center gap-4">
                                <label className="font-semibold w-32 text-left">Username:</label>
                                <input
                                    type="text"
                                    value={newStaff.username}
                                    onChange={(e) => setNewStaff({ ...newStaff, username: e.target.value })}
                                    className="border px-3 py-2 rounded flex-1"
                                    required
                                />
                            </div>

                            {/* Ngày làm việc */}
                            <div className="flex items-center gap-4">
                                <label className="font-semibold w-32 text-left">Ngày làm việc:</label>
                                <input
                                    type="date"
                                    value={newStaff.employment_date ? formatToISO(newStaff.employment_date) : ""}
                                    onChange={(e) =>
                                        setNewStaff({ ...newStaff, employment_date: formatToDDMMYYYY(e.target.value) })
                                    }
                                    className="border px-3 py-2 rounded flex-1"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-4">
                            {/* Nút Đóng */}
                            <Button
                                variant="outline-danger"
                                onClick={() => setIsAddModalOpen(false)}
                            >
                                Đóng
                            </Button>
                            {/* Nút Lưu */}
                            <Button
                                className="btn btn-custom"
                                type="submit"
                            >
                                Lưu
                            </Button>
                        </div>
                    </form>
                </Modal>
            )}

            {isDeleteModalOpen && (
                <Modal
                    isOpen={isDeleteModalOpen}
                    onRequestClose={() => setIsDeleteModalOpen(false)}
                    contentLabel="Delete Confirmation"
                    className="bg-white rounded-lg max-w-md mx-auto mt-4 p-6 shadow-lg focus:outline-none"
                >
                    <h2 className='text-center'>Thông báo</h2>
                    <p>Bạn có chắc chắn muốn xóa những nhân viên này?</p>
                    <div className="modal-actions flex justify-evenly items-center">
                        <Button variant="danger" onClick={handleDelete}>Xóa</Button>
                        <Button className="btn btn-custom" onClick={() => setIsDeleteModalOpen(false)}>Quay lại</Button>
                    </div>
                </Modal>
            )}
        </div>
    );
};
