import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // or another Quill theme CSS

const QuillEditor = ({ value, onChange }) => {
  const handleChange = (content, _, __, editor) => {
    onChange(content);
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      modules={QuillEditor.modules}
      formats={QuillEditor.formats}
    />
  );
};

QuillEditor.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }, { 'size': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
    [{ 'align': [] }],
    ['blockquote', 'code-block'],
    ['clean']
  ],
};

QuillEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline',
  'list', 'bullet',
  'link', 'image', 'align',
  'blockquote', 'code-block'
];

export default QuillEditor;
