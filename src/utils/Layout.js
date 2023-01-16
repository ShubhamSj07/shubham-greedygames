import React from "react";
import styles from "./Layout.module.scss";

export const Layout = ({ children }) => {
  return (
    <div className={styles["layout"]}>
      <aside className={styles["layout__aside"]}></aside>
      <div className={styles["layout__content"]}>{children}</div>
    </div>
  );
};
