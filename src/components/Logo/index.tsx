import React from 'react';
import './style.scss';
import logo from '../../images/Logo128.png';

interface LogoProps {
    className: string;
}

function Logo(props: LogoProps) {
    const imageStyle: object = {
        userDrag: 'none',
        WebkitUserDrag: 'none',
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none',
        borderRadius: '5%',
    };

    return (
        <div className={props.className}>
            <img src={logo} alt="PTSHIP" style={imageStyle} />
        </div>
    );
}

export default Logo;
