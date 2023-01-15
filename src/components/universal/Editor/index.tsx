import "vditor/dist/index.css";
import { useEffect, useState } from 'react';
import { useMedia } from 'react-use';
import styles from "./index.module.css"
import { Loading } from '../Loading';
import { getQueryVariable } from '../../../utils/url';
import Vditor from 'vditor';
import clsx from "clsx";


interface IEditor {
  initialValue?: string;
  onChange?: (value: string | undefined) => void;
  height?: string;
}

export const MarkdownEditor: React.FC<IEditor> = (props) => {
  const [vd, setVd] = useState<Vditor>();
  const isDark = useMedia('(prefers-color-scheme: dark)');
  const [render, setRender] = useState(false);
  const id = getQueryVariable("id")

  useEffect(() => {
    if (!render) return;
    setTimeout(() => {
      const vditor = !render ? undefined : new Vditor('editor', {
        height: props.height || "100%",
        cache: {
          id: id || "temp",
          enable: id ? true : false,
        },
        after: () => {
          setRender(true);
          vditor?.setValue(props.initialValue || "");
          setVd(vditor);
        },
        toolbarConfig: {
          pin: true,
        },
        preview: {
          markdown: {
            toc: true,
          },
        },
        counter: {
          enable: true,
          max: 100000,
        },
        hint: {
          emojiPath: "https://cdn.jsdelivr.net/npm/emojify.js/dist/images/basic/",
        },
        icon: "material",
        // upload: {
        //   accept: "image/*",
        //   url: "/api/upload",
        //   filename: (name) => {
        //     return Date.now() + name;
        //   }
        // },
        theme: isDark ? "dark" : "classic",
        // mode: "ir",
        input: (value) => {
          props.onChange && props.onChange(value);
        }
      });
    }, 1000);

  }, [render, props.initialValue, id])

  useEffect(() => {
    setRender(false);
    vd && vd.destroy();
    setVd(undefined);
    setTimeout(() => {
      setRender(true);
    }, 1000);
  }, [id, window.location.href, isDark])

  return (
    <div className={styles.editor}>
      <Loading loading={!vd} />
      <div className={clsx("loading", vd && "loaded")}>
        {
          render && <div id="editor" className={styles.editorInner} />
        }
      </div>
    </div>
  )
}