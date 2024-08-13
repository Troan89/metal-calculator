import React, { useState } from 'react';
import s from './Select.module.scss';

type Option = {
    label: string;
    value: string | number;
}

type Props = {
    options: Option[];
    value: string | number | null;
    onChange: (value: string | number) => void;
    placeholder?: string;
}

export const Select= ({ options, value, onChange, placeholder } : Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value: string | number) => {
        onChange(value);
        setIsOpen(false);
    };

    return (
        <div className={s.customSelect}>
            <div className={`${s.customSelect__trigger} ${isOpen ? s.open : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <span>{value ? options.find(option => option.value === value)?.label : placeholder}</span>
                <div className={s.arrow}></div>
            </div>
            {isOpen && (
                <div className={s.customOptions}>
                    {options.map(option => (
                        <div
                            key={option.value}
                            className={`${s.customOption} ${value === option.value ? s.selected : ''}`}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

