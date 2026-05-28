# Pipelines

## Test Pipelines

- This pipeline should be implemented as a GitHub Actions workflow.
- Name the pipeline "Run Playwright Tests".
- Run all tests in the `tests` directory using the `npm test` command.
- Enable the pipeline to run in three ways:
  1. Whenever a pull request is opened.
  2. Whenever changes merge into the `main` branch.
  3. Whenever someone manually triggers the pipeline from the Actions page for the repository.
- The pipeline should cache files like Node packages and Playwright browsers for subsequent runs.
- Playwright should generate HTML reports in addition to the list of results printed in the terminal.
- The pipeline should upload the HTML reports and any other test result files as artifacts for testers to access.
