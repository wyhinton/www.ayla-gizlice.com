import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config();

// Get sheet URL from environment variable, or allow skipping if not set
const SHEET_URL = process.env.VITE_GOOGLE_SHEET_ID || process.env.GOOGLE_SHEET_ID || '';

async function parseSheet(sheet_url) {
  const csvUrl = `https://docs.google.com/spreadsheets/d/${sheet_url}/export?format=csv&gid=0`;
  
  try {
    console.log(`Fetching from: ${csvUrl}`);
    const response = await fetch(csvUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    
    // Parse CSV using Papa Parse in string mode (no XMLHttpRequest needed)
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        delimiter: ',',
        dynamicTyping: true,
        complete: (results) => {
          resolve(results.data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  } catch (error) {
    throw new Error(`Failed to fetch or parse CSV: ${error.message}`);
  }
}

function generatePlaceholderManifest() {
  try {
    const outputDir = path.join(__dirname, '..', 'src', 'generated');
    const outputFile = path.join(outputDir, 'projectsManifest.ts');

    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const typeScriptContent = `// This file is auto-generated. Do not edit manually.
// Generated on ${new Date().toISOString()}
// This is a placeholder manifest. To fetch real data, set the VITE_GOOGLE_SHEET_ID environment variable.

import type { Project } from '../types';

export const projectsManifest: Project[] = [];

export const uniqueCategories: string[] = [];
`;

    fs.writeFileSync(outputFile, typeScriptContent, 'utf-8');
    console.log(`✅ Generated placeholder manifest at ${outputFile}`);
  } catch (error) {
    console.error('❌ Error generating placeholder manifest:', error);
    process.exit(1);
  }
}

async function generateManifest() {
  try {
    console.log('📥 Fetching projects from Google Sheets...');
    const projects = await parseSheet(SHEET_URL);
    
    // Parse Image_Sizes JSON for each project and filter out empty rows
    const processedProjects = projects
      .filter((p) => p.project_name) // Filter out empty rows
      .map((p) => ({
        ...p,
        Image_Sizes: p.Image_Sizes ? JSON.parse(p.Image_Sizes) : {},
      }));

    // Extract unique categories
    const categories = new Set();
    processedProjects.forEach((project) => {
      if (project.category && typeof project.category === 'string') {
        const projectCategories = project.category
          .split(',')
          .map((cat) => cat.trim());
        projectCategories.forEach((cat) => {
          if (cat) categories.add(cat);
        });
      }
    });

    const uniqueCategories = Array.from(categories).sort();

    // Generate TypeScript file
    const outputDir = path.join(__dirname, '..', 'src', 'generated');
    const outputFile = path.join(outputDir, 'projectsManifest.ts');

    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const typeScriptContent = `// This file is auto-generated. Do not edit manually.
// Generated on ${new Date().toISOString()}

import type { Project } from '../types';

export const projectsManifest: Project[] = ${JSON.stringify(processedProjects, null, 2)};

export const uniqueCategories: string[] = ${JSON.stringify(uniqueCategories, null, 2)};
`;

    fs.writeFileSync(outputFile, typeScriptContent, 'utf-8');
    console.log(`✅ Successfully generated ${outputFile}`);
    console.log(`📊 Generated manifest for ${processedProjects.length} projects with ${uniqueCategories.length} categories`);
  } catch (error) {
    console.error('❌ Error generating projects manifest:', error);
    process.exit(1);
  }
}

// Main execution
if (!SHEET_URL) {
  console.warn('⚠️  VITE_GOOGLE_SHEET_ID environment variable is not set');
  console.warn('📝 Creating placeholder manifest. Set VITE_GOOGLE_SHEET_ID to fetch from Google Sheets');
  generatePlaceholderManifest();
} else {
  generateManifest();
}
