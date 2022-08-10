/*
 * @FilePath: /nx-admin/src/pages/backup/index.tsx
 * @author: Wibus
 * @Date: 2022-08-09 19:16:13
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-10 18:39:32
 * Coding With IU
 */

import { Button, ButtonGroup, Checkbox, Input, Radio, Select, Spacer, Tabs, Text } from "@geist-ui/core";
import { useEffect, useState } from "react";
import { message } from "react-message-popup";
import Dashboards from "../../components/layouts/Dashboards";
import { NxPage } from "../../components/widgets/Page";
import type { BasicPage } from "../../types/basic";
import { responseBlobToFile } from "../../utils/backup";
import { ParseMarkdownYAML } from "../../utils/markdown-parser";
import { apiClientManger } from "../../utils/request";
import Upload from 'rc-upload'

enum ImportType {
  Post = 'post',
  Page = 'page',
}

export const Backup: BasicPage = () => {

  const [markdownOptions, setMarkdownOptions] = useState<any>({
    type: 1,
    configs: ["yaml", "slug", "showTitle"]
  });
  const [markdownObjectIDs, setMarkdownObjectIDs] = useState<string>("");

  const [fileList, setFileList] = useState<any>({
    value: [],
  })
  const [parsedList, setParsedList] = useState<any>({
    value: [],
    [Symbol.toStringTag]: "FileList",
  })

  useEffect(() => {
    console.log(fileList)
    const dataInFormData = fileList.value as FileList
    console.log(dataInFormData)
  }, [fileList])

  const parseMarkdown = (strList: string[]) => {
    const parser = new ParseMarkdownYAML(strList)
    return parser.start().map((i, index) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const filename = fileList.value[index].name.replace(/\.md$/, "")
      const title = filename
      if (i.meta) {
        i.meta.slug = i.meta.slug ?? title
      } else {
        i.meta = {
          title,
          slug: title,
        } as any
      }

      if (!i.meta?.date) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        i.meta!.date = new Date().toISOString()
      }
      return i
    })
  }

  const handleParse = async (e) => {
    e?.preventDefault();
    if (!fileList.value.length) {
      throw new ReferenceError('fileList is empty')
    }
    const strList = fileList.value.map((i) => i.file)
    const parsedList_ = parseMarkdown(strList)
    message.success('解析完成, 结果查看 console 哦')
    setParsedList({
      value: parsedList_.map((v, index) => ({
        ...v,
        filename: fileList.value[index].name || '',
      }))
    })
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!parsedList.value.length) {
      return message.error('请先解析!!')
    }
    await apiClientManger("/markdown/import", {
      method: "POST",
      body: {
        type: ImportType.Post,
        data: parsedList.value,
      },
    }).then(() => {
      message.success('上传成功!')
      fileList.value = []
    }).catch((e) => {
      message.error(e.message)
    })
  }

  return (
    <NxPage title={"Backup"}>
      <Dashboards.Container>
        <Dashboards.Area>
          <Text h2>备份</Text>
          <Tabs
            initialValue={"1"}
            marginTop={1}
            width="100%"
          >
            <Tabs.Item label="备份 MongoDB Data" value="1">
              <Text p small>点击下方按钮进行备份操作，此操作将会生成一个压缩包，可用于 <code>mongodump</code> 导入使用 </Text>
              <Button margin={1} onClick={async () => {
                const res = await apiClientManger("/backup/new", {
                  responseType: "blob",
                })
                responseBlobToFile(res, "backup.tar.gz");
                message.info("备份成功");
              }}>备份 MongoDB Data</Button>
            </Tabs.Item>
            <Tabs.Item label="备份 Markdown Data" value="2">
              <Text p small>点击下方按钮进行备份操作，请选择备份类型，并填写相关信息</Text>
              <Radio.Group defaultValue={markdownOptions.type} onChange={(val) => {
                setMarkdownOptions({
                  ...markdownOptions,
                  type: val as number,
                })
              }} >
                <Radio value={1}>备份所有 Markdown 文件</Radio>
                <Radio value={2}>
                  备份指定 Markdown 文件
                  <Input marginLeft={1} placeholder="输入Object ID, 逗号分隔" onChange={(value) => {
                    setMarkdownObjectIDs(value.target.value);
                  }} />
                </Radio>
              </Radio.Group>
              <Spacer h={2} />
              <Checkbox.Group value={markdownOptions.configs}>
                <Checkbox value="yaml">导出 YAML Meta 信息</Checkbox>
                <Checkbox value="slug">使用 Slug 命名</Checkbox>
                <Checkbox value="showTitle">在第一行显示 Title</Checkbox>
              </Checkbox.Group>
              <Button marginTop={2} marginBottom={2} onClick={async () => {
                const { type, configs } = markdownOptions;
                const objectIDs = markdownObjectIDs;
                const res = await apiClientManger(`/markdown/export${type == 1 ? "/all" : ""}?${configs.map((config) => `${config}=true`).join("&")}`, {
                  responseType: "blob",
                  method: type == 1 ? "GET" : "POST",
                  body: type == 1 ? undefined : {
                    ids: objectIDs,
                  },
                })
                if (objectIDs.split(",").length > 1) {
                  responseBlobToFile(res, "markdown.zip");
                } else {
                  responseBlobToFile(res, "markdown.md");
                }
                message.info("备份成功");
              }}>开始备份 Markdown Data</Button>
            </Tabs.Item>
          </Tabs>

          <Text h2>导入</Text>
          <Tabs
            initialValue={"1"}
            marginTop={1}
            width="100%"
          >
            <Tabs.Item label="导入 MongoDB Data" value="1">
              <Text p small>点击下方按钮进行导入操作，此操作将会将备份的数据导入到 MongoDB 中</Text>

              {/* <input type="file" id="uploadMongoDB" style={{
                // display: "none",
              }} />
              <Spacer h={1} /> */}
              <Text small b>注意：此操作将会清空当前数据库中的数据</Text>

              <Button marginLeft={2} marginTop={2} marginBottom={2} onClick={async () => {
                const $file = document.createElement('input')
                $file.type = 'file'
                $file.style.cssText = `position: absolute; opacity: 0; z-index: -9999;top: 0; left: 0`
                $file.accept = '.gz'
                document.body.append($file)
                $file.click()
                $file.onchange = async () => {
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  const file = $file.files![0]
                  const formData = new FormData()
                  formData.append('file', file)
                  await apiClientManger('/backup/restore', {
                    method: 'POST',
                    body: formData,
                  }).then(() => {
                    message.success('恢复成功, 页面将会重载')
                    setTimeout(() => {
                      location.reload()
                    }, 1000)
                  }).catch(() => {
                    message.error('恢复失败')
                  })
                }
              }}>开始导入 MongoDB Data</Button>
            </Tabs.Item>
            <Tabs.Item label="导入 Markdown Data" value="2">

              <ButtonGroup type="success" ghost scale={0.5}>

                <Button
                  onClick={async () => {
                    // multiple, accept=".md,.markdown", getFilelist in onChange Function
                    const $file = document.createElement('input')
                    $file.type = 'file'
                    $file.style.cssText = `position: absolute; opacity: 0; z-index: -9999;top: 0; left: 0`
                    $file.multiple = true
                    $file.accept = '.md,.markdown'
                    document.body.append($file)
                    $file.click()
                    $file.onchange = async () => {
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      const files = $file.files!
                      const formData = new FormData()
                      for (const file of files) {
                        formData.append('files', file)
                      }

                      const filesReader = new FileReader() // FileReader is a built-in object, used to read the contents of files.
                      for (let i = 0; i < files.length; i++) {
                        filesReader.readAsText(files[i])
                        filesReader.onload = async (e) => {
                          const fileContent = e.target?.result as string
                          const fileName = files[i].name
                          const fileExt = fileName.split('.').pop()
                          const fileType = fileExt === 'md' ? 'markdown' : 'yaml'
                          const fileData = fileType === 'markdown' ? {
                            content: fileContent,
                            type: fileType,
                          } : {
                            content: fileContent,
                            type: fileType,
                            configs: ['yaml'],
                          }
                          console.log(fileData)
                          setFileList({
                            value: [
                              // ...fileList.value,
                              {
                                name: fileName,
                                file: fileData.content,
                                type: fileData.type,
                              }
                            ]
                          })
                        }
                      }
                      setFileList({
                        value: formData
                      })

                    }
                  }}
                >
                  1. 上传 Markdown Data
                </Button>
                <Button
                  onClick={async (e) => {
                    return await handleParse(e)
                  }}
                // disabled={!fileList.value.length}
                >
                  2. 解析数据文件
                </Button>
                <Button
                  onClick={async (e) => {
                    return await handleUpload(e)
                  }}
                // disabled={!parsedList.value.length}
                >
                  3. 开始恢复导入
                </Button>
              </ButtonGroup>
            </Tabs.Item>
          </Tabs>
        </Dashboards.Area>
      </Dashboards.Container>
    </NxPage>
  )
}