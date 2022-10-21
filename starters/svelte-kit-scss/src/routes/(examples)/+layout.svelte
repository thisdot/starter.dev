<div class="example-container">
  <slot />
  <div class="footer">
    <a href="/">Return Home</a>
  </div>
</div>

<style lang="scss">
  .example-container {
    text-align: center;
    width: 60%;
    margin: 1.25rem auto;

    .footer{
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
  }
</style>
