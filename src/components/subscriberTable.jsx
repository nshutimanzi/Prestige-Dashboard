import { Table, UnstyledButton, Group, Pagination } from '@mantine/core';
import { IconChevronUp, IconChevronDown, IconSelector } from '@tabler/icons-react';
import '../styles/SubscriberTable.scss';
import { useState } from 'react';

const SubscriberTable = ({ data, filterTier, sortConfig, setSortConfig }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const getSortedData = () => {
        let sortedData = [...data];
        
        if (filterTier) {
            sortedData = sortedData.filter(item => item.tier === filterTier);
        }

        if (sortConfig.key) {
            sortedData.sort((a, b) => {
                if (sortConfig.key === 'points') {
                    return sortConfig.direction === 'asc' 
                        ? Number(a[sortConfig.key]) - Number(b[sortConfig.key])
                        : Number(b[sortConfig.key]) - Number(a[sortConfig.key]);
                }
                
                return sortConfig.direction === 'asc'
                    ? a[sortConfig.key].localeCompare(b[sortConfig.key])
                    : b[sortConfig.key].localeCompare(a[sortConfig.key]);
            });
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedData.slice(startIndex, endIndex);
    };

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const SortHeader = ({ label, sortKey }) => {
        const isActive = sortConfig.key === sortKey;
        const Icon = isActive 
            ? sortConfig.direction === 'asc' 
                ? IconChevronUp 
                : IconChevronDown
            : IconSelector;

        return (
            <UnstyledButton onClick={() => requestSort(sortKey)} className="sort-button">
                <Group position="apart">
                    <span>{label}</span>
                    <Icon size={14} stroke={1.5} />
                </Group>
            </UnstyledButton>
        );
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <div className="table">
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Phone number</Table.Th>
                        <Table.Th><SortHeader label="First name" sortKey="firstName" /></Table.Th>
                        <Table.Th><SortHeader label="Last name" sortKey="lastName" /></Table.Th>
                        <Table.Th><SortHeader label="Tier" sortKey="tier" /></Table.Th>
                        <Table.Th><SortHeader label="Points" sortKey="points" /></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {getSortedData().map((sub, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>{sub.msidn}</Table.Td>
                            <Table.Td>{sub.firstName}</Table.Td>
                            <Table.Td>{sub.lastName}</Table.Td>
                            <Table.Td>{sub.tier}</Table.Td>
                            <Table.Td>{sub.points}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
            <div>
                <Pagination
                className='pagination'
                total={totalPages}
                value={currentPage}
                onChange={setCurrentPage}
                color='black'
                radius="md"
                mt="lg"
                />
            </div>
        </div>
    );
};

export default SubscriberTable;