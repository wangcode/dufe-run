import { Space } from "antd";
import React, { CSSProperties } from "react";

import styles from './index.module.scss';

interface ButtonSizeType {
    small: CSSProperties,
    middle: CSSProperties,
    large: CSSProperties
}

const ButtonSize: ButtonSizeType = {
    small: {
        borderRadius: "10px",
        height: "22px",
        padding: "0px 14px",
        fontSize: "11px"
    },
    middle: {
        height: "30px",
        borderRadius: "15px",
        // padding: "0px 35px",
        minWidth: "100px"
    },
    large: {
        height: "45px"
    }
}

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    icon?: React.ReactNode;
    size?: keyof typeof ButtonSize;
    theme?: "success"|"default"|"hot";
    disabled?: boolean;
}


const Button: React.FC<ButtonProps> = ({size="middle", theme="default", icon, disabled, children}) => {


    return (
        <button
            disabled={disabled}
            className={`${styles.resetButton} ${styles[disabled?"disabled":theme]}`}
            style={{...ButtonSize[size]}}
        >
            <Space>
            {icon && <span>
                    {icon}
                </span>}
                <span>
                    {children}
                </span>
            </Space>

        </button>
    )

}

export default Button;