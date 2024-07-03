# polaris-doc-viewer

<br />
<br />

## 当前可渲染文件类型

| Extension | MIME Type                                                                          | Available |
| --------- | ---------------------------------------------------------------------------------- | --------- |
| bmp       | image/bmp                                                                          | `✓`       |
| doc       | application/msword                                                                 | `✓`       |
| docx      | application/vnd.openxmlformats-officedocument.wordprocessingml.document            | `✓`       |
| htm       | text/htm                                                                           | `✓`       |
| html      | text/html                                                                          | `✓`       |
| jpg       | image/jpg                                                                          | `✓`       |
| jpeg      | image/jpeg                                                                         | `✓`       |
| pdf       | application/pdf                                                                    | `✓`       |
| png       | image/png                                                                          | `✓`       |
| ppt       | application/vnd.ms-powerpoint                                                      | `✓`       |
| pptx      | applicatiapplication/vnd.openxmlformats-officedocument.presentationml.presentation | `✓`       |
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

DocViewer至少需要一个文档对象数组才能起作用。
每个文档对象必须有一个指向文件的uri，可以是返回文件的url，也可以是返回本地文件的url

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
| fileType? | `string` |
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
