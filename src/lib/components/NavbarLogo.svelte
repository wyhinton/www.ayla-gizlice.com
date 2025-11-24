<script lang="ts">
  export let href: string = "/";
  export let text: string = "Ayla Gizlice";
</script>

<a class="navbar__logo" {href}>{text}</a>

<style>
  .navbar__logo {
    line-height: 4rem;
    margin-left: var(--page-margin);
    font-family: "Pragati Narrow";
    font-size: 45px;
    text-transform: capitalize;
    color: #d59494;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    transition: margin 0.5s ease-out;
    text-decoration: none;
  }

  @media (max-width: 567px) {
    .navbar__logo {
      font-size: 35px;
      margin-left: 1rem;
    }
  }
</style>
