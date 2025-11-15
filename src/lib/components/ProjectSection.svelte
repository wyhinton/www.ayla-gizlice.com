<script>
  import { onMount } from 'svelte';
  
  export let project;
  export let index;
  
  let sectionElement;
  let visible = false;
  
  onMount(() => {
    // Animate in the section
    setTimeout(() => {
      visible = true;
    }, index * 100);
  });
  
  function getImageUrl(project, imageNumber) {
    const imageKey = `Picture_Link_${imageNumber}`;
    return project[imageKey] || '';
  }
  
  function getVideoUrl(project) {
    return project.Video_Link || '';
  }
  
  function hasImages(project) {
    return getImageUrl(project, 1) || getImageUrl(project, 2) || getImageUrl(project, 3);
  }
  
  function hasVideo(project) {
    return getVideoUrl(project);
  }
</script>

<section 
  class="section" 
  id="section_{index}" 
  bind:this={sectionElement}
  class:visible
>
  <div class="sectionElementContainer" id="sectionElementContainer_{index}">
    <div class="descriptionPaddingContainer" id="descriptionPaddingContainer_{index}">
      <div class="descriptionDiv" id="descriptionDiv_{index}">
        <h2 class="project__title" id="title_{index}">
          {project.project_name || project.Project_Name || ''}
        </h2>
        <p class="projInfo" id="projInfo_{index}">
          {#if project.Mediums}{project.Mediums}<br>{/if}
          {#if project.Year}{project.Year}<br>{/if}
          {#if project.Collaborator && project.Collaborator !== 'empty'}
            Made in collaboration with 
            <a href="{project.Collaborator_Link}" target="_blank" rel="noopener noreferrer">
              {project.Collaborator}
            </a>
          {/if}
        </p>
        <p class="descriptionParagraph" id="descriptionParagraph_{index}">
          {project.project_description || project.Project_Description || ''}
        </p>
      </div>
    </div>
    
    {#if hasImages(project) || hasVideo(project)}
      <div class="img_div" id="img_div{index}">
        {#if getImageUrl(project, 1)}
          <div class="imageContainerPadding" id="imageContainerPadding1_{index}">
            <div class="singleImageContainer" id="singleImageContainer_{index}">
              <a class="lightBoxLink" href="{getImageUrl(project, 1)}" target="_blank" rel="noopener noreferrer">
                <img 
                  class="heroImage" 
                  id="lightBoxImage_{index}" 
                  src="{getImageUrl(project, 1)}" 
                  alt="{project.project_name || 'Ayla Gizlice Art'}"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        {/if}
        
        {#if getImageUrl(project, 2)}
          <div class="imageContainerPadding" id="imageContainerPadding2_{index}">
            <div class="singleImageContainer">
              <a class="lightBoxLink" href="{getImageUrl(project, 2)}" target="_blank" rel="noopener noreferrer">
                <img 
                  class="heroImage" 
                  src="{getImageUrl(project, 2)}" 
                  alt="{project.project_name || 'Ayla Gizlice Art'}"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        {/if}
        
        {#if getImageUrl(project, 3)}
          <div class="imageContainerPadding" id="imageContainerPadding3_{index}">
            <div class="singleImageContainer">
              <a class="lightBoxLink" href="{getImageUrl(project, 3)}" target="_blank" rel="noopener noreferrer">
                <img 
                  class="heroImage" 
                  src="{getImageUrl(project, 3)}" 
                  alt="{project.project_name || 'Ayla Gizlice Art'}"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        {/if}
        
        {#if hasVideo(project)}
          <div class="videoDiv" id="videoDiv_{index}">
            <iframe 
              class="videoIframe" 
              id="videoIframe_{index}"
              src="{getVideoUrl(project)}"
              title="Project Video"
              frameborder="0" 
              allowfullscreen
            ></iframe>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</section>

<style>
  .section {
    opacity: 0;
    transform: translateX(50px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  .section.visible {
    opacity: 1;
    transform: translateX(0);
  }
</style>
