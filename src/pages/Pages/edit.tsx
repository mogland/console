/*
 * @FilePath: /nx-admin/src/pages/Pages/edit.tsx
 * @author: Wibus
 * @Date: 2022-07-26 20:37:34
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-03 13:53:25
 * Coding With IU
 */
/*
 * @FilePath: /nx-admin/src/pages/Posts/edit.tsx
 * @author: Wibus
 * @Date: 2022-07-22 22:52:13
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-26 16:20:43
 * Coding With IU
 */

import type { BasicPage } from "../../types/basic";
import { useState } from "react";
import { apiClient } from "../../utils/request";
import { NxPage } from "../../components/widgets/Page";
import { useMount } from "react-use";
import { Editor } from "../../components/widgets/Editor";
import { useParams } from "react-router-dom";
import { PageModel } from "./page.model";
import { Types } from "mongoose";

export const PageEdit: BasicPage = () => {
  const [post, setPost] = useState<PageModel>(new PageModel());
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const pageId = params ? params.id : undefined;
  // pageId 转换成 MongoId
  const mongoId = pageId ? new Types.ObjectId(pageId) : undefined;
  useMount(() => {
    pageId &&
      apiClient.get(`/page/${mongoId}`).then((res) => {
        setPost(res);
        setLoading(false);
      });
  });
  // console.log(post);
  // if (pageId !== 'edit' && !loading) {
  //   console.log(post);
  // }

  return (
    <NxPage>
      {(pageId !== "edit" && !loading && (
        <Editor post={post} type="page" />
      )) || <Editor type="page" />}
    </NxPage>
  );
};
