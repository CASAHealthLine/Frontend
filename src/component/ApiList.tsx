import React, { useEffect, useState } from 'react';
import '../index.css';
import { Plus, SearchIcon, SlidersHorizontalIcon, Trash2 } from 'lucide-react';
import api from '../api';
import { Box, Drawer, FormControlLabel, Checkbox } from '@mui/material';

type ApiListProps<T> = {
    title: string;
    columns: string[];
    displayColumns?: string[];
    filters?: T[];
    showPlusButton?: boolean;
    onPlusClick?: () => void;
    showTrashButton?: boolean;
    onTrashClick?: () => void;
    enableRowSelection?: boolean;
    selectedRows?: number[];
    onRowSelect?: (id: number) => void;
    onRowClick?: (item: T) => void;
    apiEndpoint: string;
};

type FilterOption = {
    label: string;
    value: string;
};

type Filter = {
    field: string;
    label: string;
    options: FilterOption[];
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
    const [filters, setFilters] = useState<Filter[]>([]);
    const debouncedFilters = useDebounce(searchParams, 500);


    // Fetch API data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(apiEndpoint);
                const data = response.data;
                setData(data);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        fetchData();
    }, []);

    // Fetch filtered API data
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

    // Fetch filter data
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const response = await fetch('/data/queue_filters.json');

                // Kiểm tra xem response có thành công không
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json(); // Parse dữ liệu JSON
                console.log('API response:', data);
                setFilters(data); // Cập nhật state filters với dữ liệu
            } catch (error) {
                console.error('Error fetching filters:', error);
            }
        };

        fetchFilters();
    }, []);


    const toggleDrawer = (newOpen: boolean) => () => {
        setFilterDrawerOpen(newOpen);
    };

    const handleFilterChange = (field: string, value: string) => {
        setSearchParams((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const DrawnerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <h1 className="text-center text-2xl font-bold pt-1">Bộ lọc tìm kiếm</h1>
            {filters.map((filter) => (
                <div key={filter.field} className="mb-4 pl-2">
                    <h3 className="font-semibold text-lg pt-2">{filter.label}</h3>
                    <div className='flex flex-col pl-2'>
                        {filter.options.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                control={
                                    <Checkbox
                                        checked={searchParams[filter.field] === option.value}
                                        className="w-2 h-2 border-2 border-gray-500 rounded"
                                        onChange={(e) =>
                                            handleFilterChange(filter.field, e.target.checked ? option.value : null)
                                        }
                                    />
                                }
                                label={
                                    <span className="ml-2 text-gray-700">
                                        {option.label}
                                    </span>
                                }
                            />
                        ))}
                    </div>
                </div>
            ))}
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
                            onChange={(e) =>
                                setSearchParams((prev) => ({ ...prev, search: e.target.value }))
                            }
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
                                <th className="px-4 py-2 border-white border-8 text-center align-middle"></th>
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
                                onClick={() => onRowClick?.(item)}
                                style={{ cursor: 'pointer' }}
                            >
                                {enableRowSelection && (
                                    <td className="flex justify-center items-center">
                                        <input
                                            type="checkbox"
                                            className="w-6 h-6 border-2 border-gray-500 rounded"
                                            checked={selectedRows.includes(item.id)}
                                            onChange={() => onRowSelect?.(item.id)}
                                            onClick={(e) => e.stopPropagation()}
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
            <Drawer open={filterDrawerOpen} onClose={toggleDrawer(false)} anchor="right">
                {DrawnerList}
            </Drawer>
        </div>
    );
};
