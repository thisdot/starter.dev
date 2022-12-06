# deno-oak-denodb starter kit

## Formatting and Linting

To run the linting on the project:
```
deno lint
```

To format the files before pushing code:
```
deno fmt
```

## Running Application locally

Download the project's dependencies into the machine's cache, integrity checking each resource.
```
deno cache --reload --lock=lock.json deps.ts
deno cache --reload --lock=lock.json dev_deps.ts
```

To run locally;
```
deno run --allow-net --allow-env --allow-read ./src/main.ts
```
