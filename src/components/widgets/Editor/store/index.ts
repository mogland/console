/*
 * @FilePath: /nx-admin/src/components/widgets/Editor/store/index.ts
 * @author: Wibus
 * @Date: 2022-07-23 16:01:08
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-23 16:01:08
 * Coding With IU
 */
import stateController from 'state-controller';
import useEditorController from './use-editor-controller';

const stateControlStore = stateController.combine(useEditorController);

export default stateControlStore;
