<div class="container">
  <h1>SvelteKit with SCSS Starter Kit</h1>
  <ul class="links">
    <li>
      <a href="/counter">See Counter example component</a>
    </li>
    <li>
      <a href="/api-example">See Fetch example component</a>
    </li>
  </ul>
  <div class="center">
    <a href="https://www.netlify.com">
      <img
        src="https://www.netlify.com/v3/img/components/netlify-light.svg"
        alt="Deploys by Netlify"
      />
    </a>
  </div>
</div>

<style lang="scss">
  .container {
    width: 60%;
    margin: 1.25rem auto;
    text-align: center;

    h1 {
      font-size: 1.5rem;
      line-height: 2rem;
      font-weight: 600;
      color: #ffffff;
      padding: 1rem;
      border-radius: 0.25rem;
      background-color: #2563eb;
    }

    .links {
      margin: 0.625rem 0;
      padding: 0;
      list-style-type: none;

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

    .center {
      display: flex;
      justify-content: center;
    }
  }
</style>
