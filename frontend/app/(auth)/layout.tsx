import React from "react";

function MainLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className="h-full w-full">
      {children}
    </div>
  );
}

export default MainLayout;