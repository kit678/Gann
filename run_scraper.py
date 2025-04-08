#!/usr/bin/env python3
import argparse
import sys
from scraper import TradingViewDocScraper

def main():
    parser = argparse.ArgumentParser(description='Scrape TradingView documentation and convert to Markdown.')
    parser.add_argument('--input', '-i', default='doc_links.md', help='Input file containing documentation links (default: doc_links.md)')
    parser.add_argument('--output-dir', '-o', default='scraped_docs', help='Output directory for scraped content (default: scraped_docs)')
    parser.add_argument('--url', '-u', help='Scrape a single URL instead of processing the entire doc_links.md file')
    parser.add_argument('--section', '-s', help='Only scrape the specified section from doc_links.md')
    parser.add_argument('--list-sections', '-l', action='store_true', help='List all sections in the doc_links.md file without scraping')
    parser.add_argument('--delay', '-d', type=float, default=1.0, help='Delay between requests in seconds (default: 1.0)')
    
    args = parser.parse_args()
    
    # Initialize the scraper
    scraper = TradingViewDocScraper(output_dir=args.output_dir, request_delay=args.delay)
    
    # Single URL mode
    if args.url:
        print(f"Scraping single URL: {args.url}")
        content = scraper.scrape_url(args.url)
        print("\nContent preview:")
        print("-------------------")
        print(content[:500] + "...")
        print("-------------------")
        
        filename = f"{args.output_dir}/single_url_content.md"
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Full content saved to {filename}")
        return
    
    # Parse doc_links.md
    try:
        sections = scraper.parse_doc_links(args.input)
    except Exception as e:
        print(f"Error parsing {args.input}: {e}")
        sys.exit(1)
    
    # List sections mode
    if args.list_sections:
        print(f"Sections in {args.input}:")
        for section, urls in sections.items():
            print(f"- {section} ({len(urls)} URLs)")
        return
    
    # Single section mode
    if args.section:
        if args.section not in sections:
            print(f"Error: Section '{args.section}' not found in {args.input}")
            print("Available sections:")
            for section in sections:
                print(f"- {section}")
            sys.exit(1)
        
        print(f"Scraping section: {args.section}")
        urls = sections[args.section]
        output_file = scraper.scrape_section(args.section, urls)
        print(f"Section content saved to {output_file}")
        return
    
    # Full scrape mode
    results = scraper.scrape_all_sections(args.input)
    print(f"\nScraped {sum(info['url_count'] for info in results.values())} URLs into {len(results)} section files.")
    print(f"Results saved to {args.output_dir}/")

if __name__ == "__main__":
    main() 