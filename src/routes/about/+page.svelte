<!-- @ts-nocheck -->
<script>
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Page specific setup
  });
</script>

<svelte:head>
  <title>Ayla Gizlice - About</title>
  <meta name="description" content="About Ayla Gizlice - Turkish-American artist working in ceramics and sculpture">
</svelte:head>

<div class="about-container">
  <div class="about-content">
    <div class="about-text">
      <h1>About Ayla</h1>
      
      <div class="bio-section">
        <p>
          Ayla Gizlice is a Turkish-American artist whose work explores themes of identity, 
          materiality, and the intersection of traditional craft with contemporary art practices.
        </p>
        
        <p>
          Working primarily in ceramics and sculpture, Gizlice creates installations that 
          examine cultural memory, displacement, and the ways in which objects carry meaning 
          across time and space.
        </p>
        
        <p>
          Her work has been exhibited in galleries throughout North Carolina and California, 
          where she has developed a distinctive voice in contemporary ceramic arts.
        </p>
      </div>
      
      <div class="education-section">
        <h2>Education</h2>
        <ul>
          <li>MFA, University of California, Los Angeles (UCLA)</li>
          <li>BFA, University of North Carolina</li>
        </ul>
      </div>
      
      <div class="contact-info">
        <h2>Studio Location</h2>
        <p>Raleigh, North Carolina</p>
      </div>
    </div>
    
    <div class="about-image">
      <img src="/data/artist-photo.jpg" alt="Ayla Gizlice" />
    </div>
  </div>
</div>

<style>
  .about-container {
    width: 100%;
    height: 100vh;
    background-color: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px 20px 20px 20px;
    box-sizing: border-box;
  }
  
  .about-content {
    max-width: 1200px;
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 60px;
    align-items: start;
  }
  
  .about-text {
    padding-right: 40px;
  }
  
  .about-text h1 {
    font-family: 'Pragati Narrow', sans-serif;
    font-size: 3.5rem;
    margin-bottom: 2rem;
    color: black;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
  
  .about-text h2 {
    font-family: 'Pragati Narrow', sans-serif;
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: black;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  .about-text p {
    font-family: 'Pragati Narrow', sans-serif;
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    color: black;
  }
  
  .education-section ul {
    font-family: 'Pragati Narrow', sans-serif;
    font-size: 1.2rem;
    line-height: 1.8;
    list-style: none;
    padding-left: 0;
  }
  
  .education-section li {
    margin-bottom: 0.5rem;
    color: black;
  }
  
  .education-section li:before {
    content: "• ";
    color: var(--green);
    font-weight: bold;
    margin-right: 0.5rem;
  }
  
  .about-image {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  
  .about-image img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .contact-info {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    .about-container {
      padding: 120px 20px 20px 20px;
      height: auto;
      min-height: 100vh;
    }
    
    .about-content {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    
    .about-text {
      padding-right: 0;
    }
    
    .about-text h1 {
      font-size: 2.5rem;
      text-align: center;
    }
    
    .about-text h2 {
      font-size: 1.5rem;
    }
    
    .about-text p {
      font-size: 1.1rem;
    }
  }
</style>
