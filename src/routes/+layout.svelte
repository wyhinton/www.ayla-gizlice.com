<script>
  import "../app.css";
  import Navigation from "$lib/components/Navigation.svelte";
  import DebugPanel from "$lib/components/DebugPanel.svelte";
  import { onMount } from "svelte";
  import { loadProjects } from "$lib/stores/projectStore";
  import { page } from "$app/stores";

  const GOOGLE_SHEETS_URL = "1ctMIVgrlfw0s9tYHcwuLuGjnrzI1YCaESEF18C4sIxM";

  onMount(async () => {
    // Load projects globally so they're available for all routes
    await loadProjects(GOOGLE_SHEETS_URL);

    // Add Google Analytics
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-LYL235LN22");
    }
  });
</script>

<svelte:head>
  <title>Ayla Gizlice</title>
  <meta
    name="description"
    content="Ayla Gizlice is a Los Angeles based sculptor, ceramicist, and installation artist."
  />
  <meta
    name="keywords"
    content="Artist, Sculpture, Raleigh, Los Angeles, Contemporary Art, Ceramics, UCLA, UNC, Conceptual Art, Turkish, Ceramics"
  />
  <meta name="author" content="Ayla Gizlice" />
  <meta property="og:image" content="/data/OGImage.jpg" />
  <meta property="og:title" content="Ayla Gizlice" />
  <meta
    property="og:description"
    content="Ayla Gizlice is a Turkish-American artist working in Raleigh, NC."
  />

  <!-- Bootstrap Utilities Only -->
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap-utilities.min.css"
    rel="stylesheet"
  />

  <!-- Google Fonts -->
  <link
    rel="preload"
    href="https://fonts.googleapis.com/css?family=Pragati+Narrow"
    as="style"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Pragati+Narrow&text=ABCDEFGHIJKLMNOPQRSTUVWXYZylaizce"
  />

  <!-- Favicon -->
  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href="/favicon/apple-touch-icon.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="32x32"
    href="/favicon/favicon-32x32.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="16x16"
    href="/favicon/favicon-16x16.png"
  />
  <link rel="manifest" href="/favicon/site.webmanifest" />
  <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
  <meta name="msapplication-TileColor" content="#da532c" />
  <meta name="theme-color" content="#ffffff" />

  <!-- Google Analytics -->
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-LYL235LN22"
  ></script>
</svelte:head>

<Navigation />

<main class:about-page={$page.route.id === "/about"}>
  <slot />
</main>

<!-- Debug Panel (only shows in development) -->
<DebugPanel />

<style>
  main {
    width: 100%;
    height: 100vh;
    position: relative;
  }

  main.about-page {
    overflow-y: auto;
  }
</style>
