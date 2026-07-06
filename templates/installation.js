function installationTemplate(projectName = "Project Name") {
  return `# ${projectName} Installation Guide

## Overview

Provide a brief introduction to the installation process and setup requirements.

## System Requirements

List the required operating systems, software versions, and hardware requirements.

## Prerequisites

Mention tools, dependencies, or accounts required before installation.

## Environment Setup

Describe environment preparation steps before running the project.

## Installation Steps

Provide step-by-step instructions to install the project.

## Configuration

Explain required settings, environment variables, or configuration files.

## Running the Application

Steps to start and access the application after installation.

## Verification

Explain how to confirm that the installation was successful.

## Upgrade Instructions

Steps required to update or upgrade the project.

## Uninstallation

Explain how to remove the project safely.

## Troubleshooting

Common installation issues and their solutions.

## Support

Provide information about where users can get help.

`;
}

module.exports = installationTemplate;
