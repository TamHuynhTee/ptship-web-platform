import React from 'react';
import './style.scss';

interface DropdownMenuProps {
    children: Array<React.ReactChild> | React.ReactChild;
    id: string;
}

export const DropdownMenu = (props: DropdownMenuProps) => {
    return (
        <ul className="dropdownMenu dropdown-menu" id={props.id}>
            {props.children}
        </ul>
    );
};
