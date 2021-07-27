import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from '../ui/Form';

export default function Editor_({ setHtml }) {
  const editorRef = useRef(null);

  const addContent = () => {
    if (editorRef.current) {
      setHtml(editorRef.current.getContent());
    }
  };

  return (
    <section>
      <Editor
        onChange={addContent}
        apiKey={process.env.NEXT_PUBLIC_TINY_MCE}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
    </section>
  );
}
