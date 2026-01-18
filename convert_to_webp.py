#!/usr/bin/env python3
"""
Script de conversion d'images JPEG vers WebP
Pour le projet Accessi'Art
"""

import os
import sys
from pathlib import Path
from PIL import Image

def convert_jpeg_to_webp(input_path, output_path=None, quality=85):
    """
    Convertit une image JPEG en WebP
    
    Args:
        input_path: Chemin de l'image JPEG source
        output_path: Chemin de sortie (optionnel, remplace .jpg/.jpeg par .webp)
        quality: Qualité de compression (0-100, défaut: 85)
    """
    try:
        # Ouvrir l'image
        img = Image.open(input_path)
        
        # Déterminer le chemin de sortie
        if output_path is None:
            output_path = Path(input_path).with_suffix('.webp')
        
        # Convertir et sauvegarder en WebP
        img.save(output_path, 'webp', quality=quality, method=6)
        
        # Calculer la réduction de taille
        original_size = os.path.getsize(input_path)
        new_size = os.path.getsize(output_path)
        reduction = ((original_size - new_size) / original_size) * 100
        
        print(f"✅ Converti: {Path(input_path).name}")
        print(f"   Taille originale: {original_size / 1024:.2f} Ko")
        print(f"   Nouvelle taille: {new_size / 1024:.2f} Ko")
        print(f"   Réduction: {reduction:.1f}%\n")
        
        return True
        
    except Exception as e:
        print(f"❌ Erreur lors de la conversion de {input_path}: {e}")
        return False

def convert_directory(directory, quality=85, recursive=True):
    """
    Convertit toutes les images JPEG d'un répertoire en WebP
    
    Args:
        directory: Répertoire contenant les images
        quality: Qualité de compression (0-100)
        recursive: Parcourir les sous-répertoires
    """
    directory = Path(directory)
    
    if not directory.exists():
        print(f"❌ Le répertoire {directory} n'existe pas")
        return
    
    # Extensions à rechercher
    extensions = ['*.jpg', '*.jpeg', '*.JPG', '*.JPEG']
    
    # Trouver toutes les images
    images = []
    for ext in extensions:
        if recursive:
            images.extend(directory.rglob(ext))
        else:
            images.extend(directory.glob(ext))
    
    if not images:
        print(f"⚠️  Aucune image JPEG trouvée dans {directory}")
        return
    
    print(f"🖼️  {len(images)} image(s) JPEG trouvée(s)\n")
    print("=" * 60)
    
    # Convertir chaque image
    success_count = 0
    for img_path in images:
        if convert_jpeg_to_webp(img_path, quality=quality):
            success_count += 1
    
    print("=" * 60)
    print(f"\n✨ Conversion terminée: {success_count}/{len(images)} image(s) convertie(s)")

def main():
    """Fonction principale"""
    if len(sys.argv) < 2:
        print("📖 Usage:")
        print("  python3 convert_to_webp.py <fichier_ou_dossier> [qualité]")
        print("\nExemples:")
        print("  python3 convert_to_webp.py image.jpg")
        print("  python3 convert_to_webp.py ./public/images/")
        print("  python3 convert_to_webp.py ./public/images/ 90")
        print("\nQualité: 0-100 (défaut: 85)")
        print("  - 85-95: Haute qualité (recommandé)")
        print("  - 75-84: Qualité moyenne")
        print("  - 60-74: Qualité basse")
        sys.exit(1)
    
    path = sys.argv[1]
    quality = int(sys.argv[2]) if len(sys.argv) > 2 else 85
    
    # Vérifier la qualité
    if not 0 <= quality <= 100:
        print("❌ La qualité doit être entre 0 et 100")
        sys.exit(1)
    
    print("🎨 Accessi'Art - Convertisseur JPEG → WebP")
    print("=" * 60)
    print(f"Qualité: {quality}/100\n")
    
    # Convertir fichier ou dossier
    path_obj = Path(path)
    if path_obj.is_file():
        convert_jpeg_to_webp(path, quality=quality)
    elif path_obj.is_dir():
        convert_directory(path, quality=quality)
    else:
        print(f"❌ Le chemin {path} n'existe pas")
        sys.exit(1)

if __name__ == "__main__":
    main()
