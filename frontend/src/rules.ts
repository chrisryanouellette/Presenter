const rules: [RegExp, string][] = [
  // Code
  [
    /```copy\n((.|\n)*)```/g,
    '<div class="code"><button>Copy</button><code>$1</code></div>',
  ],
  [/```\n((.|\n)*)```/g, '<div class="code"><code>$1</code></div>'],

  // header rules
  [/#{6}\s?([^\n]+)/g, "<h6>$1</h6>"],
  [/#{5}\s?([^\n]+)/g, "<h5>$1</h5>"],
  [/#{4}\s?([^\n]+)/g, "<h4>$1</h4>"],
  [/#{3}\s?([^\n]+)/g, "<h3>$1</h3>"],
  [/#{2}\s?([^\n]+)/g, "<h2>$1</h2>"],
  [/#{1}\s?([^\n]+)/g, "<h1>$1</h1>"],

  // bold, italics and paragraph rules
  [/\*\*\s?([^\n]+)\*\*/g, "<b>$1</b>"],
  [/\*\s?([^\n]+)\*/g, "<i>$1</i>"],
  [/__([^_]+)__/g, "<b>$1</b>"],
  [/_([^_`]+)_/g, "<i>$1</i>"],
  [/([^\n]+\n?)/g, "<p>$1</p>"],

  // custom text rules
  [/\$alert\s?([^\n]+)/g, '<p class="alert">$1</p>'],
  [/\$warning\s?([^\n]+)/g, '<p class="warning">$1</p>'],
  [/\$info\s?([^\n]+)/g, '<p class="info">$1</p>'],

  // links
  [
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" style="color:#2A5DB0;text-decoration: none;">$1</a>',
  ],

  // highlights
  [/(`)(\s?[^\n,]+\s?)(`)/g, '<code class="inline-code">$2</code>'],

  // Lists
  [/([^\n]+)(\+)([^\n]+)/g, "<ul><li>$3</li></ul>"],
  [/([^\n]+)(\*)([^\n]+)/g, "<ul><li>$3</li></ul>"],

  // Image
  [
    /!\[([^\]]+)\]\(([^)]+)\s"([^")]+)"\)/g,
    '<img src="$2" alt="$1" title="$3" />',
  ],
];

export { rules };
