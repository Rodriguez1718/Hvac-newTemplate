#!/usr/bin/env node

/**
 * Update all external image URLs in JSON files to local optimized versions
 * 
 * Usage:
 *   node scripts/update-all-images.mjs
 * 
 * This script will:
 * 1. Find all JSON files in src/content/pages/
 * 2. Replace external image URLs with local /images/ paths
 * 3. Create backups before modifying
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Image URL mappings: external URL → local path
const IMAGE_MAPPINGS = {
  // johnh967.sg-host.com images
  'https://johnh967.sg-host.com/wp-content/uploads/2024/11/Quality-HVAC-Service.webp': '/images/quality-hvac-service.webp',
  'https://johnh967.sg-host.com/wp-content/uploads/slider/cache/3208844a78ae424ec0bfef8623738be2/HVAC-Repair-Banner.webp': '/images/portfolio-hvac-repair.webp',
  'https://johnh967.sg-host.com/wp-content/uploads/2024/12/AC-Repair-Services.webp': '/images/ac-repair-services.webp',
  'https://johnh967.sg-host.com/wp-content/uploads/2024/12/Professional-24_7-Heating-and-Cooling-Repairs.webp': '/images/professional-247-repairs.webp',
  'https://johnh967.sg-host.com/wp-content/uploads/sb-instagram-feed-images/466578360_545600454753059_5640968860261965384_nfull.webp': '/images/instagram-1.webp',
  'https://johnh967.sg-host.com/wp-content/uploads/sb-instagram-feed-images/466555884_570355772412079_4111747127252492406_nfull.webp': '/images/instagram-2.webp',
  'https://johnh967.sg-host.com/wp-content/uploads/sb-instagram-feed-images/466796006_1587175318903711_6684948885555680268_nfull.webp': '/images/instagram-3.webp',
  'https://johnh967.sg-host.com/wp-content/uploads/sb-instagram-feed-images/466556611_1575760946412367_152571973762791733_nfull.webp': '/images/instagram-4.webp',
  'https://johnh967.sg-host.com/wp-content/uploads/2024/11/Commercial-Banner.webp': '/images/commercial-banner.webp',
  'https://johnh967.sg-host.com/wp-content/uploads/2024/11/Commercial-HVAC-Installation-Service.webp': '/images/commercial-hvac-installation.webp',
  'https://johnh967.sg-host.com/wp-content/uploads/2024/11/Commercial-HVAC-Maintenance-Service.webp': '/images/commercial-hvac-maintenance.webp',
  'https://johnh967.sg-host.com/wp-content/uploads/2024/11/Commercial-HVAC-Repair-Services.webp': '/images/commercial-hvac-repair.webp',
  'https://johnh967.sg-host.com/wp-content/uploads/2024/11/Commercial-HVAC-Warranty-Service.webp': '/images/commercial-hvac-warranty.webp',
  'https://johnh967.sg-host.com/wp-content/uploads/2024/11/Expert-Commercial-HVAC-Maintenance.webp': '/images/expert-commercial-maintenance.webp',
  'https://johnh967.sg-host.com/wp-content/uploads/2024/11/Reliable-Emergency-Services.webp': '/images/reliable-emergency-services.webp',
  'https://johnh967.sg-host.com/wp-content/uploads/2024/11/24_7-Emergency-Repair-Services.webp': '/images/247-emergency-repairs.webp',
  'https://johnh967.sg-host.com/wp-content/uploads/2024/11/Heating-and-Cooling-Emergency-Repair-Services.webp': '/images/heating-cooling-emergency.webp',
  'https://johnh967.sg-host.com/wp-content/uploads/2024/11/Emergency-HVAC-Service-Banner.webp': '/images/emergency-hvac-banner.webp',
  
  // Other external sources
  'https://plus.unsplash.com/premium_photo-1661963270682-4b4857b6cda2?q=80&w=1470&auto=format&fit=crop': '/images/heating-services.webp',
  'https://www.classicheatandair.com/wp-content/uploads/2025/03/iStock-2058341644-1.jpg': '/images/indoor-air-quality.webp',
  'https://aonecoolingsolution.in/wp-content/uploads/2025/02/split-ac-service-Sfastservices.jpg': '/images/ac-service.webp',
  'https://www.askmoss.com/wp-content/uploads/2025/06/thermostat-repair-moss.jpg': '/images/thermostat-repair.webp',
};

// Find all JSON files recursively
function findJsonFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findJsonFiles(filePath, fileList);
    } else if (file.endsWith('.json')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Replace image URLs in content
function replaceImageUrls(content) {
  let modified = content;
  let replacementCount = 0;
  
  for (const [externalUrl, localPath] of Object.entries(IMAGE_MAPPINGS)) {
    const regex = new RegExp(externalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = (modified.match(regex) || []).length;
    
    if (matches > 0) {
      modified = modified.replace(regex, localPath);
      replacementCount += matches;
      console.log(`  ✓ Replaced ${matches}x: ${path.basename(localPath)}`);
    }
  }
  
  return { modified, replacementCount };
}

// Process a single JSON file
function processJsonFile(filePath) {
  console.log(`\n📄 Processing: ${path.relative(process.cwd(), filePath)}`);
  
  try {
    // Read file
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace URLs
    const { modified, replacementCount } = replaceImageUrls(content);
    
    if (replacementCount === 0) {
      console.log('  ℹ No external images found');
      return { processed: false, replacements: 0 };
    }
    
    // Create backup
    const backupPath = filePath + '.backup';
    fs.writeFileSync(backupPath, content, 'utf-8');
    console.log(`  💾 Backup created: ${path.basename(backupPath)}`);
    
    // Write modified content
    fs.writeFileSync(filePath, modified, 'utf-8');
    console.log(`  ✅ Updated with ${replacementCount} replacement(s)`);
    
    return { processed: true, replacements: replacementCount };
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return { processed: false, replacements: 0, error: error.message };
  }
}

// Main execution
function main() {
  console.log('🚀 Starting image URL replacement...\n');
  console.log('📋 Image mappings loaded:', Object.keys(IMAGE_MAPPINGS).length);
  
  // Find all JSON files
  const contentDir = path.join(process.cwd(), 'src', 'content', 'pages');
  const jsonFiles = findJsonFiles(contentDir);
  
  console.log(`📁 Found ${jsonFiles.length} JSON files\n`);
  console.log('─'.repeat(60));
  
  // Process each file
  let totalProcessed = 0;
  let totalReplacements = 0;
  const errors = [];
  
  jsonFiles.forEach(filePath => {
    const result = processJsonFile(filePath);
    
    if (result.processed) {
      totalProcessed++;
      totalReplacements += result.replacements;
    }
    
    if (result.error) {
      errors.push({ file: filePath, error: result.error });
    }
  });
  
  // Summary
  console.log('\n' + '─'.repeat(60));
  console.log('\n📊 Summary:');
  console.log(`  • Files processed: ${totalProcessed}/${jsonFiles.length}`);
  console.log(`  • Total replacements: ${totalReplacements}`);
  console.log(`  • Errors: ${errors.length}`);
  
  if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.forEach(({ file, error }) => {
      console.log(`  • ${path.relative(process.cwd(), file)}: ${error}`);
    });
  }
  
  console.log('\n✨ Done!');
  console.log('\n📝 Next steps:');
  console.log('  1. Review the changes');
  console.log('  2. Test the site: npm run dev');
  console.log('  3. Build: npm run build');
  console.log('  4. Deploy: git add . && git commit -m "feat: use local optimized images" && git push');
  console.log('\n💡 Tip: Backup files (.backup) can be deleted after verification');
}

// Run
main();
