from playwright.sync_api import sync_playwright
import os

def html_to_pdf_clean(html_path, pdf_path):
    """Convert HTML to PDF without rasterization - text and links preserved"""
    
    html_absolute = os.path.abspath(html_path)
    file_url = f"file:///{html_absolute.replace('\\', '/')}"
    
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        
        page.goto(file_url, wait_until='networkidle')
        page.wait_for_timeout(3000)
        
        # Generate PDF with text preserved
        page.pdf(
            path=pdf_path,
            format='A4',
            margin={
                'top': '5mm',
                'bottom': '5mm',
                'left': '5mm',
                'right': '5mm'
            },
            print_background=True,
            prefer_css_page_size=False,
            tagged=True
        )
        
        browser.close()
        
    print(f"PDF created: {pdf_path}")

if __name__ == "__main__":
    html_to_pdf_clean("cv-en.html", "CV_Timur_Sadykov_EN.pdf")
