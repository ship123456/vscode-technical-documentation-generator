const vscode = acquireVsCodeApi();
const button = document.getElementById("generateBtn");
const select = document.getElementById("template");
const structures = {
  "README.md": [
    "Overview",
    "Features",
    "Tech Stack",
    "Installation",
    "Usage",
    "Project Structure",
    "Screenshots",
    "Contributing",
    "License",
  ],

  "Installation Guide": [
    "Overview",
    "System Requirements",
    "Prerequisites",
    "Environment Setup",
    "Installation Steps",
    "Configuration",
    "Running the Application",
    "Verification",
    "Upgrade Instructions",
    "Uninstallation",
    "Troubleshooting",
    "Support",
  ],

  "User Guide": [
    "Introduction",
    "Getting Started",
    "User Interface Overview",
    "Features",
    "User Workflows",
    "Examples",
    "Settings and Preferences",
    "Tips and Best Practices",
    "Keyboard Shortcuts",
    "Troubleshooting",
    "FAQ",
    "Support",
  ],

  "Technical Overview": [
    "Introduction",
    "Architecture",
    "Technology Stack",
    "Project Structure",
    "Core Components",
    "Data Flow",
    "Configuration",
    "Dependencies",
    "Security Considerations",
    "Performance Considerations",
    "Error Handling",
    "Future Enhancements",
  ],

  "Troubleshooting Guide": [
    "Overview",
    "Common Issues",
    "Error Messages",
    "Installation Problems",
    "Configuration Issues",
    "Performance Issues",
    "Compatibility Issues",
    "Debugging Steps",
    "Logs and Diagnostics",
    "Known Limitations",
    "Contact Support",
  ],

  "API Documentation": [
    "Overview",
    "Base URL",
    "Authentication",
    "Endpoints",
    "Request Format",
    "Response Format",
    "Error Handling",
    "Rate Limits",
    "Examples",
    "Versioning",
    "Security",
    "Changelog",
  ],

  "Release Notes": [
    "Version Information",
    "Overview",
    "New Features",
    "Improvements",
    "Bug Fixes",
    "Performance Updates",
    "Security Updates",
    "Breaking Changes",
    "Migration Notes",
    "Known Issues",
    "Upcoming Changes",
  ],
};
function showStructure() {
  const selectedTemplate = select.value;
  document.getElementById("documentStructure").innerHTML = structures[
    selectedTemplate
  ]
    .map((item) => {
      return `<div class="card">📄 ${item}</div>`;
    })
    .join("");
}
select.addEventListener("change", showStructure);
showStructure();
window.addEventListener("message", (event) => {
  const message = event.data;

  if (message.command === "success") {
    button.disabled = false;
    button.innerText = "Generate";
    document.getElementById("output").innerHTML =
      `✅ ${message.template} generated successfully
      <br>
      Saved in /docs folder`;
  }
});

button.addEventListener("click", () => {
  button.disabled = true;
  button.innerText = "Generating...";
  const template = select.value;
  const projectName = document.getElementById("projectName").value;
  vscode.postMessage({
    command: "generate",
    template,
    projectName,
  });
});
