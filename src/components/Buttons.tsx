import React from "react";
import styles from "../style/index.module.scss";

type ButtonProps = {
  children: React.ReactNode
  styleScss: string
  stylesBtn: React.CSSProperties
}

export const Buttons = ({ children, styleScss, stylesBtn }: ButtonProps) => {
  return (
    <>
      <button
        className={`${styles[`${styleScss}`]}`}
        style={stylesBtn}
      >
        {children}
      </button>
    </>
  )
}
