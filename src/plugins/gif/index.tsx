import React from "react";
import { DocRenderer } from "../..";
import ImageProxyRenderer from "../image";

const JPGRenderer: DocRenderer = (props) => <ImageProxyRenderer {...props} />;

JPGRenderer.fileTypes = ["gif", "image/gif"];
JPGRenderer.weight = 0;
JPGRenderer.fileLoader = ImageProxyRenderer.fileLoader;

export default JPGRenderer;
