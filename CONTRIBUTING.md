# Contributing to Starter.dev Project
Thanks for your interest in contributing to Starter.dev! Take a moment to review this document before submitting a pull request.

Please [read our Code of Conduct](CODE_OF_CONDUCT.md). By contributing to this repository, you are agreeing to its rules.

## Table of Content

- [Submitting a Pull Request (PR)](#submitting-a-pull-request-pr)
- [Coding Guidelines](#coding-guidelines)

---

## Submitting a Pull Request (PR)

Before you submit your Pull Request (PR), consider the following guidelines:

- search [the repositiory](https://github.com/thisdot/starter.dev/pulls) for an open or closed PR that relates to your submission. Help us reduce redundancies.
- If your PR is a new feature, such as a new starter kit, we request you create a [feature request](https://github.com/thisdot/starter.dev/discussions/new?category=ideas) to first discuss this new idea.

- Make your changes in your forked repository as a new git branch:
  ```shell
  git checkout -b my-fix-branch main
  ```
- If you are adding a kit, take a look at the [kit essentials](https://github.com/thisdot/starter.dev#starter-kit-essentials) to get information and structural pattern of a kit.
- Create your patch, following [code guidelines](#coding-guidelines).
- Commit your changes using a descriptive commit message

  ```shell
  git commit -a
  ```

  Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

- Push your branch to GitHub:

  ```shell
  git push origin my-fix-branch
  ```

- In GitHub, send a pull request to `this-dot/starter.dev:main`.
- If we suggest changes then:

  - Make the required updates.
  - Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase main -i
    git push -f
    ```

  - When updating your feature branch with the requested changes, please do not overwrite the commit history, but rather contain the changes in new commits. This is for the sake of a clearer and easier review process.

## Coding Guidelines

Consistency is important on an application such as this, where many developers will work on this product over long periods of time. Therefore, we expect all developers to adhere to a common set of coding practices and expectations. This section should be updated as the team decides on new standards.

- **Formatting** - We don't want to waste time debating tabs vs spaces. All code should be formatted using Prettier set to use the settings in the `.prettierc` file.

- **Minimal Pull Requests** - Do not commit changes to files where there was not a new feature added or an existing feature altered. Files altered only to remove unusued imports or change formatting should not be included in pull requests. Code authors are expected to review the files in each pull request and revert files that were only incidentally changed.

- **Code Comments** - We're not following a strict code commenting pattern (like js-doc), but developers are encouraged to use comments liberally where it may aid understandability and readability of the code (esepecially for new contributors). Comments that merely explain what a line of code does are not necessary. Instead, comments should indicate the intent of th author. It could mention assumptions, constraints, intent, algorithm design, etc.

- **Commit/Pull Request Comments** - Code authors are strongly recommended to communicate the reason for the code changes, the nature of the changes, and the intent of the changes in their Git commit messages (this information should also make it into PR descriptions as well). Additionally, while not strictly required, we recommend that code authors make comments in their pull requests where useful to help code reviewers understand the background/intent for some of the less obvious changes.
