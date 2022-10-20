<div>
  <slot />
  <div>
    <a href="/">Return Home</a>
  </div>
</div>

<style lang="scss">
  div {
    text-align: center;
    margin: 0.625rem 0;

    a {
      font-size: 1.2rem;
      color: #2563eb;
      &:hover {
        color: #1e40af;
        text-decoration: underline;
      }
    }
  }
</style>
