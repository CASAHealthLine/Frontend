import React, { useState, useEffect } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { Typography } from './Typography';
import { Bell, Mail, Menu } from 'lucide-react';
import styled from '@emotion/styled';

import { useToggleSidebar, useBreakpointSidebar } from '../contexts/SidebarProvider';

const TimeDisplay = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const updateDate = () => {
            setDate(new Date());
        };
        updateDate();

        const now = new Date();
        const timeToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

        const initialTimeout = setTimeout(() => {
            updateDate();
            const interval = setInterval(updateDate, 60000);

            return () => clearInterval(interval);
        }, timeToNextMinute);
        
        return () => clearTimeout(initialTimeout);
    }, []);

    return (
        <Typography 
            variant='body1'
            className='time-display' 
            style={{
                width: 'auto',
                fontWeight: 700,
            }}
        >
            {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
        </Typography>
    );
};

const Divider = styled.div`
    height: 50%;
    width: 2px;
    background-color: white;
    margin: 0 15px;
`

const IconNavLink = styled(Nav.Link)`
    --icon-color: ${props => props.color ? props.color : 'var(--secondary-text-color)'};
    color: var(--icon-color);
    cursor: pointer;
    padding: 8px;

    &:hover, &:focus, &:active, &:visited {
        color: var(--icon-color);
    }
`

export const Topbar = () => {
  const {sidebarToggled, setSidebarToggled} = useToggleSidebar();
  const {sidebarBreakpoint} = useBreakpointSidebar();

  return (
    <Nav 
        className='h-16 justify-end gap-3.5 flex-row items-center shrink-0'
        style={{
            backgroundColor: 'var(--primary-bg-color)',
            color: 'var(--secondary-text-color)',
            padding: '0 20px',
        }}
    >
        {sidebarBreakpoint && (
            <Menu className='mr-auto cursor-pointer'
                onClick={() => setSidebarToggled(!sidebarToggled)}/> 
        )}
        <TimeDisplay />
        <Nav.Item>
            <IconNavLink eventKey={1} ><Mail /></IconNavLink>
        </Nav.Item>
        <Nav.Item>
            <IconNavLink eventKey={2} ><Bell /></IconNavLink>
        </Nav.Item>
        <Divider />
    </Nav>
  );
};