import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import '../index.css';

type Patient = {
    id: number;
    name: string;
    gender: string;
    birthday: string;
    address: string;
    bhyt: string;
    cccd: string;
    job: string;
    phone: string;
    account_id: number;
    created_at: string;
    email: string;
    description: string;
};

interface AddPatientModalProps {
    show: boolean;
    onClose: () => void;
    onSave: (patient: Patient) => void;
    patientData: Patient[];
}

const formatToDDMMYYYY = (isoDate) => {
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
};

const formatToISO = (ddmmyyyy) => {
    const [day, month, year] = ddmmyyyy.split("/");
    return `${year}-${month}-${day}`;
};

export const AddPatientModal: React.FC<AddPatientModalProps> = ({ show, onClose, onSave, patientData }) => {
    const [step, setStep] = useState(1); // Quản lý bước của modal
    const [newPatient, setNewPatient] = useState<Partial<Patient>>({
        name: "",
        gender: "",
        birthday: "",
        address: "",
        bhyt: "",
        cccd: "",
        job: "",
        phone: "",
        created_at: "",
        email: "",
        description: "",
    });

    const handleAddPatient = () => {
        const newId = patientData.length > 0 ? Math.max(...patientData.map(s => s.id)) + 1 : 1;
        const addedPatient = { ...newPatient, id: newId } as Patient;

        onSave(addedPatient); // Gọi hàm onSave để cập nhật danh sách bên ngoài

        setStep(1); // Reset về bước 1
        setNewPatient({ // Reset dữ liệu bệnh nhân mới
            name: "",
            gender: "",
            birthday: "",
            address: "",
            bhyt: "",
            cccd: "",
            job: "",
            phone: "",
            created_at: "",
            email: "",
            description: "",
        });
    };

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePrevStep = () => setStep(step - 1);

    return (
        <div>
            <Modal show={show} onHide={onClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="flex items-center space-x-4 items-center">
                            <div className="flex items-center space-x-2">
                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-full ${step > 1 ? "bg-green-500 text-white" : "bg-blue-500 text-white"}`}
                                >
                                    {step > 1 ? "✔" : "1"}
                                </div>
                                <span
                                    className={`text-sm ${step >= 1 ? "text-black font-medium" : "text-gray-500"}`}
                                >
                                    Hồ sơ
                                </span>
                            </div>
                            <div className="w-8 h-1 bg-gray-300"></div>
                            <div className="flex items-center space-x-2">
                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-full ${step === 2 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
                                >
                                    2
                                </div>
                                <span
                                    className={`text-sm ${step === 2 ? "text-black font-medium" : "text-gray-500"}`}
                                >
                                    Mô tả
                                </span>
                            </div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {step === 1 && (
                        <form>
                            <div className="flex items-center gap-4">
                                <label className="font-semibold w-32 text-left">Họ tên:</label>
                                <input
                                    type="text"
                                    className="border px-3 py-2 rounded flex-1"
                                    value={newPatient.name}
                                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <label className="font-semibold w-32 text-left">Giới tính:</label>
                                <select
                                    className="border px-3 py-2 rounded flex-1"
                                    value={newPatient.gender}
                                    onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                                    required
                                >
                                    <option value="">Chọn</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <label className="font-semibold w-32 text-left">Ngày sinh:</label>
                                <input
                                    type="date"
                                    className="border px-3 py-2 rounded flex-1"
                                    value={newPatient.birthday ? formatToISO(newPatient.birthday) : ""}
                                    onChange={(e) => setNewPatient({ ...newPatient, birthday: formatToDDMMYYYY(e.target.value) })}
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <label className="font-semibold w-32 text-left">Địa chỉ:</label>
                                <input
                                    type="text"
                                    className="border px-3 py-2 rounded flex-1"
                                    value={newPatient.address}
                                    onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <label className="font-semibold w-32 text-left">BHYT:</label>
                                <input
                                    type="text"
                                    className="border px-3 py-2 rounded flex-1"
                                    value={newPatient.bhyt}
                                    onChange={(e) => setNewPatient({ ...newPatient, bhyt: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <label className="font-semibold w-32 text-left">CCCD:</label>
                                <input
                                    type="text"
                                    className="border px-3 py-2 rounded flex-1"
                                    value={newPatient.cccd}
                                    onChange={(e) => setNewPatient({ ...newPatient, cccd: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <label className="font-semibold w-32 text-left">Nghề nghiệp:</label>
                                <input
                                    type="text"
                                    className="border px-3 py-2 rounded flex-1"
                                    value={newPatient.job}
                                    onChange={(e) => setNewPatient({ ...newPatient, job: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <label className="font-semibold w-32 text-left">Sđt:</label>
                                <input
                                    type="text"
                                    className="border px-3 py-2 rounded flex-1"
                                    value={newPatient.phone}
                                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <label className="font-semibold w-32 text-left">Email:</label>
                                <input
                                    type="email"
                                    className="border px-3 py-2 rounded flex-1"
                                    value={newPatient.email}
                                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                                />
                            </div>
                        </form>
                    )}
                    {step === 2 && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAddPatient();
                            }}
                        >
                            <div className="form-group">
                                <label className="block font-semibold w-32">Mô tả</label>
                                <textarea
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-y"
                                    rows={3}
                                    value={newPatient.description}
                                    onChange={(e) => setNewPatient({ ...newPatient, description: e.target.value })}
                                />
                            </div>
                        </form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {step > 1 && (
                        <Button variant="outline-danger" onClick={handlePrevStep}>
                            Quay lại
                        </Button>
                    )}
                    {step < 2 ? (
                        <Button className="btn btn-custom" type="submit" onClick={handleNextStep}>
                            Tiếp
                        </Button>
                    ) : (
                        <Button className="btn btn-custom" onClick={() => {
                            handleAddPatient();
                            onClose();
                        }}>
                            Lưu
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
};
