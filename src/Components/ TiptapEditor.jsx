import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

export default function TiptapEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'tiptap-paragraph',
          },
        },
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        listItem: {
          HTMLAttributes: {
            class: 'tiptap-list-item',
          },
        },
      }),
      Placeholder.configure({
        placeholder: '',
        showOnlyWhenEditable: true,
        showOnlyCurrent: true,
      }),
    ],
    content: value || "<p>Hello world</p>",
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    }
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-lg p-4">
      <div className="flex flex-wrap gap-1 mb-3 border-b pb-2 bg-white sticky top-0 z-10">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          className={`px-2 py-1 rounded transition
            ${editor.isActive("bold") ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"}
          `}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          className={`px-2 py-1 rounded transition
            ${editor.isActive("italic") ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"}
          `}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          className={`px-2 py-1 rounded transition
            ${editor.isActive("bulletList") ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"}
          `}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          UL
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          className={`px-2 py-1 rounded transition
            ${editor.isActive("orderedList") ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"}
          `}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          OL
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          className={`px-2 py-1 rounded transition
            ${editor.isActive("heading", { level: 1 }) ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"}
          `}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          className={`px-2 py-1 rounded transition
            ${editor.isActive("heading", { level: 2 }) ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"}
          `}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          className={`px-2 py-1 rounded transition
            ${editor.isActive("heading", { level: 3 }) ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"}
          `}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          className={`px-2 py-1 rounded transition
            ${editor.isActive("heading", { level: 4 }) ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"}
          `}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          H4
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          className={`px-2 py-1 rounded transition
            ${editor.isActive("heading", { level: 5 }) ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"}
          `}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
        >
          H5
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          className={`px-2 py-1 rounded transition
            ${editor.isActive("heading", { level: 6 }) ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"}
          `}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
        >
          H6
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          className={`px-2 py-1 rounded transition
            ${
              editor.isActive("paragraph") &&
              !editor.isActive("heading") &&
              !editor.isActive("bulletList") &&
              !editor.isActive("orderedList")
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "hover:bg-gray-100"
            }
          `}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          P
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="tiptap border p-2 rounded min-h-[200px] prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
      />
    </div>
  );
}
