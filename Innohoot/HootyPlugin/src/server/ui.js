export const onOpen = () => {
  const menu = SlidesApp.getUi()
    .createMenu('Hooty')
    .addItem('Test Editor', 'openDialog')
    .addItem('Test Editor (Bootstrap)', 'openDialogBootstrap')
    .addItem('About me', 'openAboutSidebar');

  menu.addToUi();
};

export const openDialog = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo')
    .setWidth(600)
    .setHeight(600);
    SlidesApp.getUi().showModalDialog(html, 'Sheet Editor');
};

export const openDialogBootstrap = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo-bootstrap')
    .setWidth(600)
    .setHeight(600);
    SlidesApp.getUi().showModalDialog(html, 'Sheet Editor (Bootstrap)');
};

export const openAboutSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('sidebar-about-page');
  SlidesApp.getUi().showSidebar(html);
};
