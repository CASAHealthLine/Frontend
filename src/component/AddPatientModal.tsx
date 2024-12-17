import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import '../index.css';
import { Box, Button, Step, StepConnector, stepConnectorClasses, StepIconProps, StepLabel, Stepper, styled } from '@mui/material';
import { CheckIcon, ClipboardListIcon, ShieldCheckIcon, StethoscopeIcon, XIcon } from 'lucide-react';
import { LoadingButton, TabContext, TabPanel } from '@mui/lab';
import { Form, Row } from 'react-bootstrap';
import api from '../api';

type Patient = {
    id: number;
    full_name: string;
    gender: string;
    birth_date: string;
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
    cccd: string;
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 20,
      marginLeft: 10,
      marginRight: 10,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: 'var(--primary-bg-color)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: 'var(--primary-bg-color)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean, error?: boolean };
}>(({ theme }) => ({
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    variants: [
      {
        props: ({ ownerState }) => ownerState.active,
        style: {
            backgroundColor: 'var(--secondary-bg-color)',
        },
      },
      {
        props: ({ ownerState }) => ownerState.completed,
        style: {
            backgroundColor: theme.palette.primary.main,
        },
      },
      {
        props: ({ ownerState }) => ownerState.error,
        style: {
            backgroundColor: theme.palette.error.main,
        },
      }
    ],
}));

interface PatientInfoFormProps {
    patient: Partial<Patient>;
    onChange: (key: string, value: string) => void;
    onValidChange: (isValid: boolean) => void;
}

function changeDateToISO(date: string | undefined) {
    if (!date) return "";
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
}

function changeISOToDate(date: string | undefined) {
    if (!date) return "";
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
}

const PatientInfoForm: React.FC<PatientInfoFormProps> = ({ patient, onChange, onValidChange }) => {
    const formRef = React.createRef<HTMLFormElement>();
    const [isValid, setIsValid] = useState(false);

    const handleInputChange = () => {
        if (formRef.current) {
            setIsValid(formRef.current.checkValidity());
        }
    };

    useEffect(() => {
        setIsValid(formRef.current?.checkValidity() || false);
    }, [patient]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Form submitted successfully!");
    };

    useEffect(() => {
        if (onValidChange) {
            onValidChange(isValid);
        }
    }, [isValid]);

    const today = new Date().toLocaleDateString('en-CA');

    return (
        <div className="flex flex-col max-h-96 overflow-y-auto overflow-x-hidden p-4">
            <Form ref={formRef} onSubmit={handleSubmit} onChange={handleInputChange}>
                <Form.Group className="mb-3" controlId="cccd">
                    <Form.Label>Số CMND/CCCD (*)</Form.Label>
                    <Form.Control type="text" placeholder="Nhập số CCCD" value={patient.cccd} onChange={(e) => onChange("cccd", e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Họ và tên (*)</Form.Label>
                    <Form.Control type="text" placeholder="Nhập họ tên" value={patient.full_name} onChange={(e) => onChange("full_name", e.target.value)} required />
                </Form.Group>
                <Row xs={1} md={2}>
                <Form.Group className="mb-3" controlId="gender">
                    <Form.Label>Giới tính (*)</Form.Label>
                    <Form.Select value={patient.gender} onChange={(e) => onChange("gender", e.target.value)} required >
                        <option value="" disabled hidden>Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="birthday">
                    <Form.Label>Ngày sinh (*)</Form.Label>
                    <Form.Control type="date" value={patient.birth_date} onChange={(e) => onChange("birth_date", e.target.value)} required max={today} />
                </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="bhyt">
                    <Form.Label>Số BHYT</Form.Label>
                    <Form.Control type="text" placeholder="Nhập số BHYT" value={patient.bhyt} onChange={(e) => onChange("bhyt", e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control type="text" placeholder="Nhập địa chỉ" value={patient.address} onChange={(e) => onChange("address", e.target.value)} />
                </Form.Group>
            </Form>
        </div>
    )
}

interface Treatment {
    room_id: number | string;
    symptom: string;
}

interface TreatmentFormProps {
    treatment: Treatment;
    onChange: (key: string, value: string) => void;
    onValidChange?: (isValid: boolean) => void;
}

const TreatmentForm: React.FC<TreatmentFormProps> = ({ treatment, onChange, onValidChange }) => {
    type Room = {
        id: number;
        displayname: string;
        description: string;
    };
    
    const [rooms, setRooms] = useState<Room[]>([]);
    const [isValid, setIsValid] = useState(false);
    const formRef = React.createRef<HTMLFormElement>();

    const handleInputChange = () => {
        if (formRef.current) {
            setIsValid(formRef.current.checkValidity());
        }
    };

    useEffect(() => {
        setIsValid(formRef.current?.checkValidity() || false);
    }, [rooms]);

    useEffect(() => {
        if (onValidChange) {
            onValidChange(isValid);
        }
    }, [isValid]);

    useEffect(() => {
        api.get('/room/list/')
            .then((response) => {
                setRooms(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="flex flex-col max-h-96 overflow-y-auto overflow-x-hidden p-4">
            <Form ref={formRef} onChange={handleInputChange}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Phòng khám</Form.Label>
                    <Form.Select value={treatment.room_id} onChange={(e) => onChange("room_id", e.target.value)} required>
                        <option value="" disabled hidden>Chọn phòng khám</option>
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>{room.displayname}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Triệu chứng</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Nhập triệu chứng" value={treatment.symptom} onChange={(e) => onChange("symptom", e.target.value)} />
                </Form.Group>
            </Form>
        </div>
    )
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({ show, onClose, cccd }) => {
    const [step, setStep] = useState(0); 
    const [nextEnabled, setNextEnabled] = useState(false); 
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    useEffect(() => {
        if (status === 'loading') {
            return;
        }
        setStep(0);
        setNextEnabled(false);
        setPatient({});
        setNewTreatment({ room_id: "", symptom: "" });
        setStatus('idle');
    }, [show]);

    useEffect(() => {
        setStatus('idle');
    }, [step]);

    const [patient, setPatient] = useState<Partial<Patient>>({
        full_name: "",
        gender: "",
        birth_date: "",
    });

    const [newTreatment, setNewTreatment] = useState<Treatment>({
        room_id: "",
        symptom: "",
    });

    useEffect(() => {
        if (!patient.cccd) {
            return;
        }
        
        const delayDebounceFn = setTimeout(() => {
            api.get(`patient/cccd/${patient.cccd}/`)
            .then((response) => {
                const data = response.data;
                setPatient(data);
            }).catch((error) => {
            });
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [patient.cccd]);

    const handleNext = () => {
        setStep(step + 1);
    };
    
    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = () => {
        setStatus('loading');
        api.post('patient/treatment/add/', {
            'patient': patient,
            'treatment': newTreatment,
        }).then((response) => {
            const data = response.data;
            setStatus('success');
            handleNext();
            setTimeout(() => {
                onClose();
            }, 1000);
        }).catch((error) => {
            setStatus('error');
            alert(`Có lỗi xảy ra khi thêm bệnh nhân vào hàng đợi\n${error.response.data.error}`);
        });
    }

    const steps = ['Hồ sơ bệnh nhân', 'Đăng ký khám', 'Hoàn tất'];

    function ColorlibStepIcon(props: StepIconProps & { loading?: boolean }) {
        const { active, completed, error, loading, className } = props;
      
        const icons: { [index: string]: React.ReactElement<unknown> } = {
          1: <ClipboardListIcon />,
          2: <StethoscopeIcon />,
          3: <ShieldCheckIcon />,
        };
      
        return (
          <ColorlibStepIconRoot ownerState={{ completed, active, error }} className={className}>
            {completed && <CheckIcon />}
            {error && <XIcon />}
            {!completed && !error && !loading && icons[String(props.icon)]}
            {loading && <LoadingButton loading />}
          </ColorlibStepIconRoot>
        );
    }

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    Thêm bệnh nhân vào hàng đợi
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stepper alternativeLabel activeStep={step} connector={<ColorlibConnector />}>
                    {steps.map((label, index) => {
                        const labelProps: {
                            optional?: React.ReactNode;
                            error?: boolean;
                            loading?: boolean;
                        } = {};

                        if (index === step) {
                            switch (status) {
                                case 'loading':
                                    labelProps.loading = true;
                                    break;
                                case 'success':
                                    break;
                                case 'error':
                                    labelProps.error = true;
                                    break;
                                default:
                                    break;
                            }
                        }

                        return (<Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon} {...labelProps}>
                                {label}
                            </StepLabel>
                        </Step>)
                    })}
                </Stepper>
                <TabContext value={step}>
                    <TabPanel value={0}>
                        <PatientInfoForm patient={patient} onChange={(key, value) => setPatient({ ...patient, [key]: value })} onValidChange={setNextEnabled} />
                    </TabPanel>
                    <TabPanel value={1}>
                        <TreatmentForm treatment={newTreatment} onChange={(key, value) => setNewTreatment({ ...newTreatment, [key]: value })} onValidChange={setNextEnabled} />
                    </TabPanel>
                    <TabPanel value={2}>
                        <div className="flex flex-col max-h-96 overflow-y-auto overflow-x-hidden p-4">
                            <h1 className="text-2xl font-bold">Thông tin bệnh nhân</h1>
                            <p className="text-lg">Họ và tên: {patient.full_name}</p>
                            <p className="text-lg">Giới tính: {patient.gender}</p>
                            <p className="text-lg">Địa chỉ: {patient.address}</p>
                            <p className="text-lg">Số CCCD: {patient.cccd}</p>
                            <p className="text-lg">Số BHYT: {patient.bhyt}</p>
                            <p className="text-lg">Triệu chứng: {newTreatment.symptom}</p>
                        </div>
                    </TabPanel>
                </TabContext>
            </Modal.Body>
            <Modal.Footer>
                {step < steps.length &&
                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1 }}>
                    <Button
                        color="inherit"
                        onClick={step === 0 ? onClose : handleBack}
                    >
                        {step === 0 ? 'Hủy' : 'Quay lại'}
                    </Button>
                    <Button 
                        className='rounded'
                        onClick={step === steps.length - 1 ? handleSubmit : handleNext}
                        disabled={!nextEnabled}
                        variant="contained"
                        disableElevation
                        color="primary"
                    >
                        {step === steps.length - 1 ? 'Hoàn tất' : 'Tiếp theo'}
                    </Button>
                </Box>}
            </Modal.Footer>
        </Modal>
    );
};
