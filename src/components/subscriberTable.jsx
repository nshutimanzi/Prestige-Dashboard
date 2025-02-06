import { Table, Pagination } from '@mantine/core';
import '../styles/SubscriberTable.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';

const SubscriberTable = ({ data, filterTier }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const getFilteredData = () => {
        let filteredData = [...data];
        
        if (filterTier) {
            filteredData = filteredData.filter(item => item.tier === filterTier);
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData.slice(startIndex, endIndex);
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <div className="table">
            <Table highlightOnHover> 
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Phone number</Table.Th>
                        <Table.Th>First name</Table.Th>
                        <Table.Th>Last name</Table.Th>
                        <Table.Th>Tier</Table.Th>
                        <Table.Th>Points</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {getFilteredData().map((sub, index) => (
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

SubscriberTable.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            msidn: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            tier: PropTypes.string.isRequired,
            points: PropTypes.string.isRequired,
        })
    ).isRequired,
    filterTier: PropTypes.string,
};

export default SubscriberTable;