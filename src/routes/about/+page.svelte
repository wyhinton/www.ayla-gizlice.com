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
        "Provisional Support Structures, UCLA New Wight Gallery, Los Angeles, CA",
    },
    { year: "2020", content: "Çukurova Plain, Anchorlight, Raleigh, NC" },
    {
      year: "2019",
      content:
        "Natura Naturans, John and June Allcott Gallery, UNC Chapel Hill",
    },
  ];

  const groupExhibitions = [
    {
      year: "2025",
      content:
        "Then and There, Here and Now, North Carolina Museum of Art, Raleigh, NC<br />Kite Show with HYPERSPACE Gallery in Other Places Art Fair, San Pedro, CA<br />Something to Hold, Kita Gallery, Los Angeles, CA<br />Nightlife, The Grange, Big Sur, CA",
    },
    {
      year: "2024",
      content: "2024 MFA Preview Show, UCLA New Wight Gallery, Los Angeles, CA",
    },
    {
      year: "2022",
      content:
        "Reckoning and Resilience: North Carolina Art Now, Nasher Museum of Art, Durham, NC<br />WHEN, Sertoma Arts Center, Raleigh, NC<br />Not in Repose, Goodyear Arts, Charlotte, NC<br />Limestone Almanac, BASEMENT Art Space, Raleigh, NC",
    },
    {
      year: "2021",
      content: "Approaching Maximum: The Climate Crisis Now, VAE, Raleigh, NC",
    },
    {
      year: "2019",
      content:
        "Reclaiming My Time, National Humanities Center, Durham, NC<br />UNREAL, United Arts Center of Wake County, Raleigh, NC<br />Senior Show, Allcott and SAMPLE Galleries, UNC Chapel Hill<br />Undergraduate Art Awards Show, John and June Allcott Gallery, UNC Chapel Hill",
    },
    {
      year: "2018",
      content:
        "Occluded Front, John and June Allcott Gallery, UNC Chapel Hill<br />The Breakroom, John and June Allcott Gallery, UNC Chapel Hill<br />Monumenta, John and June Allcott Gallery, UNC Chapel Hill",
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
    { year: "2017, 2018", content: "UNC Studio Art Undergraduate Art Awards" },
    {
      year: "2017",
      content:
        "Anderson Award<br />Sculpture Garden Award and Commission<br />Kachergis Award<br />Scholarship to attend Penland School of Crafts<br />Incubator Award Grant to fund creative projects using the UNC library special collections",
    },
  ];

  const press = [
    {
      year: "2025",
      content: "Exhibition Review of MFA Thesis Show in HyperAllergic Magazine",
    },
    {
      year: "2022",
      content:
        "Article on Kilim Kite Event in the Sisters, Oregon Nugget Newspaper<br />Exhibition Review of Reckoning and Resilience in Indy Week Newspaper<br />Exhibition Review of Limestone Almanac in The Local Reporter Newspaper",
    },
    {
      year: "2019",
      content:
        "Photo Essay on Natura Naturans in UNC's Research Magazine, Endeavors<br />UNC Sculpture Garden Catalog",
    },
  ];

  const workExperience = [
    {
      year: "2023 - present",
      content:
        "<strong>Lab Technician at UCLA Graduate Ceramics Studio, Culver City, CA</strong><br />Ran community firings, made glazes, cleaned and organized ceramics studio, troubleshot kiln problems, mediated disagreements about use of communal space. Offered technical demonstrations and advice to graduate students about a variety of techniques in ceramic construction",
    },
    {
      year: "2023 - 2025",
      content:
        "<strong>Teaching Fellow at UCLA, Los Angeles, CA</strong><br />Led discussion sections for modern art history classes, evaluated essays and exams (3 quarters). Advised students in the completion of their capstone projects and in professional development (1 quarter). Assisted in instructing students in the foundations of ceramics in wheel throwing and handbuilding (2 quarters). Provided individual feedback and support to advanced drawing students (1 quarter)",
    },
    {
      year: "2023-2024",
      content:
        "<strong>Visiting Artist Lecture Series Co-Coordinator at UCLA, Los Angeles, California</strong><br />Curated, organized, and promoted lecture series about varying approaches to place in art. Organized studio visits, invited and coordinated with artists, promoted lectures",
    },
    {
      year: "2023-2024",
      content:
        "<strong>Visiting Artist at People's Pottery Project, Los Angeles, CA</strong><br />Assisted in organizing and streamlining pottery studio, helped fill and mail out orders. Instructed formerly incarcerated women in handbuilding, wheel throwing, and glazing techniques",
    },
    {
      year: "2020 - 2022",
      content:
        "<strong>Sertoma Art Center Front Desk Staff, Raleigh, NC</strong><br />Checked visitors into classes and studios, coordinated class and rental registration, oversaw daily program and staff activities, maintained records, developed and distributed promotional information",
    },
    {
      year: "2020 & 2021",
      content:
        "<strong>Coop Caretaker at the Hen Institute, Raleigh, NC</strong><br />Provided regular care to the feathered residents of the Hen Institute as a part of a public installation by artist Adam Carlin",
    },
    {
      year: "2017 - 2019",
      content:
        "<strong>Student Assistant at Sloane Art Library, UNC-CH</strong><br />Helped patrons with research questions, checked books in and out, cataloged books. Familiarized myself with numerous contemporary and historical artists and movements",
    },
    {
      year: "2018",
      content:
        "<strong>Summer Intern at Artspace, Raleigh, NC</strong><br />Managed supplies for summer arts programs, acted as liaison between instructors and staff, oversaw volunteers",
    },
  ];

  const volunteering = [
    {
      year: "2025",
      content:
        "<strong>Wheel Throwing Demonstrations for Boğaziçi University ceramics students, Istanbul</strong><br />Held a three day workshop demonstrating throwing techniques and provided one-on-one sessions for students to practice",
    },
    {
      year: "2023",
      content:
        "<strong>Earthquake Relief Fundraiser, Los Angeles, CA</strong><br />Created and sold ceramic tea cups and tea to provide direct aid to people impacted by the earthquakes in Turkey and Syria",
    },
    {
      year: "2021 - 2022",
      content:
        "<strong>Imaging Specimens for UNC Herbarium, Chapel Hill, NC</strong><br />Imaged and uploaded specimens in the lichen collection to a digital archive, shelved specimens in the vascular plant collection",
    },
    {
      year: "2019",
      content:
        "<strong>Advisor to Southeast Raleigh High School Art Club, Raleigh, NC</strong><br />Advised students in the creation of artwork and exhibition planning for a group show",
    },
    {
      year: "2017",
      content:
        "<strong>Solar Spring Break, Washington, DC</strong><br />Assisted in the installation of solar panels for low-income housing",
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
    renderCvSection("GROUP/COLLABORATIVE EXHIBITIONS", groupExhibitions),
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
    border-right: 1px solid #eee;
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
