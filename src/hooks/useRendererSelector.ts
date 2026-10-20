import { useContext } from 'react';
import { DocViewerContext } from '../state';
import { DocRenderer } from '../types';

export const useRendererSelector = (): {
  CurrentRenderer: DocRenderer | null | undefined;
} => {
  const {
    state: { currentDocument, pluginRenderers },
  } = useContext(DocViewerContext);

  const fileType = currentDocument?.fileType;
  if (!fileType) return { CurrentRenderer: undefined };

  const matchingRenderers = pluginRenderers?.filter((renderer) =>
    renderer.fileTypes.includes(fileType)
  );
  const [CurrentRenderer] = (matchingRenderers || []).sort((a, b) => b.weight - a.weight);

  return { CurrentRenderer: CurrentRenderer || null };
};
