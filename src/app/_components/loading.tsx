import React from "react";

import { LOADING_TEXT } from "@/lib/constants";

const RenderLoading = () => (
    <div className="flex justify-center items-center h-32">
        <p className="text-center">{LOADING_TEXT}</p>
    </div>
);

export default RenderLoading