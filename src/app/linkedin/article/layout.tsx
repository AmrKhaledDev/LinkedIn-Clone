import React, { ReactNode } from "react";
import HeaderNewArticle from "./_components/HeaderNewArticle";
// ================================================================
function layout({ children }: { children: ReactNode }) {
  return (
    <div className="space-section">
      <HeaderNewArticle />
      {children}
    </div>
  );
}

export default layout;
