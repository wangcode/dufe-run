import React, { CSSProperties } from "react";

import styles from './index.module.scss';

interface ButtonSizeType {
    small: CSSProperties,
    middle: CSSProperties,
    large: CSSProperties
}

const ButtonSize: ButtonSizeType = {
    small: {
        height: "20px"
    },
    middle: {
        height: "30px",
        borderRadius: "15px",
        padding: "0px 35px"
    },
    large: {
        height: "45px"
    }
}

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    icon?: React.ReactNode;
    size?: keyof typeof ButtonSize;
    theme?: "success"|"default"
}


const Button: React.FC<ButtonProps> = ({size="middle", theme="default", icon, children}) => {


    return (
        <button
            className={`${styles.resetButton} ${styles[theme]}`}
            style={{...ButtonSize[size]}}
        >
           {icon && <span>
                {icon}
            </span>}
            <span>
                {children}
            </span>
        </button>
    )

}

export default Button;