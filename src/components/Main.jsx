import { useCallback, useState } from 'react';
import subsData from '../data/subscriberData.json';
import { Button, Group, LoadingOverlay, Select, Stack, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import SubscriberTable from './subscriberTable';
import '../styles/Main.scss';
import SubscriberModal from './subscriberModal';

const Main = () => {
    const [ msidN, setMsidn ] = useState('');
    const [ searchedUser, setSearchedUser ] = useState(null);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ filterTier, setFilterTier ] = useState('');
    const [ error, setError ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    const tiers = [...new Set(subsData.subscribers.map(sub => sub.tier))];

    const validateAndSearch = useCallback(() => {
        setError('');
        setSearchedUser(null);
        setIsLoading(true);

        setTimeout(() => {
            if (!/^\d{10}$/.test(msidN)) {
                setError('Phone number should be 10 digits');
                setIsLoading(false);
                return;
            }

            const sub = subsData.subscribers.find(sub => sub.msidn === msidN);
            if (sub) {
                setSearchedUser(sub);
                setIsModalOpen(true);
            } else {
                setError('No user found with this number');
            }
            setIsLoading(false);
        }, 500);
    }, [msidN]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            validateAndSearch();
        }
    }

    return(
        <div className="mainContainer">
            <LoadingOverlay 
            visible={isLoading} 
            overlayProps={{ radius: 'md', blur: 2 }} 
            loaderProps={{ color: 'yellow', type: 'bars' }} />

            <Stack style={{ width: '100%', maxWidth: '1200px'}}>
                <Group justify='space-between' className='input-search-filter'>
                    <Group>
                        <TextInput
                        size="md"
                        radius="md" 
                        placeholder="Enter phone number"
                        value={msidN}
                        onChange={(e) => setMsidn(e.target.value)}
                        onKeyPress={handleKeyPress}
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
                            input: {
                                '&:focus': {
                                    borderColor: 'ffcb05'
                                }
                            },
                            error: {
                                position: 'absolute',
                                bottom: '-20px'
                            }
                        }}
                        />

                        <Button 
                        variant="filled" 
                        styles={{
                            root: {
                                backgroundColor: '#000000',
                                color: '#ffcb05',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor:'#1b1b1b'
                                }
                            }
                        }}
                        size="md" 
                        radius="xl"
                        onClick={validateAndSearch}
                        loading={isLoading}
                        rightSection={<IconSearch size={25} stroke={2.5}/>}
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
                        styles={{
                            input: {
                                minWidth: '200px'
                            }
                        }}
                    />
                </Group>

                <SubscriberTable 
                data={subsData.subscribers}
                filterTier={filterTier}
                />
            </Stack>
            
            <SubscriberModal
            opened={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            subscriber={searchedUser}      
            />
        </div>
    );
};

export default Main;