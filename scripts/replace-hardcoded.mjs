import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const pagesDir = 'src/content/pages';

// Collect all .mdx files recursively
function getMdxFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...getMdxFiles(full));
    } else if (entry.endsWith('.mdx')) {
      files.push(full);
    }
  }
  return files;
}

const allFiles = getMdxFiles(pagesDir);

// City-specific pages that should keep their specific city names in certain places
// (like titleHighlight="Glendale" — these are intentionally city-specific pages)
const citySpecificPages = ['glendale.mdx', 'pasadena.mdx', 'santa-monica.mdx'];

let totalReplacements = 0;

for (const file of allFiles) {
  let content = readFileSync(file, 'utf-8');
  const original = content;
  const basename = file.split(/[/\\]/).pop();
  const isCityPage = citySpecificPages.includes(basename);

  // Replace "ABC Company Heating and Cooling" with {fullName} (longest first)
  content = content.replaceAll('ABC Company Heating and Cooling', '{fullName}');
  
  // Replace "ABC Plumbers" with {business}
  content = content.replaceAll('ABC Plumbers', '{business}');
  
  // Replace "ABC Company" with {business} (but not inside {fullName} which was already replaced)
  content = content.replaceAll('ABC Company', '{business}');
  
  // Replace "ABC COMPANY" with {business} (uppercase in PromoTiles titles)
  content = content.replaceAll('ABC COMPANY', '{business}');
  
  // Replace "ABC Plumber" (singular) with {business}
  content = content.replaceAll('ABC Plumber', '{business}');
  
  // Replace "ABC HVAC" with {business}
  content = content.replaceAll('ABC HVAC', '{business}');

  // Skip city-specific replacements for city-specific pages' titleHighlight and specific city references
  // that are intentionally about THAT city (like "Trusted Plumbing Services in Glendale")
  // But DO replace generic "New York City", "Los Angeles" references in ServiceAreaSection etc.

  // Replace city names - order matters (longer strings first)
  // "New York City" -> {city}
  content = content.replaceAll('New York City', '{city}');
  // "New York" -> {city}  
  content = content.replaceAll('New York', '{city}');
  // "Los Angeles" -> {city}
  content = content.replaceAll('Los Angeles', '{city}');

  // For non-city-specific pages, also replace these
  if (!isCityPage) {
    // Don't replace city names that are part of the city-specific page content
  }

  // Replace "Your Company Name" with {business} (found in city pages)
  content = content.replaceAll('Your Company Name', '{business}');

  if (content !== original) {
    writeFileSync(file, content, 'utf-8');
    const count = (original.length - content.length) !== 0 ? 1 : 0;
    console.log(`Updated: ${file}`);
    totalReplacements++;
  }
}

console.log(`\nTotal files updated: ${totalReplacements}`);
