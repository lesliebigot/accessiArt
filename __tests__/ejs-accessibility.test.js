// __tests__/ejs-accessibility.test.js
import fs from 'fs';
import ejs from 'ejs';

describe('Tests d\'accessibilité des templates EJS', () => {
  
  test('paintings.ejs doit avoir un seul h1', () => {
    const template = fs.readFileSync('./src/views/pages/paintings.ejs', 'utf-8');
    const mockData = {
      subtitle: 'Collection de tableaux', // ← Ajout de subtitle
      paintings: [
        {
          id: 1,
          title: 'La Nuit étoilée',
          painter: 'Vincent van Gogh',
          movement_id: 1,
          movement_name: 'Post-impressionnisme',
          image_url: '/test.jpg',
          short_description: 'Test description'
        }
      ],
      movements: [{ id: 1, name: 'Impressionnisme' }]
    };
    
    const html = ejs.render(template, mockData, {
      filename: './src/views/pages/paintings.ejs'
    });
    
    const h1Count = (html.match(/<h1[^>]*>/g) || []).length;
    expect(h1Count).toBe(1);
  });
  
  test('paintings.ejs - les images doivent avoir des attributs alt', () => {
    const template = fs.readFileSync('./src/views/pages/paintings.ejs', 'utf-8');
    const mockData = {
      subtitle: 'Collection de tableaux',
      paintings: [
        {
          id: 1,
          title: 'Test',
          painter: 'Test',
          movement_id: 1,
          movement_name: 'Test',
          image_url: '/test.jpg',
          short_description: 'Description test'
        }
      ],
      movements: []
    };
    
    const html = ejs.render(template, mockData, {
      filename: './src/views/pages/paintings.ejs'
    });
    
    // Vérifier que toutes les balises img ont un alt
    const imgTags = html.match(/<img[^>]*>/g) || [];
    imgTags.forEach(img => {
      expect(img).toContain('alt=');
      // Vérifier que l'alt n'est pas vide
      expect(img).toMatch(/alt="[^"]+"/);
    });
  });
  
  test('paintings.ejs - le select doit avoir un aria-label', () => {
    const template = fs.readFileSync('./src/views/pages/paintings.ejs', 'utf-8');
    const mockData = {
      subtitle: 'Collection de tableaux',
      paintings: [],
      movements: [{ id: 1, name: 'Test' }]
    };
    
    const html = ejs.render(template, mockData, {
      filename: './src/views/pages/paintings.ejs'
    });
    
    expect(html).toContain('id="movement-dropdown"');
    expect(html).toContain('aria-label=');
  });
  
  test('paintings.ejs - doit avoir role="status" avec aria-live', () => {
    const template = fs.readFileSync('./src/views/pages/paintings.ejs', 'utf-8');
    const mockData = {
      subtitle: 'Collection de tableaux',
      paintings: [
        {
          id: 1,
          title: 'Test',
          painter: 'Test',
          movement_id: 1,
          movement_name: 'Test',
          image_url: '/test.jpg',
          short_description: 'Test'
        }
      ],
      movements: []
    };
    
    const html = ejs.render(template, mockData, {
      filename: './src/views/pages/paintings.ejs'
    });
    
    expect(html).toContain('role="status"');
    expect(html).toContain('aria-live="polite"');
  });
  
  test('movements.ejs - les accordéons doivent avoir aria-label', () => {
    const template = fs.readFileSync('./src/views/pages/movements.ejs', 'utf-8');
    const mockData = {
      subtitle: 'Courants picturaux',
      movements: [
        {
          id: 1,
          name: 'Impressionnisme',
          description: 'Description du mouvement'
        }
      ]
    };
    
    const html = ejs.render(template, mockData, {
      filename: './src/views/pages/movements.ejs'
    });
    
    // Vérifier que les inputs radio ont des aria-label
    expect(html).toContain('aria-label=');
    expect(html).toContain('Déplier');
  });
  
  test('movements.ejs - doit avoir un seul h1', () => {
    const template = fs.readFileSync('./src/views/pages/movements.ejs', 'utf-8');
    const mockData = {
      subtitle: 'Courants picturaux',
      movements: [
        { id: 1, name: 'Test', description: 'Test' }
      ]
    };
    
    const html = ejs.render(template, mockData, {
      filename: './src/views/pages/movements.ejs'
    });
    
    const h1Count = (html.match(/<h1[^>]*>/g) || []).length;
    expect(h1Count).toBe(1);
  });
  
  test('painting.ejs - doit avoir une navigation breadcrumb', () => {
    const template = fs.readFileSync('./src/views/pages/painting.ejs', 'utf-8');
    const mockData = {
      subtitle: 'La Nuit étoilée',
      painting: {
        id: 1,
        title: 'La Nuit étoilée',
        painter: 'Vincent van Gogh',
        painted_at: new Date('1889-06-01'),
        movement_name: 'Post-impressionnisme',
        image_url: '/test.jpg',
        short_description: 'Test',
        dimensions: '73,7 × 92,1 cm',
        museum: 'MoMA',
        museum_url: 'https://moma.org',
        description_structured: {
          introduction: 'Introduction',
          composition: ['Paragraphe 1'],
          technique: ['Paragraphe technique'],
          interpretation: ['Paragraphe interprétation']
        }
      }
    };
    
    const html = ejs.render(template, mockData, {
      filename: './src/views/pages/painting.ejs'
    });
    
    expect(html).toContain('aria-label');
    expect(html).toMatch(/Ariane|breadcrumb/i);
    expect(html).toContain('aria-current="page"');
  });
  
  test('painting.ejs - les métadonnées doivent utiliser dl/dt/dd', () => {
    const template = fs.readFileSync('./src/views/pages/painting.ejs', 'utf-8');
    const mockData = {
      subtitle: 'Tableau',
      painting: {
        id: 1,
        title: 'Test',
        painter: 'Test',
        painted_at: new Date(),
        movement_name: 'Test',
        image_url: '/test.jpg',
        short_description: 'Test',
        description_structured: null
      }
    };
    
    const html = ejs.render(template, mockData, {
      filename: './src/views/pages/painting.ejs'
    });
    
    expect(html).toContain('<dl');
    expect(html).toContain('<dt');
    expect(html).toContain('<dd');
  });
  
  test('painting.ejs - la date doit utiliser la balise time', () => {
    const template = fs.readFileSync('./src/views/pages/painting.ejs', 'utf-8');
    const mockData = {
      subtitle: 'Tableau',
      painting: {
        id: 1,
        title: 'Test',
        painter: 'Test',
        painted_at: new Date('1889-06-01'),
        movement_name: 'Test',
        image_url: '/test.jpg',
        short_description: 'Test',
        description_structured: null
      }
    };
    
    const html = ejs.render(template, mockData, {
      filename: './src/views/pages/painting.ejs'
    });
    
    expect(html).toContain('<time');
    expect(html).toContain('datetime=');
  });
  
  test('home.ejs - doit avoir un seul h1', () => {
    const template = fs.readFileSync('./src/views/pages/home.ejs', 'utf-8');
    
    const html = ejs.render(template, { subtitle: 'Accueil' }, {
      filename: './src/views/pages/home.ejs'
    });
    
    const h1Count = (html.match(/<h1[^>]*>/g) || []).length;
    expect(h1Count).toBe(1);
  });
});