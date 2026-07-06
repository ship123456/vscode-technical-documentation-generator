# <img src="images/logo.png" width="35"> VS Documentation Generator

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![VS Code](https://img.shields.io/badge/VS%20Code-Extension-blue)

Generate structured Markdown documentation for your projects directly inside Visual Studio Code.

![VS Documentation Generator Demo](images/demo.gif)

## Features

- Generate structured Markdown documentation directly inside VS Code
- Preview document structure before generating files
- Add custom project names to generated documentation
- Automatically creates a `/docs` folder in your workspace
- Generates structured Markdown template files
- Opens generated documents instantly for editing
- Works directly with your current VS Code workspace
- Prevents accidental overwriting of existing documentation files

## Supported Templates

- README.md
- Installation Guide
- User Guide
- Technical Overview
- Troubleshooting Guide
- API Documentation
- Release Notes

## Installation

### Install from Visual Studio Code Marketplace

1. Open **Visual Studio Code**.

2. Go to the Extensions view:

```text
Ctrl + Shift + X   (Windows/Linux)
Cmd + Shift + X    (macOS)
```

3. Search for:

```text
VS Documentation Generator
```

4. Click **Install**.

5. Open the Command Palette and run:

```text
VS Documentation Generator: Open
```

---

### Install from VSIX (Manual Installation)

1. Download the `.vsix` extension file.

2. Open Visual Studio Code.

3. Go to:

```text
Extensions → More Actions (...) → Install from VSIX
```

4. Select the downloaded `.vsix` file.

5. Start generating documentation.

## Usage

1. Open a project folder in Visual Studio Code.

2. Open the Command Palette:

```text
Ctrl + Shift + P   (Windows/Linux)
Cmd + Shift + P    (macOS)
```

3. Run the command:

```text
VS Documentation Generator: Open
```

4. Select the documentation template you want to generate.

5. Enter a project name (optional).

6. Click **Generate**.

7. The documentation file will be created automatically inside:

```text
/docs
```

8. The generated Markdown file opens automatically for editing.

## Extension Commands

| Command | Description |
|---|---|
| VS Documentation Generator: Open | Opens the documentation generator |

## Requirements

No additional dependencies are required.

## Known Issues

There are currently no known issues.

If you find a bug or unexpected behavior, please report it through the project repository.

## FAQ

### Where are generated files saved?

Generated files are saved inside the `/docs` folder of the current workspace.

### Can I generate multiple documentation files?

Yes. You can generate multiple documentation files using different templates.

### Can I add a custom project name?

Yes. The entered project name is automatically added to the generated documentation title.

### Will existing documentation files be overwritten?

No. Existing files are protected from accidental overwrites.

### Can I edit generated documentation?

Yes. Generated Markdown files can be edited like any other file in VS Code.

### Does this extension generate complete project documentation automatically?

No. It creates structured documentation templates that can be customized based on your project.

## Release Notes

### 1.0.0

Initial release:

- Added documentation template generation
- Added document structure preview
- Added automatic docs folder creation
- Added multiple documentation templates
- Added automatic file opening after generation
- Added project name customization
- Added overwrite protection

## License

This project is licensed under the MIT License.