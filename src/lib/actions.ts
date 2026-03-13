'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const MESSAGES_DIR = path.join(process.cwd(), 'messages');

export async function getContent(filename: string) {
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
  try {
    const filePath = path.join(MESSAGES_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(content, null, 2), 'utf-8');
    
    // Revalidate paths to reflect changes
    revalidatePath('/');
    revalidatePath('/[locale]', 'layout');
    revalidatePath('/[locale]/about', 'page');
    revalidatePath('/[locale]/contact', 'page');
    revalidatePath('/[locale]/partnership', 'page');
    revalidatePath('/[locale]/insights', 'page');
    revalidatePath('/[locale]/ecosystem', 'page');
    
    return { success: true };
  } catch (error) {
    console.error(`Error updating content in ${filename}:`, error);
    return { success: false, error: 'Failed to save content' };
  }
}

export async function getMessageFiles() {
  try {
    const files = await fs.readdir(MESSAGES_DIR);
    return files.filter(f => f.endsWith('.json'));
  } catch (error) {
    console.error('Error reading messages directory:', error);
    return [];
  }
}
