# TradingView Documentation Scraper

A Python-based tool to automatically scrape and format TradingView Charting Library documentation into well-structured Markdown files.

## Features

- Scrapes content from TradingView documentation URLs specified in `doc_links.md`
- Extracts content from the article element using XPath: `/html/body/div/div[2]/div/div/main/div/div/div[1]/div/article`
- Special handling for GitHub URLs
- Converts HTML content to clean, well-formatted Markdown
- Aggregates content by section into separate Markdown files
- Creates a table of contents for each section
- Generates an index file linking to all section files

## Requirements

- Python 3.7+
- Required packages (see `requirements.txt`)

## Installation

1. Clone this repository
2. Install the required packages:

```bash
pip install -r requirements.txt
```

## Usage

### Command-line Interface

The `run_scraper.py` script provides a command-line interface with various options:

```bash
python run_scraper.py [options]
```

Options:
- `--input`, `-i`: Input file containing documentation links (default: doc_links.md)
- `--output-dir`, `-o`: Output directory for scraped content (default: scraped_docs)
- `--url`, `-u`: Scrape a single URL instead of processing the entire doc_links.md file
- `--section`, `-s`: Only scrape the specified section from doc_links.md
- `--list-sections`, `-l`: List all sections in the doc_links.md file without scraping
- `--delay`, `-d`: Delay between requests in seconds (default: 1.0)

Examples:

List all sections in the doc_links.md file:
```bash
python run_scraper.py --list-sections
```

Scrape a single URL:
```bash
python run_scraper.py --url https://www.tradingview.com/charting-library-docs/latest/getting_started/quick-start
```

Scrape only the "custom indicators" section:
```bash
python run_scraper.py --section "custom indicators"
```

Scrape everything with a custom output directory:
```bash
python run_scraper.py --output-dir my_docs
```

### Running the Full Documentation Scraper

To scrape all sections defined in `doc_links.md`:

```bash
python scraper.py
```

This will:
1. Parse `doc_links.md` to identify all sections and their URLs
2. Scrape each URL and convert the content to Markdown
3. Aggregate the content by section
4. Save the aggregated content to the `scraped_docs` directory
5. Create an index file (`scraped_docs/index.md`) with links to all section files

### Using the Scraper Programmatically

You can also use the `TradingViewDocScraper` class programmatically:

```python
from scraper import TradingViewDocScraper

# Initialize the scraper
scraper = TradingViewDocScraper(output_dir="custom_docs_dir")

# Scrape a single URL
content = scraper.scrape_url("https://www.tradingview.com/charting-library-docs/latest/getting_started/quick-start")

# Scrape a specific section
sections = scraper.parse_doc_links("doc_links.md")
if "custom indicators" in sections:
    scraper.scrape_section("custom indicators", sections["custom indicators"])

# Scrape all sections
results = scraper.scrape_all_sections("doc_links.md")
```

## Structure of `doc_links.md`

The `doc_links.md` file should be structured as follows:

```
**section_name**
https://url1.com
https://url2.com

**another_section**
https://url3.com
...
```

Each section name should be enclosed in double asterisks (`**section_name**`), followed by a list of URLs (one per line).

## Output

The scraper will create:

1. One Markdown file per section in the output directory
2. An index file (`index.md`) with links to all section files

Each section file includes:
- A title based on the section name
- A table of contents with links to each scraped document
- The aggregated content from all URLs in that section

## Rate Limiting

To be respectful to the servers being scraped, the tool includes a configurable delay between requests (default: 1 second). 