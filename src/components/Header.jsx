import { Group, Text  } from '@mantine/core';
import Logo from '../assets/MTN.JO-d1d53d13.png';
import '../styles/Header.scss';

const Header = () => {
    return (
        <div className="header">
            <Group justify='space-between'>
                <div className="header-content">
                    <img 
                    src={Logo} 
                    alt="MtnLogo" 
                    width="100px"/>
                
                    <Text size='xl' className='dashboard-title'>Prestige Dashboard</Text>
                </div>
            </Group>
        </div>
    );
};

export default Header;