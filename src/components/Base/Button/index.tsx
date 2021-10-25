import { LoadingOutlined } from "@ant-design/icons";
import { Space } from "antd";
import classNames from "classnames";
import React, { CSSProperties } from "react";

import styles from './index.module.scss';

export interface ButtonSizeType {
  small: CSSProperties,
  middle: CSSProperties,
  xm: CSSProperties,
  large: CSSProperties
}

export const ButtonSize: ButtonSizeType = {
  small: {
    borderRadius: "10px",
    height: "22px",
    padding: "0px 10px",
    fontSize: "11px"
  },
  middle: {
    height: "30px",
    borderRadius: "15px",
    // padding: "0px 35px",
    minWidth: "100px"
  },
  xm: {
    height: "40px",
    borderRadius: "25px",
    // padding: "0px 35px",
    minWidth: "115px"
  },
  large: {
    height: "45px",
    borderRadius: "18px",
    fontSize: "16px",
    minWidth: "160px"
  }
}

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon?: React.ReactNode;
  size?: keyof typeof ButtonSize;
  loading?: boolean;
  theme?: "success" | "default" | "hot" | "cheese";
  border?: boolean;
  disabled?: boolean;
}


const Button: React.FC<ButtonProps> = ({ size = "middle", theme = "default", icon, disabled, loading, border = true, children, ...props }) => {

  const themeClassName = styles[theme]

  return (
    <div className={styles.btnWrap}>
      {loading ? <div className={styles.loading}><LoadingOutlined spin /></div> : null}
      <button
        disabled={loading || disabled}
        className={classNames(
          styles.resetButton,
          themeClassName,
          {
            [styles.bordered]: border,
            [styles.disabled]: disabled
          }
        )}
        style={{ ...ButtonSize[size] }}
        {...props}
      >
        <Space>
          {icon ? <div>{icon}</div> : null}
          <div className={styles.children}>{children}</div>
        </Space>
      </button>
    </div>
  )

}

export default Button;
