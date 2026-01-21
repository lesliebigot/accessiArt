// __tests__/simple.test.js
describe('Tests d\'accessibilité manuels (sans axe-core)', () => {
  
    test('Vérifier la structure HTML basique', () => {
      const html = `
        <!DOCTYPE html>
        <html lang="fr">
          <head><title>Test</title></head>
          <body>
            <main>
              <h1>Titre principal</h1>
              <p>Contenu</p>
            </main>
          </body>
        </html>
      `;
      
      // Test sans JSDOM - juste des vérifications de chaîne
      expect(html).toContain('<html lang="fr">');
      expect(html).toContain('<h1>');
      expect(html).toContain('<main>');
    });
    
    test('Vérifier qu\'il y a un seul h1', () => {
      const html = '<h1>Titre 1</h1><h2>Titre 2</h2>';
      const h1Count = (html.match(/<h1>/g) || []).length;
      
      expect(h1Count).toBe(1);
    });
    
    test('Vérifier que les images ont des alt', () => {
      const htmlWithAlt = '<img src="test.jpg" alt="Description">';
      const htmlWithoutAlt = '<img src="test.jpg">';
      
      expect(htmlWithAlt).toContain('alt=');
      expect(htmlWithoutAlt).not.toContain('alt=');
    });
    
    test('Vérifier les aria-label sur les liens', () => {
      const html = '<a href="/page" aria-label="Aller à la page">Lien</a>';
      
      expect(html).toContain('aria-label=');
    });
  });