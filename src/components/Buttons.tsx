import React from "react";
import styles from "../style/index.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  styleScss: string;
  stylesBtn?: React.CSSProperties;
  onClicks?: () => void
}

export const Buttons = ({ children, styleScss, stylesBtn, onClicks }: ButtonProps) => {
  return (
    <>
      <button
        type="button"
        onClick={onClicks}
        className={`${styles[`${styleScss}`]}`}
        style={stylesBtn}
      >
        {children}
      </button>
    </>
  )
}
