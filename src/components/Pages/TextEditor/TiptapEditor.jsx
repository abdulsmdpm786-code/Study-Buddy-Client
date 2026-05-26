import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// 1. The Toolbar Component
const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  // A reusable button style
  const btnStyle = "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ";

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-slate-200 bg-slate-50 rounded-t-xl">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${btnStyle} ${editor.isActive('bold') ? 'bg-slate-800 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
      >
        Bold
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${btnStyle} ${editor.isActive('italic') ? 'bg-slate-800 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
      >
        Italic
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${btnStyle} ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-800 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
      >
        H2
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${btnStyle} ${editor.isActive('bulletList') ? 'bg-slate-800 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
      >
        Bullet List
      </button>
    </div>
  );
};

// 2. The Main Editor Component
export default function TiptapEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    // Set the initial content
    content: value,
    
    // TipTap strips native HTML styles (like <h2> looking big). 
    // We add Tailwind's 'prose' class to fix this, plus some min-height.
    editorProps: {
      attributes: {
        class: 'focus:outline-none', 
      },
    },

    // Every time the user types, send the HTML back to the parent
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border border-slate-300 rounded-xl bg-white shadow-sm overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}