import os
import sys
from pathlib import Path
from PIL import Image

def optimize_image(input_path, max_width=1920, quality=90):
    try:
        img = Image.open(input_path)
        original_width, original_height = img.size
        if original_width > max_width:
            ratio = max_width / float(original_width)
            new_height = int(float(original_height) * float(ratio))
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            print(f"Redimensionne de {original_width}px a {max_width}px")
        
        output_path = Path(input_path).with_name(Path(input_path).stem + "_optimized.webp")
        img.save(output_path, 'webp', quality=quality, method=6)
        print(f"Succes : {output_path.name}")
        return True
    except Exception as e:
        print(f"Erreur : {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(1)
    optimize_image(sys.argv[1])
