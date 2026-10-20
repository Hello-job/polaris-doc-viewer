# polaris-doc-viewer

<br />
<br />

## 当前可渲染文件类型

| Extension | MIME Type                                                                          | Available |
| --------- | ---------------------------------------------------------------------------------- | --------- |
| bmp       | image/bmp                                                                          | `✓`       |
| doc       | application/msword                                                                 | 需先转换为 docx 或 PDF |
| docx      | application/vnd.openxmlformats-officedocument.wordprocessingml.document            | `✓`       |
| htm       | text/htm                                                                           | `✓`       |
| html      | text/html                                                                          | `✓`       |
| jpg       | image/jpg                                                                          | `✓`       |
| jpeg      | image/jpeg                                                                         | `✓`       |
| pdf       | application/pdf                                                                    | `✓`       |
| png       | image/png                                                                          | `✓`       |
| ppt       | application/vnd.ms-powerpoint                                                      | `✓`       |
| pptx      | application/vnd.openxmlformats-officedocument.presentationml.presentation | `✓`       |
| tiff      | image/tiff                                                                         | `✓`       |
| txt       | text/plain                                                                         | `✓`       |
| xls       | application/vnd.ms-excel                                                           | `✓`       |
| xlsx      | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet                  | `✓`       |
| video     | mp3 、mp4、audio/x-m4a、 flac、 wma、 aiff、 ape、 dsd           | `✓`       |
|


<br />
<br />

## 安装

### Core

```bash
 npm i polaris-doc-viewer
 # or
 yarn add polaris-doc-viewer
  # or
 pnpm add polaris-doc-viewer
```


## Usage

> **Warning** - 默认情况下，组件高度将根据当前加载的文件展开和收缩。宽度将扩展以填充parent
<br />
<br />

### Basic

DocViewer 至少需要一个文档对象数组才能起作用。每个文档对象必须提供 `uri`。组件优先使用显式的 `fileType`，否则通过 `suffix` 或 URL 中的扩展名选择渲染器；URL 的查询参数、片段和大写扩展名均可识别。无扩展名的下载地址也可以通过 `name` 提供文件名。

```tsx
const docs = [
  { uri: 'https://example.com/image.svg' },
  { uri: 'https://example.com/download/123', suffix: 'pdf' },
  { uri: 'blob:...', fileType: 'image/png' },
];
```

URL、文件名都无法识别类型时，组件会尝试 `HEAD` 请求读取 MIME 类型；请求失败后显示无法预览的提示和下载入口。

```tsx
import DocViewer from "polaris-doc-viewer";

function App() {
  const docs = [
    { uri: "https://url-to-my-pdf.pdf", suffix: 'pdf' },
    { uri: require("./example-files/pdf.pdf"), suffix: 'pdf'  }, // Local File
  ];

  return <DocViewer documents={docs} />;
}
```

### 渲染器

`DocViewerRenderers` 插入所有渲染器的数组

```tsx
import DocViewer, { DocViewerRenderers } from "polaris-doc-viewer";

<DocViewer
  pluginRenderers={DocViewerRenderers}
  {/* ... */}
/>;
```

或者插入单个渲染器

```tsx
import DocViewer, { PDFRenderer, PNGRenderer } from "polaris-doc-viewer";

<DocViewer
  pluginRenderers={[PDFRenderer, PNGRenderer]}
  {/* ... */}
/>;
```

<br />
<br />

### 自定义渲染器

要创建一个自定义渲染器，它将只存在于您的项目中。

```tsx
import React from "react";
import DocViewer from "polaris-doc-viewer";

const MyCustomPNGRenderer: DocRenderer = ({
  mainState: { currentDocument },
}) => {
  if (!currentDocument) return null;

  return (
    <div id="my-png-renderer">
      <img id="png-img" src={currentDocument.fileData as string} />
    </div>
  );
};

MyCustomPNGRenderer.fileTypes = ["png", "image/png"];
```

并将渲染器放入  pluginRenderers 里面 `Array`.

```tsx
import DocViewer, { DocViewerRenderers } from "polaris-doc-viewer";

<DocViewer
  pluginRenderers={[MyCustomPNGRenderer]}
  documents={
    [
      // ...
    ]
  }
/>;
```

<br />
<br />

### Custom File Loader

如果您需要阻止 `polaris-doc-viewer` 实际加载文件。
你可以用一个回调来装饰你的自定义渲染器。你自己在iFrame中加载文件。

```tsx
MyCustomPNGRenderer.fileLoader = ({
  documentURI,
  signal,
  fileLoaderComplete,
}) => {
  myCustomFileLoaderCode().then(() => {
    // Whenever you have finished you must call fileLoaderComplete() to remove the loading animation
    fileLoaderComplete();
  });
};
```

<br />
<br />

### 主题

您可以为主题对象提供一个或所有可用属性。

```xml
<DocViewer
  documents={docs}
  theme={{
    primary: "#5296d8",
    secondary: "#ffffff",
    tertiary: "#5296d899",
    text_primary: "#ffffff",
    text_secondary: "#5296d8",
    text_tertiary: "#00000099",
    disableThemeScrollbar: false,
  }}
/>
```


#### - CSS Class Default Override

Each component / div already has a DOM id that can be used to style any part of the document viewer.

```css
#react-doc-viewer #header-bar {
  background-color: #faf;
}
```

#### - 内联样式

```xml
<DocViewer documents={docs} style={{width: 500, height: 500}} />
```

#### - StyledComponent

```tsx
import styled from "styled-components";
//...
<MyDocViewer documents={docs} />;
//...
const MyDocViewer = styled(DocViewer)`
  border-radius: 10px;
`;
```

### Config

您可以提供一个配置对象，它根据需要配置组件的各个部分

```xml
<DocViewer documents={docs} config={{
 header: {
  disableHeader: false,
  disableFileName: false,
  retainURLParams: false
 }
}} />
```

<br />
<br />

## Contributing

### 创建渲染插件

**Step 1** -在里面创建一个新文件夹 `src/plugins`.

> e.g. `src/plugins/jpg`

在这个文件夹中，创建一个Renderer React Typescript文件

> e.g. `index.tsx`

**Step 2** - 在JPGRenderer中，导出类型为 `DocRenderer`

```tsx
import React from "react";
import { DocRenderer } from "../../types";

// Be sure that Renderer correctly uses type DocRenderer
const JPGRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  if (!currentDocument) return null;

  return (
    <div id="jpg-renderer">
      <img id="jpg-img" src={currentDocument.fileData as string} />
    </div>
  );
};

export default JPGRenderer;

// List the MIME types that this renderer will respond to
JPGRenderer.fileTypes = ["jpg", "jpeg", "image/jpg", "image/jpeg"];

//如果同一个MIME类型有多个渲染器，使用weight。越高越好。
//包含的渲染器的权重为0
JPGRenderer.weight = 1;
```

<br />


<br />
<br />

## Overriding Header Component

你可以给config.header传递一个回调函数。overricomponent '返回一个React元素。函数的参数将被填充并可用，这个函数也将在mainState更新时被重新调用。
参数包括来自主组件的状态对象，以及' previousDocument '和' nextDocument '的文档导航函数。

Example:

```tsx

const myHeader: IHeaderOverride = (state, previousDocument, nextDocument) => {
    if (!state.currentDocument || state.config?.header?.disableFileName) {
      return null;
    }

    return (
      <>
        <div>{state.currentDocument.uri || ""}</div>
        <div>
          <button
            onClick={previousDocument}
            disabled={state.currentFileNo === 0}
          >
            Previous Document
          </button>
          <button
            onClick={nextDocument}
            disabled={state.currentFileNo >= state.documents.length - 1}
          >
            Next Document
          </button>
        </div>
      </>
    );
  };

<DocViewer
  pluginRenderers={DocViewerRenderers}
  documents={
    {
      /**/
    }
  }
  config={{
    header: {
      overrideComponent: myHeader;
      },
    },
  }
/>
```

## API

---

### `DocViewer props`

| name             | type                            |
| ---------------- | ------------------------------- |
| documents        | [`IDocument[]`](#idocument)     |
| className?       | `string`                        |
| style?           | `React.CSSProperties`           |
| config?          | [`IConfig`](#iconfig)           |
| theme?           | [`ITheme`](#itheme)             |
| pluginRenderers? | [`DocRenderer[]`](#docrenderer) |

---

### `IDocument`

| name      | type     |
| --------- | -------- |
| uri       | `string` |
| fileType? | `string` — 显式指定扩展名或 MIME 类型 |
| suffix? | `string` — URL 无扩展名时可提供后缀 |
| name? | `string` — 显示名称，也可用于推断扩展名 |
| fileData? | `string  | ArrayBuffer` - **Used Internally - Ignored if passed into props** |

---

### `IConfig`

| name    | type                              |
| ------- | --------------------------------- |
| header? | [`IHeaderConfig`](#iheaderconfig) |

---

### `IHeaderConfig`

| name               | type                                  |
| ------------------ | ------------------------------------- |
| disableHeader?     | `boolean`                             |
| disableFileName?   | `boolean`                             |
| retainURLParams?   | `boolean`                             |
| overrideComponent? | [`IHeaderOverride`](#iheaderoverride) |

---

### `IHeaderOverride` () => `ReactElement<any, any> | null`

| name             | type                        |
| ---------------- | --------------------------- |
| state            | [`IMainState`](#imainstate) |
| previousDocument | `() => void`                |
| nextDocument     | `() => void`                |
| `returns`        | `ReactElement<any, any>     | null` |

---

### `ITheme`

| name                   | type      |
| ---------------------- | --------- |
| primary?               | `string`  |
| secondary?             | `string`  |
| tertiary?              | `string`  |
| text_primary?          | `string`  |
| text_secondary?        | `string`  |
| text_tertiary?         | `string`  |
| disableThemeScrollbar? | `boolean` |

---

### `DocRenderer` extends React.FC\<[`DocRendererProps`](#docrendererprops)\>

| name        | type                                          |
| ----------- | --------------------------------------------- |
| fileTypes   | `string[]`                                    |
| weight      | `number`                                      |
| fileLoader? | [`FileLoaderFunction`](#fileloaderfunction) ` | null | undefined` |

---

### `FileLoaderFunction`

(props: [`FileLoaderFuncProps`](#fileloaderfuncprops)) => void

---

### `FileLoaderFuncProps`

| name               | type                                        |
| ------------------ | ------------------------------------------- |
| documentURI        | `string`                                    |
| signal             | `AbortSignal`                               |
| fileLoaderComplete | [`FileLoaderComplete`](#fileloadercomplete) |

---

### `FileLoaderComplete`

| name       | type         |
| ---------- | ------------ |
| fileReader | `FileReader` |

---

### `DocRendererProps`

| name      | type                        |
| --------- | --------------------------- |
| mainState | [`IMainState`](#imainstate) |

---

### `IMainState`

| name             | type                        |
| ---------------- | --------------------------- |
| currentFileNo    | number                      |
| documents        | [`IDocument[]`](#idocument) |
| documentLoading? | boolean                     |
| currentDocument? | [`IDocument`](#idocument)   |
| rendererRect?    | DOMRect                     |
| config?          | [`IConfig`](#iconfig)       |

---


## 维护与兼容性

使用仓库锁文件安装和检查：

```bash
pnpm install --frozen-lockfile
pnpm test --watchAll=false --runInBand
pnpm run build
```

组件自带文件图标和文件来源常量，使用方无需再安装 `polaris-react-component` 或 `polaris-icon`。依赖树也不再通过内部组件库引入 Moment、Ant Design 或 `react-virtualized`，对应 Issue [#2](https://github.com/Hello-job/polaris-doc-viewer/issues/2)、[#5](https://github.com/Hello-job/polaris-doc-viewer/issues/5)、[#8](https://github.com/Hello-job/polaris-doc-viewer/issues/8)。播放器使用 ArtPlayer 的 legacy 构建，兼容旧版 Webpack 对 JavaScript 语法的解析（[#1](https://github.com/Hello-job/polaris-doc-viewer/issues/1)）。

### 第三方地址与跨域

普通图片直接使用浏览器的 `img` 加载；图片地址可识别时不发送额外的 `HEAD` 或文件 `fetch` 请求。SVG 支持 `svg` 和 `image/svg+xml`，也可以省略 `suffix`（[#4](https://github.com/Hello-job/polaris-doc-viewer/issues/4)）。视频和云文档同样交给播放器或 iframe 加载。

PDF、TXT、DOCX 等需要 JavaScript 读取文件内容的格式，第三方服务器仍需允许跨域访问；否则应通过业务服务端代理文件请求。前端组件无法绕过浏览器的 CORS 限制。iframe 还可能受到对方站点的 `X-Frame-Options` / CSP 限制（[#3](https://github.com/Hello-job/polaris-doc-viewer/issues/3)）。

### 暂未解决的兼容性问题

- [#6 React 版本](https://github.com/Hello-job/polaris-doc-viewer/issues/6)：本次保持 React 16 的兼容范围；`react-pdf@5.0.0` 的 peer dependency 也只声明支持 React 16。支持 React 18/19 需要升级 PDF 渲染器并验证整套插件，不能只放宽版本声明。
- [#7 旧版 .doc](https://github.com/Hello-job/polaris-doc-viewer/issues/7)：当前 Word 渲染器基于 DOCX/ZIP 解析，无法解析二进制 `.doc`。需要在服务端先转换成 `.docx` 或 PDF，并向组件提供转换后的 URL 和类型；仅修改文件扩展名不会转换文件格式。
