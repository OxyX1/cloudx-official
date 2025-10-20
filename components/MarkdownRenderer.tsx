
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const parseMarkdown = (text: string) => {
  let html = text;

  // Code blocks
  html = html.replace(/```(\w*?)\n([\s\S]*?)\n```/g, (match, lang, code) => {
    const languageClass = lang ? `language-${lang}` : '';
    return `<pre class="bg-gray-900/70 p-4 rounded-lg overflow-x-auto text-sm my-4 border border-gray-600/50"><code class="${languageClass}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
  });
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Unordered lists
  html = html.replace(/^\s*[-*]\s+(.*)/gm, '<ul class="list-disc list-inside my-2"><li>$1</li></ul>');
  html = html.replace(/<\/ul>\n<ul/g, ''); // Combine adjacent lists
  
  // Paragraphs
  html = html.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('');
  html = html.replace(/<\/p><(pre|ul)/g, '<$1');
  html = html.replace(/<\/(pre|ul)><p>/g, '</$1>');
  
  return html;
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const parsedHtml = parseMarkdown(content);

  return (
    <div
      className="prose prose-invert prose-p:my-1 prose-strong:text-gray-100"
      dangerouslySetInnerHTML={{ __html: parsedHtml }}
    />
  );
};
