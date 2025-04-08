import requests
from bs4 import BeautifulSoup
import re
import os
from lxml import etree
import time
import html2text
import markdown
import json
from urllib.parse import urlparse, urljoin

class TradingViewDocScraper:
    def __init__(self, output_dir="scraped_docs", request_delay=1.0):
        self.output_dir = output_dir
        self.request_delay = request_delay
        self.h2t = html2text.HTML2Text()
        self.h2t.ignore_links = False
        self.h2t.ignore_images = False
        self.h2t.ignore_tables = False
        self.h2t.body_width = 0  # No wrapping
        
        # Create output directory if it doesn't exist
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            
        # Headers to mimic a browser
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Cache-Control': 'max-age=0',
        }

    def scrape_url(self, url):
        """Scrape content from a single URL"""
        print(f"Scraping: {url}")
        
        try:
            # For GitHub URLs, handle differently
            if 'github.com' in url:
                return self._scrape_github_url(url)
            
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            dom = etree.HTML(response.text)
            
            # Try to find article content using XPath
            article_elements = dom.xpath('/html/body/div/div[2]/div/div/main/div/div/div[1]/div/article')
            
            if not article_elements:
                # Fallback to BeautifulSoup if XPath doesn't work
                article = soup.find('article')
                if article:
                    html_content = str(article)
                else:
                    print(f"⚠️ Could not find article content in {url}")
                    return f"# Content not found\n\nUnable to extract content from {url}"
            else:
                html_content = etree.tostring(article_elements[0], encoding='unicode')
            
            # Convert HTML to Markdown
            markdown_content = self.h2t.handle(html_content)
            
            # Clean up the markdown
            markdown_content = self._clean_markdown(markdown_content)
            
            # Add page title and URL reference
            page_title = soup.title.text if soup.title else "Untitled Page"
            markdown_content = f"# {page_title.strip()}\n\n*Source: {url}*\n\n{markdown_content}"
            
            return markdown_content
            
        except Exception as e:
            print(f"Error scraping {url}: {e}")
            return f"# Error scraping content\n\nFailed to scrape content from {url}\nError: {str(e)}"
    
    def _scrape_github_url(self, url):
        """Special handling for GitHub URLs"""
        try:
            parsed_url = urlparse(url)
            path_parts = parsed_url.path.split('/')
            
            # Check if it's a directory
            if 'tree' in path_parts:
                # It's a directory listing
                response = requests.get(url, headers=self.headers)
                response.raise_for_status()
                
                soup = BeautifulSoup(response.text, 'html.parser')
                readme = soup.find('article', class_='markdown-body')
                
                if readme:
                    markdown_content = self.h2t.handle(str(readme))
                    return f"# GitHub Repository: {'/'.join(path_parts[1:3])}\n\n*Source: {url}*\n\n{markdown_content}"
                else:
                    files = []
                    for item in soup.select('a[role="row"]'):
                        file_name = item.select_one('.text-bold')
                        if file_name:
                            files.append(file_name.text.strip())
                    
                    return f"# GitHub Directory: {'/'.join(path_parts[1:])}\n\n*Source: {url}*\n\n## Files:\n\n" + "\n".join([f"- {file}" for file in files])
            else:
                # It's a file
                response = requests.get(url, headers=self.headers)
                response.raise_for_status()
                
                soup = BeautifulSoup(response.text, 'html.parser')
                content = soup.find('article', class_='markdown-body') or soup.find('div', itemprop='text')
                
                if content:
                    markdown_content = self.h2t.handle(str(content))
                    return f"# GitHub File: {path_parts[-1]}\n\n*Source: {url}*\n\n{markdown_content}"
                else:
                    return f"# GitHub Content\n\n*Source: {url}*\n\nCould not extract content from this GitHub URL."
        
        except Exception as e:
            print(f"Error scraping GitHub {url}: {e}")
            return f"# Error scraping GitHub content\n\nFailed to scrape content from {url}\nError: {str(e)}"
    
    def _clean_markdown(self, markdown_text):
        """Clean and format the markdown text"""
        # Fix code blocks (ensure they have proper spacing)
        markdown_text = re.sub(r'```(\w+)(?!\n)', r'```\1\n', markdown_text)
        
        # Fix heading levels (ensure proper spacing)
        markdown_text = re.sub(r'(#+)([^ #])', r'\1 \2', markdown_text)
        
        # Remove excessive newlines
        markdown_text = re.sub(r'\n{3,}', '\n\n', markdown_text)
        
        # Fix list formatting
        markdown_text = re.sub(r'(\n\s*)-\s+', r'\1- ', markdown_text)
        
        # Fix image paths - make them absolute if they're relative
        return markdown_text
    
    def parse_doc_links(self, doc_links_file):
        """Parse the doc_links.md file and extract sections with their URLs"""
        with open(doc_links_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Split into sections using the ** markers
        sections = re.split(r'\*\*(.*?)\*\*', content)
        
        # Process the sections
        result = {}
        current_section = None
        
        for i, section in enumerate(sections):
            if i % 2 == 1:  # This is a section title
                current_section = section.strip()
                result[current_section] = []
            elif i > 0 and current_section:  # This contains URLs
                urls = re.findall(r'https?://[^\s]+', section)
                result[current_section].extend(urls)
        
        return result
    
    def scrape_section(self, section_name, urls):
        """Scrape all URLs in a section and aggregate them into a single markdown file"""
        print(f"\n===== Processing section: {section_name} =====")
        
        # Create a safe filename
        safe_name = re.sub(r'[^\w\-]', '_', section_name.lower())
        output_file = os.path.join(self.output_dir, f"{safe_name}.md")
        
        combined_content = f"# {section_name}\n\n"
        combined_content += f"*This document contains aggregated content from {len(urls)} URLs*\n\n"
        combined_content += "## Table of Contents\n\n"
        
        # Process each URL
        url_contents = []
        for i, url in enumerate(urls):
            print(f"[{i+1}/{len(urls)}] Scraping: {url}")
            
            # Rate limiting to be nice to the server
            if i > 0:
                time.sleep(self.request_delay)
            
            content = self.scrape_url(url)
            
            # Extract the first heading to use in the TOC
            title_match = re.search(r'# (.+?)(?:\n|$)', content)
            title = title_match.group(1) if title_match else f"Content {i+1}"
            
            # Add to table of contents
            combined_content += f"{i+1}. [{title}](#{title.lower().replace(' ', '-').replace('.', '').replace(':', '')})\n"
            
            # Prepare content for inclusion
            content = re.sub(r'^# .+?\n', f"## {title}\n", content, 1)
            url_contents.append(content)
        
        # Add the actual content
        combined_content += "\n\n---\n\n"
        combined_content += "\n\n---\n\n".join(url_contents)
        
        # Save to file
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(combined_content)
        
        print(f"✅ Saved section '{section_name}' to {output_file}")
        return output_file
    
    def scrape_all_sections(self, doc_links_file):
        """Process all sections in the doc_links.md file"""
        sections = self.parse_doc_links(doc_links_file)
        
        results = {}
        for section_name, urls in sections.items():
            if urls:  # Skip empty sections
                output_file = self.scrape_section(section_name, urls)
                results[section_name] = {
                    'output_file': output_file,
                    'url_count': len(urls)
                }
        
        # Create an index file
        self._create_index_file(results)
        
        return results
    
    def _create_index_file(self, results):
        """Create an index file that links to all section files"""
        index_path = os.path.join(self.output_dir, "index.md")
        
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write("# TradingView Documentation\n\n")
            f.write("This repository contains scraped and formatted documentation from the TradingView Charting Library.\n\n")
            f.write("## Sections\n\n")
            
            for section_name, info in results.items():
                filename = os.path.basename(info['output_file'])
                f.write(f"- [{section_name}]({filename}) ({info['url_count']} documents)\n")

if __name__ == "__main__":
    scraper = TradingViewDocScraper()
    
    # Example for single URL scraping
    # content = scraper.scrape_url("https://www.tradingview.com/charting-library-docs/latest/getting_started/quick-start")
    # print(content[:500])  # Print a preview
    
    # Scrape all sections
    results = scraper.scrape_all_sections("doc_links.md")
    print(f"\nScraped {sum(info['url_count'] for info in results.values())} URLs into {len(results)} section files.")
    print(f"Results saved to {scraper.output_dir}/") 