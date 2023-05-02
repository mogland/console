import { proxy, subscribe } from 'valtio'
import { Workspace, assertExists } from '@blocksuite/store'
import type { EditorContainer } from '@blocksuite/editor'
import { AffineSchemas } from '@blocksuite/blocks/models'
import { ContentParser } from '@blocksuite/blocks/content-parser'
import { createIndexedDBProvider } from "@toeverything/y-indexeddb";
import { DEFAULT_SHAPE_FILL_COLOR, DEFAULT_SHAPE_STROKE_COLOR } from '@blocksuite/blocks'
import { addShapeElement } from '@utils/editor'

export const editorState = proxy({
  currentWorkspaceId: null as string | null,
  currentWorkspace: null as Workspace | null,
  editor: null as EditorContainer | null,
  data: {
    title: null as string | null,
    text: null as string | null,
  }
})

subscribe(editorState.data, async () => {
  if (editorState.currentWorkspaceId !== null) {
    const id = editorState.currentWorkspaceId;
    const hashMap = new Map<string, Workspace>();
    const data = editorState.data;

    let workspace = hashMap.get(id);
    if (!workspace) {
      workspace = new Workspace({
        id,
      });
      workspace.register(AffineSchemas);
      hashMap.set(id, workspace);
    }
    const provider = createIndexedDBProvider(workspace.id, workspace.doc);

    assertExists(provider);
    provider.connect();
    provider.whenSynced.then(() => {
      assertExists(workspace);
      if (workspace.isEmpty) {
        const page = workspace.createPage({
          id: "page0",
        });
  
        const pageBlockId = page.addBlock("affine:page", {
          title: new Text(data.title as string),
        });
  
        page.addBlock("affine:surface", {}, null);
  
        // Add frame block inside page block
        const frameId = page.addBlock("affine:frame", {}, pageBlockId);
        // page.addBlock('affine:paragraph', {}, frameId);
        addShapeElement(page, {
          id: '0',
          index: 'a0',
          type: 'shape',
          xywh: '[0,0,100,100]',
      
          shapeType: 'rect',
      
          radius: 0,
          filled: false,
          fillColor: DEFAULT_SHAPE_FILL_COLOR,
          strokeWidth: 4,
          strokeColor: DEFAULT_SHAPE_STROKE_COLOR,
          strokeStyle: 'solid',
        });
        const contentParser = new ContentParser(page);
        if (data.text) {
          contentParser.importMarkdown(data.text, frameId);
        }
        page.resetHistory();
      } else {
        const page = workspace.getPage("page0");
        assertExists(page);
      }
    });
    await provider.whenSynced;
    editorState.currentWorkspace = workspace;
  }
})