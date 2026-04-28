import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { notFound } from 'next/navigation';
import { Layers, ArrowLeft, ExternalLink } from 'lucide-react';
import { IframeAutoResize } from './IframeAutoResize';

interface Props {
  params: Promise<{ slug: string }>;
}

// ── Markdown → HTML (lightweight, no dependency) ──────────────────────

// Step 1: strip reviewer-notes frontmatter block (--- ... ---) at top of file
function stripFrontmatter(md: string): string {
  return md.replace(/^---[\s\S]+?^---\s*\n?/m, '').trimStart();
}

// Step 2: escape HTML entities in plain text
function escapeHtml(md: string): string {
  return md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Step 3: parse tables (must run BEFORE inline transforms so we can emit raw HTML tags)
// Escaped pipes (\|) inside cells are preserved by substituting a placeholder before splitting.
const ESCAPED_PIPE = '\x00PIPE\x00';

function splitTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/\\\|/g, ESCAPED_PIPE)
    .slice(1, -1)
    .split('|')
    .map(cell => cell.trim().replace(new RegExp(ESCAPED_PIPE, 'g'), '|'));
}

function parseMarkdownWithTables(md: string): string {
  const lines = md.split('\n');
  const output: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    // Detect table: line starts with |, next line is separator |---|
    if (
      line.trim().startsWith('|') &&
      lines[i + 1]?.trim().match(/^\|[-| :]+\|$/)
    ) {
      const headers = splitTableRow(line)
        .map(h => `<th>${h}</th>`)
        .join('');
      i += 2; // skip header + separator
      const rows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const cells = splitTableRow(lines[i])
          .map(c => `<td>${c}</td>`)
          .join('');
        rows.push(`<tr>${cells}</tr>`);
        i++;
      }
      output.push(
        `<table><thead><tr>${headers}</tr></thead><tbody>${rows.join('')}</tbody></table>`,
      );
      continue;
    }
    output.push(line);
    i++;
  }
  return output.join('\n');
}

// Convert "Simple/Forms/ElegantButton/Button" → "simple-forms-elegantbutton--button"
function storyPathToId(path: string): string {
  const parts = path.split('/').map(p => p.toLowerCase().replace(/[^a-z0-9]/g, ''));
  const title = parts.slice(0, -1).join('-');
  const story = parts[parts.length - 1];
  return `${title}--${story}`;
}

// Step 4: apply inline markdown transforms (no HTML escaping — already done)
function renderMarkdown(escaped: string, storybookUrl: string): string {
  return escaped
    // Headings
    .replace(/^#{6}\s+(.+)$/gm, '<h6>$1</h6>')
    .replace(/^#{5}\s+(.+)$/gm, '<h5>$1</h5>')
    .replace(/^#{4}\s+(.+)$/gm, '<h4>$1</h4>')
    .replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
    .replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
    .replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')
    // Horizontal rules
    .replace(/^---+$/gm, '<hr />')
    // Bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // STORYBOOK BLOCK → iframe (before inline-code so backtick-wrapped blocks aren't nested in <code>)
    .replace(/`?\[STORYBOOK BLOCK: (.+?)\]`?/g, (_m, path: string) => {
      const id = storyPathToId(path.trim());
      const src = `${storybookUrl}/iframe.html?id=${id}&viewMode=story&embed=1`;
      return `<iframe class="sb-frame" src="${src}" loading="lazy" scrolling="no" sandbox="allow-scripts allow-same-origin" title="${path.trim()}"></iframe>`;
    })
    // NEEDS CONFIRMATION → highlighted span
    .replace(/\[NEEDS CONFIRMATION\]/g, '<mark>[NEEDS CONFIRMATION]</mark>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Unordered lists
    .replace(/^[ \t]*[-*+]\s+(.+)$/gm, '<li>$1</li>')
    // Wrap consecutive <li> in <ul>
    .replace(/(<li>[\s\S]+?<\/li>)(?!\s*<li>)/g, (m) => `<ul>${m}</ul>`)
    // Ordered lists
    .replace(/^\d+\.\s+(.+)$/gm, '<oli>$1</oli>')
    .replace(/(<oli>[\s\S]+?<\/oli>)(?!\s*<oli>)/g, (m) =>
      `<ol>${m.replace(/<\/?oli>/g, match => match === '<oli>' ? '<li>' : '</li>')}</ol>`,
    )
    // Paragraph: blank-line-separated blocks not already tagged
    .replace(/\n\n(?!<[huo]|<hr|<div|<li|<ol|<table|<iframe)/g, '\n\n<p>')
    .replace(/<p>(.+)/g, '<p>$1</p>');
}

function mdToHtml(raw: string, storybookUrl: string): string {
  const stripped = stripFrontmatter(raw);
  const escaped = escapeHtml(stripped);
  const withTables = parseMarkdownWithTables(escaped);
  return renderMarkdown(withTables, storybookUrl);
}

// ── Page ──────────────────────────────────────────────────────────────
export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const filePath = join(process.cwd(), 'docs', `${slug}.md`);

  if (!existsSync(filePath)) {
    notFound();
  }

  const raw = readFileSync(filePath, 'utf-8');
  const storybookUrl = process.env.NEXT_PUBLIC_STORYBOOK_URL ?? 'http://localhost:6007';
  const html = mdToHtml(raw, storybookUrl);

  // Extract component name from the first h1 in the raw markdown
  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : slug;

  return (
    <>
      <style>{`
        .doc-body { color: var(--color-text-body); }
        .doc-body h1 {
          font-family: var(--primitive-font-serif);
          font-size: var(--primitive-font-size-3xl);
          font-weight: var(--primitive-font-weight-medium);
          color: var(--color-text-title);
          letter-spacing: -0.02em;
          margin: 0 0 8px;
          line-height: 1.2;
        }
        .doc-body h2 {
          font-family: var(--primitive-font-serif);
          font-size: var(--primitive-font-size-xl);
          font-weight: var(--primitive-font-weight-medium);
          color: var(--color-text-title);
          letter-spacing: -0.02em;
          margin: 48px 0 16px;
          padding-top: 48px;
          border-top: 1px solid var(--color-border-subtle);
          line-height: 1.3;
        }
        .doc-body h2:first-of-type { margin-top: 32px; padding-top: 0; border-top: none; }
        .doc-body h3 {
          font-family: var(--primitive-font-sans);
          font-size: var(--primitive-font-size-sm);
          font-weight: var(--primitive-font-weight-medium);
          color: var(--color-text-title);
          letter-spacing: -0.01em;
          margin: 24px 0 8px;
        }
        .doc-body h4 {
          font-family: var(--primitive-font-sans);
          font-size: var(--primitive-font-size-xs);
          font-weight: var(--primitive-font-weight-medium);
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 20px 0 6px;
        }
        .doc-body p {
          font-family: var(--primitive-font-sans);
          font-size: var(--primitive-font-size-sm);
          color: var(--color-text-body);
          line-height: 1.7;
          margin: 0 0 16px;
          letter-spacing: -0.01em;
        }
        .doc-body ul, .doc-body ol {
          font-family: var(--primitive-font-sans);
          font-size: var(--primitive-font-size-sm);
          color: var(--color-text-body);
          line-height: 1.7;
          margin: 0 0 16px;
          padding-left: 20px;
          letter-spacing: -0.01em;
        }
        .doc-body li { margin-bottom: 4px; }
        .doc-body strong { font-weight: var(--primitive-font-weight-medium); color: var(--color-text-title); }
        .doc-body em { font-style: italic; }
        .doc-body code {
          font-family: var(--primitive-font-mono);
          font-size: 0.85em;
          background: var(--color-bg-surface);
          border: 1px solid var(--color-border-subtle);
          padding: 1px 5px;
          border-radius: 2px;
        }
        .doc-body hr {
          border: none;
          border-top: 1px solid var(--color-border-subtle);
          margin: 32px 0;
        }
        .doc-body table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--primitive-font-sans);
          font-size: var(--primitive-font-size-xs);
          margin: 0 0 24px;
        }
        .doc-body th {
          text-align: left;
          font-weight: var(--primitive-font-weight-medium);
          color: var(--color-text-title);
          border-bottom: 2px solid var(--color-border-subtle);
          padding: 8px 12px;
          background: var(--color-bg-surface);
          letter-spacing: -0.01em;
        }
        .doc-body td {
          border-bottom: 1px solid var(--color-border-subtle);
          padding: 8px 12px;
          color: var(--color-text-body);
          vertical-align: top;
          line-height: 1.5;
        }
        .doc-body tr:last-child td { border-bottom: none; }
        .doc-body mark {
          background: #fef9c3;
          color: #854d0e;
          padding: 1px 4px;
          border-radius: 2px;
          font-size: 0.85em;
        }
        .sb-frame {
          display: block;
          width: 100%;
          height: 80px;
          min-height: 80px;
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--primitive-radius-md);
          background: var(--color-bg-surface);
          margin: 12px 0 28px;
          transition: height 200ms ease;
          overflow: hidden;
        }
      `}</style>

      <IframeAutoResize />
      <div style={{ background: 'var(--color-bg-main)', minHeight: '100vh' }}>

        {/* Nav */}
        <nav style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--size-page-gutter)',
          height: '56px',
        }}>
          <a href="/design-system" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--primitive-font-sans)',
            fontSize: 'var(--primitive-font-size-xs)',
            letterSpacing: '-0.01em',
          }}>
            <ArrowLeft size={14} />
            Elegant Design System
          </a>
          <a
            href={`${storybookUrl}/?path=/story/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--primitive-font-sans)',
              fontSize: 'var(--primitive-font-size-xs)',
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            <ExternalLink size={13} />
            Storybook
          </a>
        </nav>

        {/* Content */}
        <main style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '56px var(--size-page-gutter) 96px',
        }}>
          <div
            className="doc-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </main>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const name = slug
    .replace(/-zh$/, '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return {
    title: `${name} — Elegant Design System`,
  };
}
