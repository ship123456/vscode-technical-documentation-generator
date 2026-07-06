function apiDocumentationTemplate(projectName = "Project Name") {
  return `# ${projectName} API Documentation

## Overview

Provide an introduction to the API and its purpose.

## Base URL

Specify the base URL used to access the API.

## Authentication

Explain authentication methods, tokens, and access requirements.

## Endpoints

Document available API endpoints and their functionality.

## Request Format

Describe request parameters, headers, and body structure.

## Response Format

Explain response objects, status codes, and returned data.

## Error Handling

List common API errors, error codes, and solutions.

## Rate Limits

Describe request limits and usage restrictions.

## Examples

Provide sample API requests and responses.

## Versioning

Explain API versions and compatibility information.

## Security

Describe security practices and recommendations.

## Changelog

Track API changes and updates.

`;
}

module.exports = apiDocumentationTemplate;
