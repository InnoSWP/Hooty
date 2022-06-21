export const onOpen = () => {
  const menu = SlidesApp.getUi()
    .createMenu('Hooty')
    .addItem('Create a quiz', 'openQuizCreation')

  menu.addToUi();
};

// export const openDialog = () => {
//   const html = HtmlService.createHtmlOutputFromFile('dialog-demo')
//     .setWidth(600)
//     .setHeight(600);
//     SlidesApp.getUi().showModalDialog(html, 'Sheet Editor');
// };

// export const openDialogBootstrap = () => {
//   const html = HtmlService.createHtmlOutputFromFile('dialog-demo-bootstrap')
//     .setWidth(600)
//     .setHeight(600);
//     SlidesApp.getUi().showModalDialog(html, 'Sheet Editor (Bootstrap)');
// };

export const openQuizCreation = () => {
  const sidebar = HtmlService.createHtmlOutputFromFile('quiz-creation-page');
  sidebar.setTitle('Hooty');
  SlidesApp.getUi().showSidebar(sidebar);
};
