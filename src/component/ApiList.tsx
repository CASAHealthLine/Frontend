import React, { useEffect, useState } from 'react';
import '../index.css';
import { Plus, SearchIcon, SlidersHorizontalIcon, Trash2 } from 'lucide-react';
import api from '../api';
import { Box, Drawer } from '@mui/material';

type ApiListProps<T> = {
    title: string;
    columns: string[]; // Array of column identifiers
    displayColumns?: string[]; // Optional array of display names corresponding to columns
    filters?: T[]
    showPlusButton?: boolean; // Toggle for Plus button
    onPlusClick?: () => void; // Callback for Plus button
    showTrashButton?: boolean; // Toggle for Trash button
    onTrashClick?: () => void; // Callback for Trash button
    enableRowSelection?: boolean; // Enable row selection with checkboxes
    selectedRows?: number[]; // Array of selected row IDs
    onRowSelect?: (id: number) => void; // Callback for row selection
    onRowClick?: (item: T) => void;
    apiEndpoint: string; // API endpoint for fetching data
};

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

export const ApiList = <T extends Record<string, any>>({
    title,
    columns,
    displayColumns = [],
    showPlusButton = false,
    onPlusClick,
    showTrashButton = false,
    onTrashClick,
    enableRowSelection = false,
    selectedRows = [],
    onRowSelect,
    onRowClick,
    apiEndpoint,
}: ApiListProps<T>) => {
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const [searchParams, setSearchParams] = useState<{ [key: string]: string }>({});
    const [data, setData] = useState<T[]>([]);
    const debouncedFilters = useDebounce(searchParams, 500);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(apiEndpoint);
                const data = response.data;
                setData(data);
                console.log(data);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryParams = new URLSearchParams(debouncedFilters).toString();
                const response = await api.get(`${apiEndpoint}?${queryParams}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [debouncedFilters]);

    const toggleDrawer = (newOpen: boolean) => () => {
        setFilterDrawerOpen(newOpen);
    };

    const DrawnerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        </Box>
    );

    return (
        <div className="flex flex-col pt-5">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4 pl-[5.5%]">{title}</h1>
                <div className="flex items-center gap-2 pr-[5.5%]">
                    {showPlusButton && onPlusClick && (
                        <Plus className="cursor-pointer" onClick={onPlusClick} />
                    )}
                    {showTrashButton && onTrashClick && (
                        <Trash2 className="cursor-pointer" onClick={onTrashClick} />
                    )}
                    <div className="flex flex-row items-center gap-2 border-2 border-gray-400 rounded-2xl px-2.5 py-1 text-gray-400">
                        <SearchIcon />
                        <input
                            type="text"
                            className="border-none focus:ring-0 focus:outline-none"
                            placeholder="Tìm kiếm..."
                            value={searchParams.search}
                            onChange={(e) => setSearchParams({ search: e.target.value })}
                        />
                        <SlidersHorizontalIcon className="cursor-pointer" onClick={toggleDrawer(true)} />
                    </div>
                </div>
            </div>

            <div className="flex justify-center w-full">
                <table className="w-[90%]">
                    <thead className="table-dark">
                        <tr>
                            {enableRowSelection && (
                                <th
                                    className="px-4 py-2 border-white border-8 text-center align-middle"
                                    style={{ height: "auto" }} // Đảm bảo chiều cao tự động khớp
                                ></th>
                            )}
                            {columns.map((col, index) => (
                                <th
                                    key={col}
                                    className="px-4 py-2 border-white border-8 text-center align-middle"
                                >
                                    {displayColumns[index] || col}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data?.results?.map((item, index) => (
                            <tr
                                key={index}
                                onClick={() => onRowClick?.(item)} // Gọi hàm onRowClick nếu được cung cấp
                                style={{ cursor: "pointer" }}
                            >
                                {enableRowSelection && (
                                    <td className="flex justify-center items-center">
                                        <input
                                            type="checkbox"
                                            className="w-6 h-6 border-2 border-gray-500 rounded"
                                            checked={selectedRows.includes(item.id)}
                                            onChange={() => onRowSelect?.(item.id)}
                                            onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện click hàng
                                        />
                                    </td>
                                )}
                                {columns.map((col) => (
                                    <td key={col} className="px-4 py-2 text-center">
                                        {item[col]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Drawer open={filterDrawerOpen} onClose={toggleDrawer(false)} anchor='right'>
                {DrawnerList}
            </Drawer>
        </div>
    );
};
