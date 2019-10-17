import React, { Component } from 'react';
import {EditorState, convertToRaw, ContentState} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export default class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    
  }
  state = {
    editorState: EditorState.createEmpty(),
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  }
  getDetail = () => {
    // 返回输入的标签文本
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }
  
  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        editorStyle={{minHeight: 200, padding:10, border: '1px solid #ccc'}}
        onEditorStateChange={this.onEditorStateChange}
      />
    )
  }
}