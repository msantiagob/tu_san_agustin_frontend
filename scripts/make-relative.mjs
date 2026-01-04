import fs from 'fs';
import path from 'path';

const distDir = 'dist';

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.html') || entry.name.endsWith('.css') || entry.name.endsWith('.js'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Calculate depth relative to dist
      const relativeToDist = path.relative(path.dirname(fullPath), distDir);
      const prefix = relativeToDist === '' ? '.' : relativeToDist.replace(/\\/g, '/');

      // Replace root-relative paths in attributes (href, src, srcset)
      // Handles /, /./, and ensures they become relative to the current file
      content = content.replace(/(href|src|srcset)=["']\/(?:\.\/)?/g, (match, attr) => {
        return `${attr}="${prefix}/`;
      });
      
      // Handle srcset which can have multiple paths separated by commas
      content = content.replace(/,\s*\/(?:\.\/)?/g, (match) => {
        return `, ${prefix}/`;
      });

      // Handle url() in CSS or inline styles
      content = content.replace(/url\(["']?\/(?:\.\/)?/g, (match) => {
        const hasQuote = match.includes("'") ? "'" : match.includes('"') ? '"' : '';
        return `url(${hasQuote}${prefix}/`;
      });
      
      // Handle the logo and other assets that might be in the root of public
      // but are referenced with a leading slash
      // content = content.replace(/(href|src)="\/([^/"]+\.(webp|png|jpg|jpeg|svg|ttf|woff2?))"/g, `$1="${prefix}/$2"`);

      fs.writeFileSync(fullPath, content);
      console.log(`Processed: ${fullPath}`);
    }
  }
}

console.log('Making paths relative in dist...');
processDirectory(distDir);
console.log('Done!');
