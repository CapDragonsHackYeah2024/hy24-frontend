import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
// import { useNavigate } from 'react-router-dom';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

export default function Navbar({tabs}) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => (event) => {
        setOpen(newOpen);
    };
    // const navigate = useNavigate();


    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={(event) => toggleDrawer(false)}>
            <List>
                {tabs.map((tab, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <Link href={tab.url} underline="none">
                                {tab.text}
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}><DensityMediumIcon/></Button>
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
            >
                {DrawerList}
            </Drawer>
        </div>
    );
}