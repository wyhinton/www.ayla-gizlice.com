# Ayla Gizlice Portfolio - SvelteKit Version

This is a modern SvelteKit conversion of Ayla Gizlice's artist portfolio website. The original site was built with vanilla JavaScript and has been rewritten to use SvelteKit while preserving all the original styling and functionality.

## Features

- 🎨 **Artist Portfolio**: Showcase projects fetched from Google Sheets
- 📱 **Responsive Design**: Mobile-friendly with touch navigation
- 🖼️ **Image Gallery**: Horizontal scrolling gallery with lightbox functionality
- 📝 **Contact Form**: Built-in contact form for inquiries
- 🎬 **Video Integration**: Support for embedded videos
- ⚡ **SvelteKit**: Modern framework with fast loading and excellent SEO

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── Navigation.svelte       # Main navigation component
│   │   └── ProjectSection.svelte   # Individual project display
│   └── utils/
│       └── dataService.js          # Google Sheets data fetching
├── routes/
│   ├── +layout.svelte              # Main layout with navigation
│   ├── +page.svelte                # Home page (projects)
│   ├── +page.server.js             # Server-side data loading
│   ├── about/
│   │   └── +page.svelte            # About page
│   ├── contact/
│   │   └── +page.svelte            # Contact page
│   └── +error.svelte               # 404 error page
├── app.css                         # Global styles
└── app.html                        # HTML template

static/                             # Static assets
├── data/                          # Videos and images
├── favicon/                       # Favicons
└── images/                        # UI images
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Google Sheets Data Source

1. Open `src/routes/+page.server.js`
2. Replace `'your-google-sheets-json-url-here'` with your actual Google Sheets JSON API URL
3. Make sure your Google Sheet has the following columns:
   - `project_name` or `Project_Name`
   - `project_description` or `Project_Description`
   - `Mediums`
   - `Year`
   - `Collaborator`
   - `Collaborator_Link`
   - `Picture_Link_1`
   - `Picture_Link_2`
   - `Picture_Link_3`
   - `Video_Link`

### 3. Update Contact Information

1. Open `src/routes/contact/+page.svelte`
2. Update the email address in the contact information section
3. Update social media links as needed
4. Implement form submission logic (currently simulated)

### 4. Add Artist Photo

1. Add an artist photo to `static/data/artist-photo.jpg`
2. Update the path in `src/routes/about/+page.svelte` if needed

### 5. Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### 6. Build for Production

```bash
npm run build
npm run preview
```

## Google Sheets Setup

Your Google Sheets should be formatted as follows:

| project_name | project_description | Mediums | Year | Picture_Link_1 | Picture_Link_2 | Picture_Link_3 | Video_Link | Collaborator | Collaborator_Link |
|--------------|-------------------|---------|------|----------------|----------------|----------------|------------|--------------|-------------------|
| Project 1    | Description...    | Ceramic | 2023 | http://...     | http://...     | http://...     | http://... | empty        | empty             |

To get the JSON URL:
1. Make your Google Sheet public
2. Get the sheet ID from the URL
3. Use this format: `https://spreadsheets.google.com/feeds/cells/[SHEET_ID]/1/public/values?alt=json`

## Deployment

This SvelteKit app can be deployed to:
- **Vercel**: `npm install @sveltejs/adapter-vercel`
- **Netlify**: `npm install @sveltejs/adapter-netlify`
- **Static hosting**: `npm install @sveltejs/adapter-static`
- **Node.js**: `npm install @sveltejs/adapter-node`

Update `svelte.config.js` with the appropriate adapter.

## Migration Notes

### What's Been Preserved
- ✅ All original styling and visual design
- ✅ Mobile responsive layout
- ✅ Project navigation and gallery
- ✅ Google Sheets integration
- ✅ Video embedding
- ✅ About and Contact pages
- ✅ 404 error handling

### What's Been Improved
- 🚀 Modern SvelteKit framework
- 📦 Component-based architecture
- ⚡ Better performance and SEO
- 🛠️ Better development experience
- 🔧 Type checking and error handling
- 📱 Enhanced mobile experience

### To Do
- [ ] Implement lightbox functionality for images
- [ ] Add form submission backend
- [ ] Implement image lazy loading optimization
- [ ] Add loading states and animations
- [ ] Set up Google Analytics properly
- [ ] Configure PWA features if needed

## Styling

The original CSS has been preserved and adapted for SvelteKit:
- Global styles in `src/app.css`
- Component-specific styles in individual `.svelte` files
- CSS custom properties for theming
- Responsive breakpoints maintained

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## License

This project is for Ayla Gizlice's personal portfolio use.

## Support

For any questions about the SvelteKit conversion, please refer to:
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Svelte Documentation](https://svelte.dev/docs)
