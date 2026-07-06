function releaseNotesTemplate(projectName = "Project Name") {
  return `# ${projectName} Release Notes

## Version Information

Provide the release version, date, and release details.

## Overview

Summarize the purpose and highlights of this release.

## New Features

List newly added features and functionality.

## Improvements

Describe enhancements made to existing features.

## Bug Fixes

List resolved issues and fixes included in this release.

## Performance Updates

Mention performance improvements and optimizations.

## Security Updates

Document security fixes or important updates.

## Breaking Changes

Mention changes that may affect existing users or integrations.

## Migration Notes

Provide upgrade steps or migration instructions if required.

## Known Issues

List current limitations or unresolved problems.

## Upcoming Changes

Mention planned improvements or future updates.

`;
}

module.exports = releaseNotesTemplate;
