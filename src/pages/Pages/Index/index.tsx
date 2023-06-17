import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "@components/universal/Loading";
import { Title } from "@components/universal/Title";
import type { BasicPage } from "@type/basic";
import { apiClient } from "@utils/request";
import { useSeo } from "@hooks/useSeo";
import { jump } from "@utils/path";

import { Button } from "@components/ui/button";
import { getQueryVariable } from "@utils/url";
import { PagesListDataTable } from "./Table/data-table";
import { PagesListColumns } from "./Table/column";

export const PagesIndex: BasicPage = () => {
  useSeo("文章 · 列表");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const page = getQueryVariable("page");
  const [data, setData] = useState<{
    data: any[];
    pagination: any;
  }>({
    data: [],
    pagination: {},
  });

  useEffect(() => {
    setLoading(true);
    apiClient(`/page?size=8&page=${page || 1}`).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [page]);

  return (
    <>
      <div
        style={{
          width: "100%",
        }}
      >
        <Loading loading={loading} />
        <div className={clsx("loading", !loading && "loaded")}>
          <PagesListDataTable
            columns={PagesListColumns}
            data={data.data}
            pagination={data.pagination}
            header={
              <>
                <Title>
                页面 · 列表
                </Title>
                <Button
                  variant="outline"
                  className={clsx("ml-auto", "mr-2")}
                  onClick={() => navigate(jump("/write/page"))}
                >
                  新建
                </Button>
              </>
            }
          />
        </div>
      </div>
    </>
  );
};
