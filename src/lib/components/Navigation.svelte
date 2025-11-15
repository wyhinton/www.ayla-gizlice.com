<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  let mobileMenuOpen = false;
  
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
  
  onMount(() => {
    // Add Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css?family=Pragati+Narrow';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  });
</script>

<div id="navContainer" on:click={(e)=>console.log(e)}>
  <div class="navBarSection">
    <nav class="navbar" id="navbar">
      <a class="navbar__logo" id="logoMark" href="/">Ayla Gizlice</a>
      
      <label class="navbar__hamburger-btn" on:click={toggleMobileMenu} on:keydown={toggleMobileMenu}>
        <i id="navButton">
          <div id="navSymbolContainer">
            <div id="innerNavButtonCircle"></div>
            <i class="fas fa-times" id="newCloseButton" aria-hidden="true"></i>
          </div>
        </i>
      </label>
      
      <ul class="navbar__ul" id="navBarListContainer" class:open={mobileMenuOpen}>
        <li>
          <a 
            class="pageLink" 
            href="/" 
            class:active={$page.url.pathname === '/'}
            on:click={() => mobileMenuOpen = false}
          >
            <i id="indicatorSymbole"> </i>Projects
          </a>
        </li>
        <li>
          <a 
            class="pageLink" 
            href="/about"
            class:active={$page.url.pathname === '/about'}
            on:click={() => mobileMenuOpen = false}
          >
            About
          </a>
        </li>
        <li>
          <a 
            class="pageLink" 
            href="/contact"
            class:active={$page.url.pathname === '/contact'}
            on:click={() => mobileMenuOpen = false}
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  </div>
</div>

<style>
  nav {
    height: 4rem;
    width: 100%;
    text-transform: uppercase;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }

  .navbar__hamburger-btn {
    font-size: 2rem;
    color: #7f7f7f;
    float: right;
    line-height: 4rem;
    margin-right: 2rem;
    cursor: pointer;
    display: none;
    position: absolute;
    right: 0;
    top: 0;
  }

  .navbar__logo {
    line-height: 4rem;
    margin-left: 3rem;
    font-family: 'Pragati Narrow';
    font-size: 45px;
    text-transform: capitalize;
    color: #d59494;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    transition: margin .5s ease-out;
    text-decoration: none;
  }

  nav ul {
    float: right;
    margin-right: 1rem;
    margin-top: 0;
    margin-bottom: 0;
    position: fixed;
    right: 0;
    top: 0;
    list-style: none;
    padding: 0;
  }

  nav ul li {
    display: inline-block;
    line-height: 4rem;
    margin: 0 1rem;
  }

  nav ul li a {
    color: black;
    font-size: 1.8rem;
    padding: 0.5rem 0.8rem;
    border-radius: 0.2rem;
    letter-spacing: 0px;
    text-decoration: none;
    -webkit-text-fill-color: rgb(208, 208, 208);
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    font-family: 'Pragati Narrow';
    z-index: 101;
  }

  nav ul li a:hover {
    transition: 0.2s;
    -webkit-text-fill-color: white;
  }

  nav ul li a.active {
    -webkit-text-fill-color: white;
  }

  .navBarSection {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
  }

  #navContainer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 100;
    opacity: 1;
  }

  @media (max-width: 768px) {
    .navbar__hamburger-btn {
      display: block;
    }
    
    nav ul {
      position: fixed;
      top: 0;
      right: -100%;
      width: 100%;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.9);
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: right 0.3s ease;
      display: flex;
    }
    
    nav ul.open {
      right: 0;
    }
    
    nav ul li {
      margin: 1rem 0;
      line-height: 2rem;
    }
    
    nav ul li a {
      font-size: 2rem;
    }
    
    .navbar__logo {
      font-size: 35px;
      margin-left: 1rem;
    }
  }
</style>
