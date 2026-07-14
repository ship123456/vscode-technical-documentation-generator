# VS Documentation Generator Architecture

This document describes the overall architecture of the VS Documentation Generator extension. It explains how the extension integrates with Visual Studio Code, how its components communicate, and how documentation files are generated within the user's workspace.

---

## Table of Contents

- [Overview](#overview)
- [High-Level Architecture](#high-level-architecture)
- [System Architecture Diagram](#system-architecture-diagram)
- [Extension Activation](#extension-activation)
- [Core Components](#core-components)
- [Communication Flow](#communication-flow)
- [Document Generation Workflow](#document-generation-workflow)
- [Folder Structure](#folder-structure)
- [Design Decisions](#design-decisions)
- [Limitations](#limitations)
- [Future Enhancements](#future-enhancements)

---

## Overview

VS Documentation Generator follows a client-host architecture provided by the Visual Studio Code Extension API.

The extension consists of two primary execution environments:

- **Extension Host**, where the extension logic executes.
- **Webview**, which provides the user interface.

The Extension Host manages Visual Studio Code APIs, file system operations, workspace interaction, and document generation. The Webview provides an interactive interface where users select documentation templates and initiate document generation.

These two components communicate through message passing, allowing the user interface and extension logic to remain isolated while working together efficiently.

---

## High-Level Architecture

The extension follows a two-layer architecture consisting of an Extension Host and a Webview Interface.

### Extension Host (`extension.js`)

Responsibilities include:

- Registering commands
- Creating the Webview
- Handling workspace operations
- Generating documentation
- Performing file system operations

### Webview (`main.js`)

Responsibilities include:

- Displaying the documentation generator interface
- Showing available templates
- Previewing document section headings
- Collecting user input
- Sending generation requests to the Extension Host

The separation of responsibilities improves maintainability and follows the Visual Studio Code extension architecture.

---

## System Architecture Diagram

```text
                Visual Studio Code
                        │
                        ▼
          Command Palette / Extension Command
                        │
                        ▼
           Extension Host (extension.js)
                        │
            Creates Webview Panel
                        │
                        ▼
                Webview Interface
                  (main.js)
                        │
         User selects template & project name
                        │
                postMessage()
                        │
                        ▼
           Extension Host receives request
                        │
          Generate Markdown Template
                        │
          Create /docs folder if required
                        │
          Write Markdown File
                        │
          Open Generated Document
                        │
          Send Success Message
                        │
                        ▼
              Update Webview UI
```

---

## Extension Activation

The extension uses **command-based activation**.

Visual Studio Code activates the extension only when the user executes the registered command:

```text
VS Documentation Generator: Open
```

When activated, the extension:

1. Registers the documentation generator command.
2. Creates a Webview panel.
3. Loads the HTML, CSS, and JavaScript resources.
4. Waits for messages from the Webview to process user actions.

This activation strategy reduces startup overhead by loading the extension only when required.

---

## Core Components

### Extension Host

The Extension Host manages the core functionality of the extension.

Responsibilities include:

- Registering commands
- Creating the Webview
- Handling incoming messages
- Generating documentation
- Managing the workspace
- Creating folders
- Writing Markdown files
- Opening generated documents

### Webview Interface

The Webview provides the graphical interface displayed inside Visual Studio Code.

It allows users to:

- Select documentation templates
- Enter a project name
- Preview document section headings
- Generate documentation
- View generation status

The Webview does not directly access the workspace. Instead, it communicates with the Extension Host using Visual Studio Code's messaging API.

### Template Modules

Each documentation type is implemented as an independent template module.

Supported templates include:

- README
- Installation Guide
- User Guide
- Technical Overview
- Troubleshooting Guide
- API Documentation
- Release Notes

Each template module generates structured Markdown content based on the selected template and project name.

---

## Communication Flow

The Webview and Extension Host communicate using Visual Studio Code's messaging API through `postMessage()` and `onDidReceiveMessage()`.

### Generation Request

1. The user clicks **Generate**.
2. The Webview collects:
   - Selected template
   - Project name
3. The Webview sends a **generate** message to the Extension Host.

### Document Generation

The Extension Host:

- Receives the request
- Selects the appropriate template module
- Generates Markdown content
- Creates the `/docs` directory if required
- Prevents overwriting existing files
- Writes the generated document
- Opens the generated document automatically

### Success Response

After generation completes successfully, the Extension Host sends a success message back to the Webview.

The Webview then:

- Re-enables the Generate button
- Displays the generated template name
- Updates the status message shown to the user

This message-based communication keeps the user interface and extension logic independent while enabling efficient interaction.

---

## Document Generation Workflow

```text
User opens extension
        │
        ▼
Select template
        │
        ▼
Enter project name
        │
        ▼
Click Generate
        │
        ▼
Webview sends request
        │
        ▼
Extension Host receives request
        │
        ▼
Select template module
        │
        ▼
Generate Markdown
        │
        ▼
Verify workspace exists
        │
        ▼
Create /docs folder if required
        │
        ▼
Check existing file
        │
        ▼
Write Markdown file
        │
        ▼
Open generated document
        │
        ▼
Send success message
        │
        ▼
Update Webview UI
```

---

## Folder Structure

```text
vs-documentation-generator/

├── .vscode/
│   └── launch.json
│
├── images/
│   ├── demo.gif
│   └── logo.png
│
├── media/
│   ├── main.js
│   └── style.css
│
├── src/
│   └── extension.js
│
├── templates/
│   ├── apiDocumentation.js
│   ├── installation.js
│   ├── readme.js
│   ├── releaseNotes.js
│   ├── technicalOverview.js
│   ├── troubleshooting.js
│   └── userGuide.js
│
├── .gitignore
├── .vscodeignore
├── LICENSE
├── package.json
├── README.md
├── ARCHITECTURE.md
└── TECHNICAL-OVERVIEW.md
```

Each directory has a dedicated responsibility, making the project modular, organized, and easier to maintain.

---

## Design Decisions

The following architectural decisions were made to improve maintainability, usability, and scalability:

- Separate the user interface from extension logic using a Webview.
- Store each documentation template in a separate module to simplify maintenance and future expansion.
- Generate documentation inside a dedicated `/docs` folder to keep the workspace organized.
- Prevent accidental overwriting of existing documentation files.
- Automatically open generated documents after creation.
- Use command-based activation to minimize startup overhead.
- Use message passing to maintain a clear separation between the Webview and Extension Host.

---

## Limitations

The current implementation has several limitations:

- Supports only predefined documentation templates.
- Generates Markdown (`.md`) files only.
- Processes one document at a time.
- Does not automatically update existing documentation.
- Does not synchronize generated documentation with source code changes.

---

## Future Enhancements

Potential improvements include:

- AI-assisted documentation generation.
- Automatic documentation updates.
- Batch generation of multiple documents.
- Support for user-defined documentation templates.
- Template customization through extension settings.
- Export support for PDF and HTML.
- Integration with project metadata for smarter template generation.
- Publish the extension to the Visual Studio Code Marketplace.
