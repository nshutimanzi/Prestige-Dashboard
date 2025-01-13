import { /* ActionIcon, */ Group, Text /* useMantineColorScheme */ } from '@mantine/core';
import Logo from '../assets/MTN.JO-d1d53d13.png';
import '../styles/Header.scss';
// import { IconMoonStars, IconSun } from '@tabler/icons-react';

const Header = () => {
    /* const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark'; */
    return (
        <div className="header">
            <Group justify='space-between'>
                <div className="header-content">
                    <img 
                    src={Logo} 
                    alt="MtnLogo" 
                    width="100px"/>
                
                    <Text size='xl'className='dashboard-title'>Prestige Dashboard</Text>
                </div>

                {/* <div className="theme-toggle">
                    <ActionIcon
                    variant="outline"
                    color={dark ? 'yellow' : 'blue'}
                    onClick={() => toggleColorScheme()}
                    title="Toggle color scheme"
                    >
                        {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
                    </ActionIcon>
                </div> */}
            </Group>
        </div>
    );
};

export default Header;