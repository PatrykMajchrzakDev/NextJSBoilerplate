// =================================================
// ==================== APP LOGO ===================
// =================================================

import Link from "next/link";
import React from "react";

const Logo = (props: { url?: string; size?: string; fontSize?: string }) => {
  // Arguments provided
  const { url = "/", size = "40px", fontSize = "24px" } = props;
  return (
    <div className="flex items-center justify-center">
      <Link
        href={url}
        className="
             rounded-lg flex items-center border-2 dark:border-gray-200
             justify-center bg-gradient-to-br from-orange-200 to-primary to-90%
              "
        style={{ width: size, height: size }}
      >
        <span className="font-bold text-gray-50" style={{ fontSize: fontSize }}>
          B
        </span>
      </Link>
    </div>
  );
};

export default Logo;
