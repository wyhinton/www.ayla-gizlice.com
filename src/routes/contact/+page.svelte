<!-- @ts-nocheck -->
<script>
  import { onMount } from 'svelte';
  
  let name = '';
  let email = '';
  let message = '';
  let isSubmitting = false;
  let submitMessage = '';
  
  async function handleSubmit(event) {
    event.preventDefault();
    
    if (!name || !email || !message) {
      submitMessage = 'Please fill in all fields.';
      return;
    }
    
    isSubmitting = true;
    submitMessage = '';
    
    try {
      // You'll need to implement your form submission logic here
      // For now, we'll just simulate a submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      submitMessage = 'Thank you for your message! I\'ll get back to you soon.';
      name = '';
      email = '';
      message = '';
    } catch (error) {
      submitMessage = 'Sorry, there was an error sending your message. Please try again.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Ayla Gizlice - Contact</title>
  <meta name="description" content="Get in touch with Ayla Gizlice">
</svelte:head>

<div class="contact-container">
  <div class="contact-content">
    <div class="contact-info">
      <h1>Get In Touch</h1>
      
      <div class="info-section">
        <p>
          I'm always interested in discussing new projects, collaborations, 
          and exhibitions. Feel free to reach out with any inquiries.
        </p>
        
        <div class="contact-details">
          <h2>Contact Information</h2>
          <p>
            <strong>Email:</strong> 
            <a href="mailto:ayla@example.com">ayla@example.com</a>
          </p>
          <p>
            <strong>Studio:</strong> 
            Raleigh, North Carolina
          </p>
        </div>
        
        <div class="social-links">
          <h2>Follow My Work</h2>
          <div class="social-buttons">
            <a href="https://instagram.com/aylagizlice" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <div class="contact-form">
      <h2>Send a Message</h2>
      
      <form on:submit={handleSubmit}>
        <div class="form-group">
          <label for="name">Name</label>
          <input 
            type="text" 
            id="name" 
            bind:value={name} 
            required 
            disabled={isSubmitting}
          />
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            bind:value={email} 
            required 
            disabled={isSubmitting}
          />
        </div>
        
        <div class="form-group">
          <label for="message">Message</label>
          <textarea 
            id="message" 
            bind:value={message} 
            rows="6" 
            required 
            disabled={isSubmitting}
          ></textarea>
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        
        {#if submitMessage}
          <div class="submit-message" class:error={submitMessage.includes('error')}>
            {submitMessage}
          </div>
        {/if}
      </form>
    </div>
  </div>
</div>

<style>
  .contact-container {
    width: 100%;
    min-height: 100vh;
    background-color: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px 20px 20px 20px;
    box-sizing: border-box;
  }
  
  .contact-content {
    max-width: 1200px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;
  }
  
  .contact-info h1 {
    font-family: 'Pragati Narrow', sans-serif;
    font-size: 3.5rem;
    margin-bottom: 2rem;
    color: black;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
  
  .contact-info h2 {
    font-family: 'Pragati Narrow', sans-serif;
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: black;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  .contact-info p {
    font-family: 'Pragati Narrow', sans-serif;
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    color: black;
  }
  
  .contact-info a {
    color: var(--green);
    text-decoration: none;
    border-bottom: 1px solid var(--green);
    transition: opacity 0.3s ease;
  }
  
  .contact-info a:hover {
    opacity: 0.7;
  }
  
  .social-buttons {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }
  
  .social-buttons a {
    padding: 12px 24px;
    background-color: var(--green);
    color: white;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    font-family: 'Pragati Narrow', sans-serif;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: background-color 0.3s ease;
    display: inline-block;
  }
  
  .social-buttons a:hover {
    background-color: rgba(33, 116, 107, 0.8);
  }
  
  .contact-form h2 {
    font-family: 'Pragati Narrow', sans-serif;
    font-size: 2rem;
    margin-bottom: 2rem;
    color: black;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-family: 'Pragati Narrow', sans-serif;
    font-size: 1.1rem;
    color: black;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-family: 'Pragati Narrow', sans-serif;
    font-size: 1rem;
    background-color: white;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--green);
  }
  
  .form-group input:disabled,
  .form-group textarea:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
  
  button {
    background-color: var(--green);
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 4px;
    font-family: 'Pragati Narrow', sans-serif;
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
  }
  
  button:hover:not(:disabled) {
    background-color: rgba(33, 116, 107, 0.8);
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .submit-message {
    margin-top: 1rem;
    padding: 12px;
    border-radius: 4px;
    font-family: 'Pragati Narrow', sans-serif;
    font-size: 1rem;
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  
  .submit-message.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
  
  @media (max-width: 768px) {
    .contact-container {
      padding: 120px 20px 20px 20px;
    }
    
    .contact-content {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    
    .contact-info h1 {
      font-size: 2.5rem;
      text-align: center;
    }
    
    .contact-info h2,
    .contact-form h2 {
      font-size: 1.5rem;
    }
    
    .social-buttons {
      justify-content: center;
    }
  }
</style>
