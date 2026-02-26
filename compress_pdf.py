import fitz  # PyMuPDF
import os

def compress_pdf_aggressive(input_path, output_path):
    """Aggressively compress PDF"""
    
    doc = fitz.open(input_path)
    
    # Create new document for compressed version
    new_doc = fitz.open()
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        
        # Render page as image at lower resolution
        # 120 DPI is enough for screen viewing
        mat = fitz.Matrix(1.5, 1.5)  # 108 DPI (72 * 1.5)
        pix = page.get_pixmap(matrix=mat, alpha=False)
        
        # Convert to RGB if necessary
        if pix.n > 3:
            pix = fitz.Pixmap(fitz.csRGB, pix)
        
        # Create new page in output document
        new_page = new_doc.new_page(width=page.rect.width, height=page.rect.height)
        
        # Insert compressed image
        img_data = pix.tobytes("jpeg", jpg_quality=60)
        new_page.insert_image(page.rect, stream=img_data)
        
        pix = None
    
    # Save with maximum compression
    new_doc.save(
        output_path,
        garbage=4,
        deflate=True,
        clean=True,
        linear=False
    )
    
    new_doc.close()
    doc.close()
    
    # Show file sizes
    original_size = os.path.getsize(input_path) / (1024 * 1024)
    compressed_size = os.path.getsize(output_path) / (1024 * 1024)
    
    print(f"Original: {original_size:.2f} MB")
    print(f"Compressed: {compressed_size:.2f} MB")
    print(f"Reduction: {(1 - compressed_size/original_size)*100:.1f}%")

if __name__ == "__main__":
    compress_pdf_aggressive("CV_Timur_Sadykov.pdf", "CV_Timur_Sadykov_small.pdf")
