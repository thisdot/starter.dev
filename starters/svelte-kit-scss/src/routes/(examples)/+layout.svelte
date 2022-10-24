<div class="example-container">
  <slot />
  <div class="footer">
    <a href="/">Return Home</a>
  </div>
</div>

<style lang="scss">
  .example-container {
    width: 60%;
    margin: 1.25rem auto;
    text-align: center;
    .footer {
      margin: 0.625rem 0;
      a {
        text-decoration-line: underline;
        color: #2563eb;
        font-size: 1.25rem;
        line-height: 1.75rem;
        :hover {
          color: #1e40af;
        }
      }
    }
  }
</style>
