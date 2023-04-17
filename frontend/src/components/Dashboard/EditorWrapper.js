import React, { useRef, useEffect } from 'react';
import Editor from 'react-simple-code-editor';


const EditorWrapper = (props, ref) => {
  const editorRef = useRef();

  useEffect(() => {
    if (ref) {
      ref.current = {
        focus: () => {
          if (editorRef.current && editorRef.current.textarea) {
            editorRef.current.textarea.focus();
          }
        },
      };
    }
  }, [ref]);

  return <Editor {...props} ref={editorRef} />;
};

export default React.forwardRef(EditorWrapper);
