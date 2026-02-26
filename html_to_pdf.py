from playwright.sync_api import sync_playwright
import os

def html_to_pdf(html_path, pdf_path):
    """Convert HTML file to PDF with dark theme"""
    
    # Get absolute path
    html_absolute = os.path.abspath(html_path)
    file_url = f"file:///{html_absolute.replace('\\', '/')}"
    
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch()
        page = browser.new_page()
        
        # Navigate to HTML file
        page.goto(file_url, wait_until='networkidle')
        
        # Wait for fonts and images to load
        page.wait_for_timeout(3000)
        
        # Generate PDF as A4 with multiple pages
        page.pdf(
            path=pdf_path,
            format='A4',
            margin={
                'top': '10mm',
                'bottom': '10mm',
                'left': '10mm',
                'right': '10mm'
            },
            print_background=True,
            prefer_css_page_size=False
        )
        
        browser.close()
        
    print(f"PDF created: {pdf_path}")

if __name__ == "__main__":
    html_to_pdf("cv.html", "CV_Timur_Sadykov.pdf")
