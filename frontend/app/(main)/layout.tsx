import React from "react";
import Header from "./components/Header";

function MainLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className="h-screen w-full flex flex-col box-border">
      <Header />
      <div className="flex-1 flex flex-col justify-center items-center overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
