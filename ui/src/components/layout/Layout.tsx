import { PropsWithChildren } from "react";

function Layout(props: PropsWithChildren) {
  return (
    <div>
      <div className="title-container">
        <h1 className="title-text">Netflix Boba Finder</h1>
        <img src="/boba-icon.png" className="title-icon" />
      </div>
      {props.children}
    </div>
  );
}

export default Layout;
