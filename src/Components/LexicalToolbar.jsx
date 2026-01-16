import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode } from "@lexical/rich-text";
import { $createParagraphNode } from "lexical";
import { $createListNode } from "@lexical/list";
import { $createQuoteNode } from "@lexical/rich-text";

export default function LexicalToolbar() {
  const [editor] = useLexicalComposerContext();
  return (
    <div className="flex flex-wrap gap-2 border-b p-2 bg-gray-50">
      <select
        onChange={(e) => {
          const value = e.target.value;
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(
                selection,
                value === "h1"
                  ? () => $createHeadingNode("h1")
                  : value === "h2"
                    ? () => $createHeadingNode("h2")
                    : value === "h3"
                      ? () => $createHeadingNode("h3")
                      : value === "h4"
                        ? () => $createHeadingNode("h4")
                        : value === "h5"
                          ? () => $createHeadingNode("h5")
                          : value === "h6"
                            ? () => $createHeadingNode("h6")
                            : () => $createParagraphNode()
              );
            }
          });
        }}
        className=" border p-1 rounded"
      >
        <option value="p">Normal</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="h4">Heading 4</option>
        <option value="h5">Heading 5</option>
        <option value="h6">Heading 6</option>
      </select>

      <input
        type="number"
        defaultValue={16}
        className="w-16 border p-1 rounded"
        onChange={(e) =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, {
            fontSize: `${e.target.value}px`,
          })
        }
      />

      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      >
        B
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      >
        I
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
      >
        U
      </button>

      <input
        type="color"
        onChange={(e) =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, {
            color: e.target.value,
          })
        }
      />

      <button
        onClick={() =>
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              selection.insertNodes([$createListNode("bullet")]);
            }
          })
        }
      >
        • List
      </button>

      <button
        onClick={() =>
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              selection.insertNodes([$createQuoteNode()]);
            }
          })
        }
      >
        ❝ Quote
      </button>

      <select onChange={(e) => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, e.target.value)}>
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
    </div>
  );
}
