# create-starter

A CLI for generating starter.dev kits

### Scaffolding for starter.dev kits

**With NPM:**

```sh
npm create @this-dot/starter
```

**With Yarn:**

```sh
yarn create @this-dot/starter
```

`creater-starter` automatically runs in _interactive_ mode, but you can also specify your project name and kit with command line arguments.

```sh
# npm 6.x
npm create @this-dot/starter --name my-project --kit angular-apollo-tailwind

# npm 7+, extra double-dash is needed:
npm create @this-dot/starter -- --name my-project --kit angular-apollo-tailwind

# yarn
yarn create @this-dot/starter --name my-project --kit angular-apollo-tailwind
```

### CLI Flags

May be provided in place of prompts

| Name     | Description                             |
| :------- | :-------------------------------------- |
| `--kit`  | Specify the kit name ([list][examples]) |
| `--name` | Specify your new project name           |
