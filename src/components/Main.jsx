import { useState } from 'react';
import subsData from '../data/subscriberData.json';
import { Button, Group, Modal, Select, Text, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import SubscriberTable from './subscriberTable';
import '../styles/Main.scss';

const Main = () => {
    const [ msidN, setMsidn ] = useState('');
    const [ searchedUser, setSearchedUser ] = useState(null);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ filterTier, setFilterTier ] = useState('');
    const [ error, setError ] = useState('');

    const tiers = [...new Set(subsData.subscribers.map(sub => sub.tier))];

    const validateAndSearch = () => {
        setError('');
        setSearchedUser(null);

        if (!/^\d{10}$/.test(msidN)) {
            setError('Phone number should be 10 digits');
            return;
        }

        const sub = subsData.subscribers.find(sub => sub.msidn === msidN);
        if (sub) {
            setSearchedUser(sub);
            setIsModalOpen(true);
        } else {
            setError('No user found with this number');
        }
    };

    return(
        <div className="mainContainer">
            <div className='input-search-filter'>
                <Group>
                    <TextInput
                    size="md"
                    radius="md" 
                    placeholder="Enter phone number"
                    value={msidN}
                    onChange={(e) => setMsidn(e.target.value)}
                    error={error}
                    styles={{
                        root: {
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative'
                        },
                        wrapper: {
                            margin: 0
                        },
                        error: {
                            position: 'absolute',
                            bottom: '-20px'
                        }
                    }}
                    />

                    <Button 
                    variant="filled" 
                    color="rgba(0, 0, 0, 1)" 
                    size="md" 
                    radius="xl"
                    onClick={validateAndSearch}
                    rightSection={<IconSearch size={25} stroke={2}/>}
                    >
                        Search
                    </Button>
                </Group>

                <Select 
                placeholder='Filter by tier'
                size='md'
                radius='md'
                value={filterTier}
                onChange={setFilterTier}
                data={[
                    { value: '', label: 'All Tiers' },
                    ...tiers.map(tier => ({ value: tier, label: tier }))
                ]}
                />
            </div>

            <SubscriberTable 
            data={subsData.subscribers}
            filterTier={filterTier}
            />
            
            <Modal
            opened={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Subscriber Details"
            size="md"
            withCloseButton={true}
            centered
            styles={{
                title: {
                    fontWeight: 500,
                    fontSize: '1.5rem'
                },
                body: {
                    padding: '1rem',
                    fontSize: '1.1rem'
                }
            }}
            >
                {searchedUser && (
                    <div>
                        <Text size='lg'><b>Phone Number:</b> {searchedUser.msidn}</Text>
                        <Text size='lg'> <b>Name:</b> {searchedUser.firstName} {searchedUser.lastName}</Text>
                        <Text size='lg'> <b>Tier:</b> {searchedUser.tier}</Text>
                        <Text size='lg'> <b>Points:</b> {searchedUser.points}</Text>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Main;