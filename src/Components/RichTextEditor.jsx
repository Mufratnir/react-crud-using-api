import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes } from "@lexical/html";
// import { $getRoot, EditorState } from "lexical";
import LexicalToolbar from "./LexicalToolbar";

export default function RichTextEditor({ onChange }) {
  const initalconfig = {
    namespace: "Editor",
    onerror(error) {
      console.error(error);
    },
  };
  return (
        <LexicalComposer initialConfig={initalconfig}>
                <div className="border rounded" >
                <LexicalToolbar />
                <RichTextPlugin
                   contentEditable={
                        <ContentEditable className="min-h-[150px] p-2 outline-none"/>
                   }
                   placeholder={<div className="p-2 text-gray-400">write here...</div>}
                />
                <HistoryPlugin/>

                <OnChangePlugin
                    onChange={(editorState, editor)=> {
                        editorState.read(() =>{
                                const html = $generateHtmlFromNodes(editor);
                                onChange(html);
                        })
                    }}
                />
                </div>
        </LexicalComposer>
  );
}
