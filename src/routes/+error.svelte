<!-- @ts-nocheck -->
<script>
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Add some animation or effects if needed
  });
</script>

<svelte:head>
  <title>Page Not Found - Ayla Gizlice</title>
  <meta name="description" content="The page you're looking for could not be found.">
</svelte:head>

<div class="error-container">
  <div class="error-content">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>
      The page you're looking for seems to have wandered off like a piece of clay 
      that's escaped the studio.
    </p>
    <div class="error-actions">
      <a href="/" class="home-link">
        Back to Projects
      </a>
      <a href="/about" class="about-link">
        About the Artist
      </a>
    </div>
  </div>
  
  <div class="error-visual">
    <div class="clay-blob"></div>
  </div>
</div>

<style>
  .error-container {
    width: 100%;
    height: 100vh;
    background-color: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px 20px 20px 20px;
    box-sizing: border-box;
  }
  
  .error-content {
    max-width: 600px;
    text-align: center;
  }
  
  .error-content h1 {
    font-family: 'Pragati Narrow', sans-serif;
    font-size: 8rem;
    margin-bottom: 1rem;
    color: var(--green);
    text-transform: uppercase;
    letter-spacing: 4px;
    line-height: 1;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: black;
  }
  
  .error-content h2 {
    font-family: 'Pragati Narrow', sans-serif;
    font-size: 3rem;
    margin-bottom: 2rem;
    color: black;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
  
  .error-content p {
    font-family: 'Pragati Narrow', sans-serif;
    font-size: 1.3rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    color: black;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .error-actions {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 3rem;
    flex-wrap: wrap;
  }
  
  .error-actions a {
    padding: 15px 30px;
    background-color: var(--green);
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-family: 'Pragati Narrow', sans-serif;
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: background-color 0.3s ease;
    display: inline-block;
  }
  
  .error-actions a:hover {
    background-color: rgba(33, 116, 107, 0.8);
  }
  
  .about-link {
    background-color: transparent !important;
    color: black !important;
    border: 2px solid black;
  }
  
  .about-link:hover {
    background-color: black !important;
    color: white !important;
  }
  
  .error-visual {
    position: absolute;
    bottom: 10%;
    right: 10%;
    opacity: 0.1;
    z-index: -1;
  }
  
  .clay-blob {
    width: 200px;
    height: 200px;
    background-color: var(--green);
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    animation: morph 8s ease-in-out infinite;
  }
  
  @keyframes morph {
    0% {
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    }
    50% {
      border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    }
    100% {
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    }
  }
  
  @media (max-width: 768px) {
    .error-container {
      padding: 120px 20px 20px 20px;
    }
    
    .error-content h1 {
      font-size: 5rem;
    }
    
    .error-content h2 {
      font-size: 2rem;
    }
    
    .error-content p {
      font-size: 1.1rem;
    }
    
    .error-actions {
      flex-direction: column;
      align-items: center;
    }
    
    .error-actions a {
      width: 80%;
      text-align: center;
    }
    
    .error-visual {
      display: none;
    }
  }
</style>
