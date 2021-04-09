export interface Editor {
  getContent: () => string;
}

export interface EditorEvent {
  editor: Editor;
  event: any;
}

export const BASIC_PLUGINS = [
  'advlist autolink lists link image charmap print preview anchor',
  'searchreplace visualblocks code fullscreen',
  'insertdatetime media table contextmenu paste code'
];
export const BASIC_TOOLBAR = `undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link`;
export const FULL_PLUGINS = [
  'advlist autolink lists link image charmap print preview hr anchor pagebreak',
  'searchreplace wordcount visualblocks visualchars code fullscreen',
  'insertdatetime media nonbreaking save table contextmenu directionality',
  'template paste textcolor colorpicker textpattern imagetools toc help'
];
export const FULL_TOOLBAR = [
  `undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent`,
  'print preview | forecolor backcolor | link'
];
