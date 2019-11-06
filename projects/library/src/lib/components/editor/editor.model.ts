export interface Editor {
  getContent: () => string;
}

export interface EditorEvent {
  editor: Editor;
  event: any;
}
