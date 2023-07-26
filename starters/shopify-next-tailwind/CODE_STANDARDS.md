# Code Standards

This document would like to be a comprehensive resource that outlines the decisions and guidelines we have established to foster greater uniformity within our codebase. In this document, we aim to establish a set of best practices, conventions, and principles that will serve as our standardized framework for developing high-quality code.

Within this document, we will cover various aspects of code development, including coding style, naming conventions, documentation practices, and architectural principles. Our goal is to create a clear and concise guide that aligns with industry best practices and reflects the specific needs and preferences of our organization.

### **_Naming Conventions_**

- All Pages' component should be named as `[Pluralized Object Model]Page`, if the Page is an Add/Edit form the component should be named as `[Pluralized Object Model][Add/Edit]Page`.

### **_Formatting Conventions_**

- We encourage the use of `clsx` library for conditionals `className`, let's try to avoid nested ternary in template strings when we define a `className`.

```javascript
//avoid this
className={`${isHome
        ? 'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader'
        : 'bg-contrast/80 text-primary'
        } ${!isHome && y > 50 && 'shadow-lightHeader'
        } hidden h-nav lg:flex items-center sticky transition duration-300 backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-8 px-12 py-8`}

//prefer this
className={clsx('hidden h-nav lg:flex items-center sticky transition duration-300 backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-8 px-12 py-8',
        {
          'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader': isHome,
          'bg-contrast/80 text-primary': !isHome,
          'shadow-lightHeader': !isHome && y > 50,
        })};
```

### **_Commenting Conventions_**

- Use comments to explain why code is written, not what it does.
- Use inline comments sparingly and only when necessary.

### **_Miscellaneus Conventions_**

- Avoid using global variables.
- Use constants for values that do not change.
- Use ES6 features when possible.
- Use TypeScript for type checking.
