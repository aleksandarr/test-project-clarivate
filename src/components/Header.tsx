import React from 'react';

type ButtonProps = {
    button: {
        id?: string
        onClick: () => void;
        label: string;
    };
};


const Header: React.FC<ButtonProps> = ({ button: { onClick, label, id } }) => {
    return (
        <div className='header'>
            <button id={id} onClick={onClick}>{label}</button>
        </div>
    );
};

export default Header;
