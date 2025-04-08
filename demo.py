#!/usr/bin/env python3
"""
TradingView Documentation Scraper Demo

This script demonstrates how to use the TradingViewDocScraper class programmatically.
"""

from scraper import TradingViewDocScraper
import os

def demo_single_url():
    """Demo scraping a single URL"""
    print("\n=== Demo: Scraping a Single URL ===")
    
    # Initialize the scraper with a custom output directory
    scraper = TradingViewDocScraper(output_dir="demo_output/single")
    
    # Scrape a single URL
    url = "https://www.tradingview.com/charting-library-docs/latest/getting_started/quick-start"
    print(f"Scraping URL: {url}")
    
    content = scraper.scrape_url(url)
    
    # Print a preview
    print("\nContent preview:")
    print("-------------------")
    print(content[:500] + "...")
    print("-------------------")
    
    # Save to file
    output_file = os.path.join(scraper.output_dir, "quick_start.md")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"\nFull content saved to {output_file}")
    
    return output_file

def demo_single_section():
    """Demo scraping a single section"""
    print("\n=== Demo: Scraping a Single Section ===")
    
    # Initialize the scraper with a custom output directory
    scraper = TradingViewDocScraper(output_dir="demo_output/section", request_delay=1.5)
    
    # Parse the doc_links.md file
    print("Parsing doc_links.md to extract sections")
    sections = scraper.parse_doc_links("doc_links.md")
    
    # Print available sections
    print("\nAvailable sections:")
    for section_name, urls in sections.items():
        print(f"- {section_name} ({len(urls)} URLs)")
    
    # Choose a section to scrape (using 'custom indicators' as an example)
    section_name = "custom indicators"
    if section_name not in sections:
        print(f"Section '{section_name}' not found. Using the first available section.")
        section_name = list(sections.keys())[0]
    
    urls = sections[section_name]
    print(f"\nScraping section: {section_name} ({len(urls)} URLs)")
    
    # Scrape the section
    output_file = scraper.scrape_section(section_name, urls)
    
    print(f"\nSection content saved to {output_file}")
    
    return output_file

def demo_custom_processing():
    """Demo custom processing of scraped content"""
    print("\n=== Demo: Custom Processing of Scraped Content ===")
    
    # Initialize the scraper with a custom output directory
    scraper = TradingViewDocScraper(output_dir="demo_output/custom")
    
    # Scrape a single URL
    url = "https://www.tradingview.com/charting-library-docs/latest/ui_elements/Chart"
    print(f"Scraping URL: {url}")
    
    content = scraper.scrape_url(url)
    
    # Custom processing: extract code examples
    import re
    code_blocks = re.findall(r'```(\w+)\n(.*?)```', content, re.DOTALL)
    
    print(f"\nFound {len(code_blocks)} code blocks.")
    
    # Save code examples to separate files
    if code_blocks:
        code_dir = os.path.join(scraper.output_dir, "code_examples")
        os.makedirs(code_dir, exist_ok=True)
        
        for i, (language, code) in enumerate(code_blocks):
            file_ext = {
                'javascript': 'js',
                'typescript': 'ts',
                'json': 'json',
                'html': 'html',
                'css': 'css',
            }.get(language.lower(), 'txt')
            
            filename = f"example_{i+1}.{file_ext}"
            file_path = os.path.join(code_dir, filename)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(code)
            
            print(f"Saved code example {i+1} ({language}) to {file_path}")
    
    # Save the full content
    output_file = os.path.join(scraper.output_dir, "chart.md")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"\nFull content saved to {output_file}")
    
    return output_file

if __name__ == "__main__":
    # Make sure the demo output directory exists
    os.makedirs("demo_output", exist_ok=True)
    
    # Run all demos
    demo_single_url()
    demo_single_section()
    demo_custom_processing()
    
    print("\n=== All Demos Completed ===")
    print("Results saved to the demo_output directory.") 