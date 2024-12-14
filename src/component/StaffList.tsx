import React, { useEffect, useState } from 'react';
import Modal from "react-modal";
import { Plus, Trash2 } from 'lucide-react'; // Thư viện react-lucide
import Button from 'react-bootstrap/Button';
Modal.setAppElement("#root");
import specialties from '../data/specialties.json';
import { List } from './List';
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
        const newId = staffData.length > 0 ? Math.max(...staffData.map(s => s.id)) + 1 : 1;
        const addedStaff = { ...newStaff, id: newId } as Staff;

        setStaffData([...staffData, addedStaff]);
        setIsAddModalOpen(false);
    };

    const handleRowSelect = (id: number) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const handleRowClick = (staff: Staff) => {
        setSelectedStaff(staff);
        setIsModalOpen(true);
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
            <List
                title="Danh sách nhân viên"
                columns={["id", "name", "gender", "birthday", "specialty"]}
                displayColumns={["ID", "Họ tên", "Giới tính", "Ngày sinh", "Chuyên ngành"]}
                data={staffData}
                filters={["id", "name", "gender", "birthday", "specialty"]}
                showPlusButton
                onPlusClick={() => setIsAddModalOpen(true)}
                showTrashButton
                onTrashClick={() => setIsDeleteModalOpen(true)}
                enableRowSelection
                selectedRows={selectedRows}
                onRowSelect={handleRowSelect}
                onRowClick={handleRowClick}
            />
            {selectedStaff && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    className="bg-white rounded-lg max-w-md mx-auto mt-20 p-6 shadow-lg focus:outline-none"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                >
                    <h2 className="text-center">Thông tin chi tiết</h2>
                    <p>Tên : {selectedStaff.name}</p>
                    <p>Email : {selectedStaff.email}</p>
                    <p>Số điện thoại : {selectedStaff.phone}</p>
                    <p>Địa chỉ : {selectedStaff.address}</p>
                    <p>Ngày sinh : {selectedStaff.birthday}</p>
                    <p>Chuyên ngành : {selectedStaff.specialty}</p>
                    <p>Ngày làm việc : {selectedStaff.employment_date}</p>
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
