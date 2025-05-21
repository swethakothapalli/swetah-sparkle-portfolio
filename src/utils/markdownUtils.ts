
// Enhanced frontmatter parser for browser environment
export function parseFrontMatter(markdown: string) {
  // Multiple regex patterns to handle different frontmatter formats
  const patterns = [
    /^---\r?\n([\s\S]*?)\r?\n---\r?\n/,     // Standard YAML format
    /^---\r?\n([\s\S]*?)\r?\n---/,          // Alternative YAML format
    /^\+\+\+\r?\n([\s\S]*?)\r?\n\+\+\+\r?\n/, // TOML format
    /^\{\{[\s\S]*?\}\}\r?\n/                // JSON format
  ];
  
  let match = null;
  
  // Try each pattern until we find a match
  for (const pattern of patterns) {
    match = pattern.exec(markdown);
    if (match) break;
  }
  
  if (!match) {
    console.warn("No frontmatter found in markdown, creating default metadata");
    return { 
      data: {}, 
      content: markdown 
    };
  }
  
  const frontMatter = match[1];
  // Extract content by removing the frontmatter section completely
  const content = markdown.replace(match[0], '').trim();
  
  // Parse the YAML-like frontmatter
  const data: Record<string, any> = {};
  const lines = frontMatter.split('\n');
  
  for (const line of lines) {
    if (line.trim() === '' || line.trim().startsWith('#')) continue;
    
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Handle quoted strings
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      
      // Handle arrays (simple implementation)
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          const arrayStr = value.replace(/'/g, '"'); // Replace single quotes with double quotes
          data[key] = JSON.parse(arrayStr);
        } catch (e) {
          console.warn(`Failed to parse array value for key ${key}:`, value);
          data[key] = [];
        }
      } else {
        data[key] = value;
      }
    }
  }
  
  return { data, content };
}
