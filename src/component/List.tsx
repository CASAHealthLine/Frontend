// Updated List.tsx
import React, { useEffect, useState } from 'react';
import '../index.css';
import { useSearchParams } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';

type ListProps<T> = {
    title: string;
    columns: string[]; // Array of column identifiers
    displayColumns?: string[]; // Optional array of display names corresponding to columns
    data: T[];
    filters?: string[];
    showPlusButton?: boolean; // Toggle for Plus button
    onPlusClick?: () => void; // Callback for Plus button
    showTrashButton?: boolean; // Toggle for Trash button
    onTrashClick?: () => void; // Callback for Trash button
    enableRowSelection?: boolean; // Enable row selection with checkboxes
    selectedRows?: number[]; // Array of selected row IDs
    onRowSelect?: (id: number) => void; // Callback for row selection
    onRowClick?: (item: T) => void;
};

export const List = <T extends Record<string, any>>({
    title,
    columns,
    displayColumns = [],
    data,
    filters = [],
    showPlusButton = false,
    onPlusClick,
    showTrashButton = false,
    onTrashClick,
    enableRowSelection = false,
    selectedRows = [],
    onRowSelect,
    onRowClick,
}: ListProps<T>) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchField, setSearchField] = useState<string>(filters[0] || columns[0]);

    useEffect(() => {
        const paramField = searchParams.get('field');
        const paramTerm = searchParams.get('term');

        if (paramField && filters.includes(paramField)) {
            setSearchField(paramField);
        }
        if (paramTerm) {
            setSearchTerm(paramTerm);
        }
    }, [searchParams, filters]);

    const filteredData = data.filter((item) => {
        const value = item[searchField as keyof T];
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleSearchChange = (field: string, term: string) => {
        setSearchParams({ field, term });
        setSearchField(field);
        setSearchTerm(term);
    };

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
                    {filters.length > 0 && (
                        <select
                            className="border rounded px-2 py-1"
                            value={searchField}
                            onChange={(e) => handleSearchChange(e.target.value, searchTerm)}
                        >
                            {filters.map((filter) => (
                                <option key={filter} value={filter}>
                                    {columns.includes(filter) 
                                        ? displayColumns[columns.indexOf(filter)] || filter
                                        : filter}
                                </option>
                            ))}
                        </select>
                    )}
                    <input
                        type="text"
                        className="border rounded px-2 py-1"
                        placeholder={`Tìm kiếm theo ${searchField}`}
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(searchField, e.target.value)}
                    />
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
                        {filteredData.map((item) => (
                            <tr
                                key={item.id}
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
        </div>
    );
};
