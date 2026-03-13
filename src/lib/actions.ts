/* eslint-disable @typescript-eslint/no-require-imports */
// This file formerly used 'use server'. Since this project is configured for static export (GitHub Pages),
// server actions are disabled on the live site. These functions will only work during build-time
// or in a local Node.js environment.

export async function getContent(filename: string) {
  if (typeof window !== 'undefined') {
    throw new Error('getContent can only be called on the server');
  }

  const fs = require('fs/promises');
  const path = require('path');
  const MESSAGES_DIR = path.join(process.cwd(), 'messages');

  try {
    const filePath = path.join(MESSAGES_DIR, filename);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading content from ${filename}:`, error);
    throw new Error('Failed to load content');
  }
}

export async function updateContent(filename: string, content: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    return { success: false, error: 'Content editing is only available in local development' };
  }

  const fs = require('fs/promises');
  const path = require('path');
  const { revalidatePath } = require('next/cache');
  const MESSAGES_DIR = path.join(process.cwd(), 'messages');

  try {
    const filePath = path.join(MESSAGES_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(content, null, 2), 'utf-8');
    
    // Revalidate paths to reflect changes
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(`Error updating content in ${filename}:`, error);
    return { success: false, error: 'Failed to save content' };
  }
}

export async function getMessageFiles() {
  if (typeof window !== 'undefined') return [];

  const fs = require('fs/promises');
  const path = require('path');
  const MESSAGES_DIR = path.join(process.cwd(), 'messages');

  try {
    const files = await fs.readdir(MESSAGES_DIR);
    return files.filter((f: string) => f.endsWith('.json'));
  } catch (error) {
    console.error('Error reading messages directory:', error);
    return [];
  }
}
