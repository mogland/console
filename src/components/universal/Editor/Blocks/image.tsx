import { DefaultBlockSchema } from "@blocknote/core";
import { InlineContent, ReactSlashMenuItem, createReactBlockSpec } from "@blocknote/react";
import { ImageFiles } from "@icon-park/react";

export const ImageBlock = createReactBlockSpec({
  type: "image",
  propSchema: {
    src: {
      default: "",
    },
    alt: {
      default: "",
    },
  },
  containsInlineContent: false,
  render: ({ block }) => {
    return (
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}>
          <img
            style={{
              width: "100%",
            }}
            src={block.props.src}
            alt={block.props.alt}
            contentEditable={false}
          />
          <InlineContent />
        </div>
      )
    )
  },
});

export const insertImage = new ReactSlashMenuItem<DefaultBlockSchema & { image: typeof ImageBlock }>(
  "Insert Image",
    (editor) => {
      const src: string | null = prompt("Enter image URL");
      editor.insertBlocks(
        [
          {
            type: "image",
            props: {
              src: src || "https://via.placeholder.com/1000",
            },
          },
        ],
        editor.getTextCursorPosition().block,
        "after"
      );
    },
    ["image", "img", "picture", "media"],
    "Media",
    <ImageFiles />,
    "Insert an image"
)