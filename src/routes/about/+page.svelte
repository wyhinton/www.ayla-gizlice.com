<!-- @ts-nocheck -->
<script>
  import { onMount } from "svelte";

  onMount(() => {
    // Page specific setup
  });

  // CV Data
  const education = [
    { year: "2022 - 2025", content: "MFA in Ceramics at UCLA" },
    {
      year: "2025",
      content:
        "Turkish Language Intensive Program at Boğaziçi University in Istanbul, Turkey",
    },
    { year: "2022", content: "Work-Study at John C. Campbell Folk School" },
    {
      year: "2015-2019",
      content:
        "University of North Carolina at Chapel Hill<br />B.A. with Highest Honors in Studio Art, Second Major B.S. in Environmental Science<br />Minor in German",
    },
    { year: "2019", content: "Penland School of Crafts, Printmaking Program" },
  ];

  const residencies = [
    {
      year: "Summer 2024",
      content: "Skowhegan School of Painting and Sculpture, Skowhegan, ME",
    },
    {
      year: "Summer 2022",
      content: "Pine Meadow Ranch Residency, Sisters, OR",
    },
    {
      year: "Spring 2022",
      content: "Bloedel Reserve Residency, Bainbridge Island, WA",
    },
    {
      year: "Winter 2021",
      content: "Sitka Center for Art and Ecology Residency, Otis, OR",
    },
    { year: "Fall 2020", content: "Hambidge Center Residency, Rabun Gap, GA" },
    {
      year: "Fall 2019 - Winter 2020",
      content: "Brightwork Fellow at Anchorlight, Raleigh, NC",
    },
    {
      year: "Summer 2019",
      content:
        "Town of Chapel Hill Community Arts and Culture Summer Residency",
    },
  ];

  const soloExhibitions = [
    {
      year: "2025",
      content:
        "<em>Provisional Support Structures</em>, UCLA New Wight Gallery, Los Angeles, CA",
    },
    {
      year: "2020",
      content: "<em>Çukurova Plain</em>, Anchorlight, Raleigh, NC",
    },
    {
      year: "2019",
      content:
        "<em>Natura Naturans</em>, John and June Allcott Gallery, UNC Chapel Hill",
    },
  ];

  const groupExhibitions = [
    {
      year: "2025",
      content:
        "<em>Then and There, Here and Now</em>, North Carolina Museum of Art, Raleigh, NC<br /><em>Kite Show</em> with HYPERSPACE Gallery in Other Places Art Fair, San Pedro, CA<br /><em>Something to Hold</em>, Kita Gallery, Los Angeles, CA<br /><em>Nightlife</em>, The Grange, Big Sur, CA",
    },
    {
      year: "2024",
      content:
        "<em>2024 MFA Preview Show</em>, UCLA New Wight Gallery, Los Angeles, CA",
    },
    {
      year: "2022",
      content:
        "<em>Reckoning and Resilience: North Carolina Art Now</em>, Nasher Museum of Art, Durham, NC<br /><em>WHEN</em>, Sertoma Arts Center, Raleigh, NC<br /><em>Not in Repose</em>, Goodyear Arts, Charlotte, NC<br /><em>Limestone Almanac</em>, BASEMENT Art Space, Raleigh, NC",
    },
    {
      year: "2021",
      content:
        "<em>Approaching Maximum: The Climate Crisis Now</em>, VAE, Raleigh, NC",
    },
    {
      year: "2019",
      content:
        "<em>Reclaiming My Time</em>, National Humanities Center, Durham, NC<br /><em>UNREAL</em>, United Arts Center of Wake County, Raleigh, NC<br /><em>Senior Show</em>, Allcott and SAMPLE Galleries, UNC Chapel Hill<br /><em>Undergraduate Art Awards Show</em>, John and June Allcott Gallery, UNC Chapel Hill",
    },
    {
      year: "2018",
      content:
        "<em>Occluded Front</em>, John and June Allcott Gallery, UNC Chapel Hill<br /><em>The Breakroom</em>, John and June Allcott Gallery, UNC Chapel Hill<br /><em>Monumenta</em>, John and June Allcott Gallery, UNC Chapel Hill",
    },
  ];

  const honors = [
    {
      year: "2025",
      content: "FLAS Fellowship for the study of Turkish Language",
    },
    {
      year: "2022",
      content:
        "St. Anthony Education Foundation Grant to fund projects that promote education",
    },
    {
      year: "2020",
      content:
        "Awesome Foundation Grant to fund innovative projects that engage the local community",
    },
    { year: "2017, 2018", content: "UNC Undergraduate Art Award Winner" },
    {
      year: "2017",
      content:
        "Incubator Award Grant to fund creative projects using the UNC library special collections",
    },
  ];

  const press = [
    {
      year: "2025",
      content:
        "<a href='https://hyperallergic.com/1010854/the-ucla-mfa-show-proves-we-have-got-to-learn-from-students/' target='_blank' rel='noopener'>Exhibition Review</a> of MFA Thesis Show in HyperAllergic Magazine",
    },
    {
      year: "2022",
      content:
        "<a href='https://www.nuggetnews.com/story/2022/07/19/news/artist-soars-with-traditional-weaving/33360.html' target='_blank' rel='noopener'>Article</a> on Kilim Kite Event in the Sisters, Oregon Nugget Newspaper<br />" +
        "<a href='https://indyweek.com/culture/art/the-nasher-reckoning-and-resilience-review/' target='_blank' rel='noopener'>Exhibition Review</a> of Reckoning and Resilience in Indy Week Newspaper<br />" +
        "<a href='https://thelocalreporter.press/artist-run-art-space-showcases-experimental-art/' target='_blank' rel='noopener'>Exhibition Review</a> of Limestone Almanac in The Local Reporter Newspaper",
    },
    {
      year: "2019",
      content:
        "<a href='https://endeavors.unc.edu/artifacts-of-alteration/' target='_blank' rel='noopener'>Photo Essay</a> on Natura Naturans in UNC's Research Magazine, Endeavors<br />UNC Sculpture Garden Catalog",
    },
  ];

  const workExperience = [
    {
      year: "2023 - present",
      content:
        "Lab Technician at UCLA Graduate Ceramics Studio, Culver City, CA",
    },
    {
      year: "2023 - 2025",
      content: "Teaching Fellow at UCLA, Los Angeles, CA",
    },
    {
      year: "2023-2024",
      content:
        "Visiting Artist Lecture Series Co-Coordinator at UCLA, Los Angeles, CA",
    },
    {
      year: "2023-2024",
      content: "Visiting Artist at People's Pottery Project, Los Angeles, CA",
    },
    {
      year: "2019-2022",
      content: "Teaching Artist at various art centers, NC",
    },
    {
      year: "2020 - 2022",
      content: "Sertoma Art Center Front Desk Staff, Raleigh, NC",
    },
    {
      year: "2020 & 2021",
      content: "Coop Caretaker at the Hen Institute, Raleigh, NC",
    },
    {
      year: "2017 - 2019",
      content: "Student Assistant at Sloane Art Library, UNC-CH, NC",
    },
    {
      year: "2018",
      content: "Summer Intern at Artspace, Raleigh, NC",
    },
  ];

  const volunteering = [
    {
      year: "2025",
      content:
        "Wheel Throwing Demonstrations for Boğaziçi University ceramics students, Istanbul",
    },
    {
      year: "2023",
      content: "Earthquake Relief Fundraiser, Los Angeles, CA",
    },
    {
      year: "2021 - 2022",
      content: "Imaging Specimens for UNC Herbarium, Chapel Hill, NC",
    },
    {
      year: "2019",
      content: "Advisor to Southeast Raleigh High School Art Club, Raleigh, NC",
    },
  ];

  // Helper function to render a CV section
  function renderCvSection(title, items) {
    return { title, items };
  }

  // All CV sections
  const cvSections = [
    renderCvSection("EDUCATION", education),
    renderCvSection("RESIDENCIES", residencies),
    renderCvSection("SOLO EXHIBITIONS", soloExhibitions),
    renderCvSection("GROUP EXHIBITIONS", groupExhibitions),
    renderCvSection("HONORS", honors),
    renderCvSection("PRESS", press),
    renderCvSection("WORK EXPERIENCE", workExperience),
    renderCvSection("VOLUNTEERING", volunteering),
  ];
</script>

<div class="cv-container">
  <div class="cv-content">
    <!-- Header -->
    <header class="cv-header">
      <div class="bio-text">
        <p>
          Ayla Gizlice (b. 1996, Raleigh, NC) is a Los Angeles-based artist who
          uses ceramics, fibers, installation, performance, and creative writing
          to explore both the landscape and the body's refusal to be mastered.
          Gizlice earned a BS in Environmental Science and a BA in Art from
          UNC-Chapel Hill. In 2025, she received her MFA in Ceramics from UCLA.
          She has participated in several residencies, including at Skowhegan
          School of Painting and Sculpture and the Sitka Center for Art and
          Ecology. She has participated in several group exhibitions, including
          at the Nasher Museum and at the North Carolina Museum of Art. She has
          also shown work in several solo exhibitions. She is currently the
          ceramics studio technician at UCLA's graduate studio.
        </p>
      </div>
    </header>

    <!-- CV Sections -->
    {#each cvSections as section}
      <section class="cv-section">
        <h2>{section.title}</h2>
        <div class="timeline">
          {#each section.items as item}
            <div class="timeline-item">
              <span class="year">{item.year}</span>
              <div class="content">{@html item.content}</div>
            </div>
          {/each}
        </div>
      </section>
    {/each}
  </div>
</div>

<style>
  .cv-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      sans-serif;
    line-height: 1.4;
    color: #333;
    margin-top: 100px;
  }

  .cv-header {
    text-align: left;
    margin-bottom: 3rem;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1rem;
  }

  .cv-header h1 {
    font-size: 2.5rem;
    font-weight: 300;
    letter-spacing: 2px;
    margin: 0 0 1.5rem 0;
    color: #000;
  }

  .bio-text {
    margin-bottom: 1rem;
  }

  .bio-text p {
    font-size: 1rem;
    line-height: 1.6;
    color: #333;
    margin: 0;
    text-align: justify;
  }

  .cv-section {
    margin-bottom: 3rem;
  }

  .cv-section h2 {
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    color: #000;
    border-bottom: 1px solid #000;
    padding-bottom: 0.25rem;
  }

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .timeline-item {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 2rem;
    align-items: start;
    padding: 0.5rem 0;
  }

  .timeline-item .year {
    font-size: 0.9rem;
    font-weight: 500;
    color: #666;
    text-align: right;
    padding-right: 1rem;
    border-right: 1px solid #a4a4a4;
  }

  .timeline-item .content {
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .timeline-item .content strong {
    font-weight: 600;
    color: #000;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .cv-container {
      padding: 1rem;
    }

    .cv-header h1 {
      font-size: 2rem;
    }

    .timeline-item {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .timeline-item .year {
      text-align: left;
      border-right: none;
      border-bottom: 1px solid #eee;
      padding-right: 0;
      padding-bottom: 0.25rem;
      font-weight: 600;
    }
  }

  /* Print styles */
  @media print {
    .cv-container {
      max-width: none;
      padding: 0;
      font-size: 0.85rem;
    }

    .cv-header h1 {
      font-size: 1.8rem;
    }

    .cv-section {
      margin-bottom: 2rem;
      break-inside: avoid;
    }

    .timeline-item {
      break-inside: avoid;
      padding: 0.25rem 0;
    }
  }
</style>
