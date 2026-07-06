const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const readmeTemplate = require("../templates/readme");
const installationTemplate = require("../templates/installation");
const userGuideTemplate = require("../templates/userGuide");
const technicalOverviewTemplate = require("../templates/technicalOverview");
const troubleshootingTemplate = require("../templates/troubleshooting");
const apiDocumentationTemplate = require("../templates/apiDocumentation");
const releaseNotesTemplate = require("../templates/releaseNotes");
function activate(context) {
  const command = vscode.commands.registerCommand(
    "vsDocsGenerator.open",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "docsGenerator",
        "VS Docs Generator",
        vscode.ViewColumn.Beside,
        {
          enableScripts: true,
        },
      );
      panel.webview.html = getWebview(panel.webview, context.extensionUri);
      panel.webview.onDidReceiveMessage((message) => {
        if (message.command === "generate") {
          generateDocument(message.template, message.projectName);
          panel.webview.postMessage({
            command: "success",

            template: message.template,
          });
        }
        if (message.command === "close") {
          panel.dispose();
        }
      });
    },
  );
  context.subscriptions.push(command);
}
function generateDocument(template, projectName) {
  if (!projectName) {
    projectName = "Project Name";
  }
  let content = "";
  switch (template) {
    case "README.md":
      content = readmeTemplate(projectName);
      break;
    case "Installation Guide":
      content = installationTemplate(projectName);
      break;
    case "User Guide":
      content = userGuideTemplate(projectName);
      break;
    case "Technical Overview":
      content = technicalOverviewTemplate(projectName);
      break;
    case "Troubleshooting Guide":
      content = troubleshootingTemplate(projectName);
      break;
    case "API Documentation":
      content = apiDocumentationTemplate(projectName);
      break;
    case "Release Notes":
      content = releaseNotesTemplate(projectName);
      break;
  }
  if (!vscode.workspace.workspaceFolders) {
    vscode.window.showErrorMessage(
      "Please open a folder before generating documentation.",
    );
    return;
  }
  const workspace = vscode.workspace.workspaceFolders[0].uri.fsPath;
  const docsPath = path.join(workspace, "docs");
  if (!fs.existsSync(docsPath)) {
    fs.mkdirSync(docsPath, {
      recursive: true,
    });
  }
  let fileName = "";
  if (template === "README.md") {
    fileName = "README.md";
  } else {
    fileName = template.toLowerCase().replaceAll(" ", "-") + ".md";
  }
  const filePath = path.join(docsPath, fileName);
  if (fs.existsSync(filePath)) {
    vscode.window.showWarningMessage(`${fileName} already exists`);
    return;
  }
  fs.writeFileSync(filePath, content);
  vscode.workspace.openTextDocument(filePath).then((doc) => {
    vscode.window.showTextDocument(doc);
  });
  vscode.window.showInformationMessage(`${template} generated successfully`);
}
function getWebview(webview, extensionUri) {
  const cssUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, "media", "style.css"),
  );
  const jsUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, "media", "main.js"),
  );
  return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="${cssUri}" rel="stylesheet">
</head>
<body>
  <div class="container">
    <h2>📄 Generate Documentation</h2>
    <label>Select Template</label>
    <select id="template">
      <option>README.md</option>
      <option>Installation Guide</option>
      <option>User Guide</option>
      <option>Technical Overview</option>
      <option>Troubleshooting Guide</option>
      <option>API Documentation</option>
      <option>Release Notes</option>
    </select>
    <p class="hint">
      Generate project docs
    </p>
    <label>Project Name (Optional)</label>
    <input 
      id="projectName"
      placeholder="e.g., My Awesome Project"
    />
    <button id="generateBtn">
      Generate
    </button>
<h3>Document Structure</h3>
<div id="documentStructure">
</div>
<div class="output" id="output">
  Ready to generate documentation
      <br>
      <span>/docs/folder</span>
    </div>
  </div>
<script src="${jsUri}"></script>
</body>
</html>
`;
}
function deactivate() {}
module.exports = {
  activate,
  deactivate,
};
