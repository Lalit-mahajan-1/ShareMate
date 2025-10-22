// RichTextEditor.jsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import './RichTextEditor.css'
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '<p></p>',
    editorProps: {
      attributes: {
        class: 'focus:outline-none custom-editor-area',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      if (onChange) onChange(html)
    },
  }, [])

  useEffect(() => {
    if (editor && onChange && !value) {
      onChange(editor.getHTML())
    }
  }, [editor])

  return (
    <div className="rte-shell">
      <div className="rte-grid">
        <EditorContent editor={editor} className="editor-content-area" />
        <div className="rte-toolbar-vert">
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={editor?.isActive('bold') ? 'is-active' : ''}
            title="Bold"
          ><FormatBoldIcon/></button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={editor?.isActive('italic') ? 'is-active' : ''}
            title="Italic"
          ><FormatItalicIcon/></button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            className={editor?.isActive('strike') ? 'is-active' : ''}
            title="Strike"
          ><StrikethroughSIcon/></button>
          <div className="rte-divider" />
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor?.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            title="Heading 1"
          >H1</button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor?.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            title="Heading 2"
          >H2</button>
          <div className="rte-divider" />
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={editor?.isActive('bulletList') ? 'is-active' : ''}
            title="Bullet list"
          ><FormatListBulletedIcon/></button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={editor?.isActive('orderedList') ? 'is-active' : ''}
            title="Ordered list"
          ><FormatListNumberedIcon/></button>
        </div>
      </div>
    </div>
  )
}

export default RichTextEditor