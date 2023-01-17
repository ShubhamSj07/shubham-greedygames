import "./Layout.scss";

export const Layout = ({ children }) => {
  return (
    <div className="layout">
      <aside className="layout__aside"></aside>
      <div className="layout__content">{children}</div>
    </div>
  );
};
