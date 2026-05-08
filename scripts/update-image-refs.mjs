#!/usr/bin/env node

/**
 * Script to update image references from PNG to WebP
 * Run after optimizing images
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const files = [
  'src/components/sections/ServiceCardsGridSection.astro',
  'src/components/sections/ServicesSection.astro',
  'src/components/ui/PopupModal.astro',
  'src/components/Footer.astro',
];

console.log('🔄 Updating image references from PNG to WebP...\n');

let totalUpdates = 0;

files.forEach(file => {
  try {
    const content = readFileSync(file, 'utf-8');
    const updated = content.replace(
      /url\(['"]?\/images\/aircon\.png['"]?\)/g,
      "url('/images/aircon.webp')"
    );
    
    if (content !== updated) {
      writeFileSync(file, updated, 'utf-8');
      const count = (content.match(/aircon\.png/g) || []).length;
      console.log(`✅ ${file}: Updated ${count} reference(s)`);
      totalUpdates += count;
    } else {
      console.log(`⏭️  ${file}: No changes needed`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
  }
});

console.log(`\n✨ Complete! Updated ${totalUpdates} image reference(s)\n`);

if (totalUpdates > 0) {
  console.log('📝 Next steps:');
  console.log('1. Verify the changes look correct');
  console.log('2. Test the site locally: npm run dev');
  console.log('3. Build and check for errors: npm run build');
  console.log('4. Deploy and test performance\n');
}
