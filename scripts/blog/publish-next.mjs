/**
 * publish-next.mjs — Pop the next approved post off content/blog-queue.json,
 * stamp it with today's date, and insert it into blogPosts.ts + sitemap.xml.
 *
 * Posts in the queue are pre-written and pre-approved by Will (see CLAUDE.md /
 * the blogging workflow discussion) — this script never generates content,
 * it only publishes what's already been reviewed. If the queue is empty, it
 * exits without making changes (and without failing the workflow).
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '../..');
const QUEUE_JSON = resolve(ROOT, 'content/blog-queue.json');
const BLOG_POSTS_TS = resolve(ROOT, 'client/src/data/blogPosts.ts');
const SITEMAP_XML = resolve(ROOT, 'sitemap.xml');

function todayLongDate() {
  return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/New_York' });
}

function jsString(s) {
  return JSON.stringify(s);
}

function jsTemplateLiteral(s) {
  const escaped = s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  return `\`${escaped}\``;
}

function serializePost(post) {
  const lines = [
    `  {`,
    `    slug: ${jsString(post.slug)},`,
    `    title: ${jsString(post.title)},`,
    `    excerpt: ${jsString(post.excerpt)},`,
    `    category: ${jsString(post.category)},`,
    `    readTime: ${jsString(post.readTime)},`,
    `    date: ${jsString(post.date)},`,
    `    img: ${jsString(post.img)},`,
  ];
  if (post.images && post.images.length) {
    lines.push(`    images: ${JSON.stringify(post.images)},`);
  }
  lines.push(`    content: ${jsTemplateLiteral(post.content)},`);
  lines.push(`  },`);
  return lines.join('\n');
}

function main() {
  const queue = JSON.parse(readFileSync(QUEUE_JSON, 'utf8'));
  if (queue.length === 0) {
    console.log('Blog queue is empty — nothing to publish. Send Will a reminder to review the next batch.');
    return;
  }

  const post = queue.shift();
  post.date = todayLongDate();

  // 1. Insert into blogPosts.ts, right before the closing "];"
  let blogPosts = readFileSync(BLOG_POSTS_TS, 'utf8').replace(/\r\n/g, '\n');
  if (!blogPosts.trimEnd().endsWith('];')) {
    throw new Error('blogPosts.ts does not end with "];" as expected — aborting to avoid corrupting the file.');
  }
  const serialized = serializePost(post);
  blogPosts = blogPosts.replace(/\n\];\s*$/, `\n${serialized}\n];\n`);
  writeFileSync(BLOG_POSTS_TS, blogPosts);

  // 2. Add a sitemap.xml entry, right before </urlset>
  let sitemap = readFileSync(SITEMAP_XML, 'utf8').replace(/\r\n/g, '\n');
  const isoDate = new Date().toISOString().slice(0, 10);
  const sitemapLine = `  <url><loc>https://bostonhomeguide.com/blog/${post.slug}</loc><lastmod>${isoDate}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
  sitemap = sitemap.replace(/<\/urlset>\s*$/, `${sitemapLine}</urlset>\n`);
  writeFileSync(SITEMAP_XML, sitemap);

  // 3. Write the remaining queue back
  writeFileSync(QUEUE_JSON, JSON.stringify(queue, null, 2) + '\n');

  console.log(`Published "${post.title}" (${post.slug}).`);
  console.log(`${queue.length} post(s) remaining in the queue.`);
  if (queue.length <= 2) {
    console.log('QUEUE_LOW=true');
  }
}

main();
