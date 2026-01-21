import { JSDOM } from 'jsdom';
import { axe } from 'jest-axe';
import fs from 'fs';
import ejs from 'ejs';

describe('Tests d\'accessibilité pour les lecteurs d\'écran', () => {
  
  // Test 1 : Page des tableaux
  describe('Page paintings.ejs', () => {
    let html;
    
    beforeAll(async () => {
      // Simuler les données
      const mockData = {
        paintings: [
          {
            id: 1,
            title: 'La Nuit étoilée',
            painter: 'Vincent van Gogh',
            movement_id: 2,
            movement_name: 'Post-impressionnisme',
            image_url: '/images/test.jpg',
            short_description: 'Test description'
          }
        ],
        movements: [
          { id: 1, name: 'Impressionnisme' },
          { id: 2, name: 'Post-impressionnisme' }
        ]
      };
      
      // Render le template EJS
      const template = fs.readFileSync('./views/paintings.ejs', 'utf-8');
      html = ejs.render(template, mockData, { 
        filename: './views/paintings.ejs',
        root: './views'
      });
    });
    
    test('doit avoir un seul h1 par page', () => {
      const dom = new JSDOM(html);
      const h1Elements = dom.window.document.querySelectorAll('h1');
      expect(h1Elements.length).toBe(1);
    });
    
    test('doit avoir un seul main par page', () => {
      const dom = new JSDOM(html);
      const mainElements = dom.window.document.querySelectorAll('main');
      expect(mainElements.length).toBe(1);
    });
    
    test('les images doivent avoir des attributs alt descriptifs', () => {
      const dom = new JSDOM(html);
      const images = dom.window.document.querySelectorAll('img');
      
      images.forEach(img => {
        expect(img.getAttribute('alt')).toBeTruthy();
        expect(img.getAttribute('alt').length).toBeGreaterThan(5);
      });
    });
    
    test('le filtre doit avoir un label accessible', () => {
      const dom = new JSDOM(html);
      const select = dom.window.document.querySelector('#movement-dropdown');
      
      expect(select).toBeTruthy();
      expect(select.getAttribute('aria-label')).toBeTruthy();
      
      // Vérifier qu'il y a un label associé
      const label = dom.window.document.querySelector('label[for="movement-dropdown"]');
      expect(label).toBeTruthy();
    });
    
    test('les liens "En savoir plus" doivent avoir des aria-label descriptifs', () => {
      const dom = new JSDOM(html);
      const links = dom.window.document.querySelectorAll('a[aria-label*="En savoir plus"]');
      
      links.forEach(link => {
        const ariaLabel = link.getAttribute('aria-label');
        expect(ariaLabel).toContain('En savoir plus sur');
        expect(ariaLabel).toContain('de'); // "de [artiste]"
      });
    });
    
    test('doit avoir role="status" avec aria-live pour les annonces dynamiques', () => {
      const dom = new JSDOM(html);
      const statusElement = dom.window.document.querySelector('[role="status"][aria-live="polite"]');
      
      expect(statusElement).toBeTruthy();
      expect(statusElement.textContent).toContain('dans la collection');
    });
    
    test('ne doit avoir aucune violation d\'accessibilité avec axe-core', async () => {
      const dom = new JSDOM(html);
      const results = await axe(dom.window.document.body);
      
      expect(results).toHaveNoViolations();
    });
  });
  
  // Test 2 : Page des mouvements picturaux
  describe('Page movements.ejs', () => {
    let html;
    
    beforeAll(async () => {
      const mockData = {
        movements: [
          {
            id: 1,
            name: 'Impressionnisme',
            description: 'Description du mouvement'
          }
        ]
      };
      
      const template = fs.readFileSync('./views/movements.ejs', 'utf-8');
      html = ejs.render(template, mockData, { 
        filename: './views/movements.ejs',
        root: './views'
      });
    });
    
    test('les accordéons doivent avoir aria-label sur les inputs radio', () => {
      const dom = new JSDOM(html);
      const radioInputs = dom.window.document.querySelectorAll('input[type="radio"][name="movements-accordion"]');
      
      radioInputs.forEach(radio => {
        expect(radio.getAttribute('aria-label')).toBeTruthy();
        expect(radio.getAttribute('aria-label')).toContain('Déplier');
      });
    });
    
    test('les titres cliquables doivent avoir role="button" et aria-expanded', () => {
      const dom = new JSDOM(html);
      const collapseTitles = dom.window.document.querySelectorAll('.collapse-title');
      
      collapseTitles.forEach(title => {
        expect(title.getAttribute('role')).toBe('button');
        expect(title.hasAttribute('aria-expanded')).toBe(true);
      });
    });
    
    test('doit avoir des instructions pour les lecteurs d\'écran', () => {
      const dom = new JSDOM(html);
      const instructions = dom.window.document.querySelector('.sr-only');
      
      expect(instructions).toBeTruthy();
      expect(instructions.textContent).toContain('déplié');
    });
    
    test('ne doit avoir aucune violation d\'accessibilité', async () => {
      const dom = new JSDOM(html);
      const results = await axe(dom.window.document.body);
      
      expect(results).toHaveNoViolations();
    });
  });
  
  // Test 3 : Page de détail d'un tableau
  describe('Page painting-detail.ejs', () => {
    let html;
    
    beforeAll(async () => {
      const mockData = {
        painting: {
          id: 1,
          title: 'La Nuit étoilée',
          painter: 'Vincent van Gogh',
          painted_at: new Date('1889-06-01'),
          movement_name: 'Post-impressionnisme',
          image_url: '/images/test.jpg',
          short_description: 'Test description',
          dimensions: '73,7 × 92,1 cm',
          museum: 'MoMA',
          museum_url: 'https://moma.org',
          description_structured: {
            introduction: 'Introduction test',
            composition: ['Paragraphe 1', 'Paragraphe 2'],
            technique: ['Paragraphe technique'],
            interpretation: ['Paragraphe interprétation']
          }
        }
      };
      
      const template = fs.readFileSync('./views/painting-detail.ejs', 'utf-8');
      html = ejs.render(template, mockData, { 
        filename: './views/painting-detail.ejs',
        root: './views'
      });
    });
    
    test('doit avoir une navigation breadcrumb avec aria-label', () => {
      const dom = new JSDOM(html);
      const breadcrumb = dom.window.document.querySelector('nav[aria-label*="Ariane"]');
      
      expect(breadcrumb).toBeTruthy();
      expect(breadcrumb.querySelector('[aria-current="page"]')).toBeTruthy();
    });
    
    test('les métadonnées doivent utiliser dl/dt/dd', () => {
      const dom = new JSDOM(html);
      const dl = dom.window.document.querySelector('dl');
      
      expect(dl).toBeTruthy();
      
      const dts = dl.querySelectorAll('dt');
      const dds = dl.querySelectorAll('dd');
      
      expect(dts.length).toBeGreaterThan(0);
      expect(dds.length).toBeGreaterThan(0);
      expect(dts.length).toBe(dds.length);
    });
    
    test('la date doit utiliser la balise time avec datetime', () => {
      const dom = new JSDOM(html);
      const timeElement = dom.window.document.querySelector('time');
      
      expect(timeElement).toBeTruthy();
      expect(timeElement.getAttribute('datetime')).toBeTruthy();
    });
    
    test('les sections doivent avoir des titres h2/h3 pour la navigation', () => {
      const dom = new JSDOM(html);
      const h2Elements = dom.window.document.querySelectorAll('h2, h3, h4');
      
      expect(h2Elements.length).toBeGreaterThan(0);
      
      // Vérifier la hiérarchie
      const allHeadings = Array.from(dom.window.document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      const levels = allHeadings.map(h => parseInt(h.tagName[1]));
      
      // Vérifier qu'on ne saute pas de niveau
      for (let i = 1; i < levels.length; i++) {
        const jump = levels[i] - levels[i-1];
        expect(jump).toBeLessThanOrEqual(1);
      }
    });
    
    test('le bouton de zoom doit avoir un aria-label descriptif', () => {
      const dom = new JSDOM(html);
      const zoomBtn = dom.window.document.querySelector('#zoom-btn');
      
      expect(zoomBtn).toBeTruthy();
      expect(zoomBtn.getAttribute('aria-label')).toContain('Agrandir');
    });
    
    test('la modale doit être accessible au clavier', () => {
      const dom = new JSDOM(html);
      const modal = dom.window.document.querySelector('#zoom-modal');
      const closeBtn = dom.window.document.querySelector('#close-modal-btn');
      
      expect(modal).toBeTruthy();
      expect(closeBtn).toBeTruthy();
      expect(closeBtn.getAttribute('aria-label')).toBeTruthy();
    });
    
    test('ne doit avoir aucune violation d\'accessibilité', async () => {
      const dom = new JSDOM(html);
      const results = await axe(dom.window.document.body);
      
      expect(results).toHaveNoViolations();
    });
  });
  
  // Test 4 : Vérifications globales
  describe('Vérifications globales d\'accessibilité', () => {
    
    test('tous les éléments interactifs doivent être accessibles au clavier', () => {
      // Ce test vérifie que les éléments ont tabindex ou sont naturellement focusables
      const templates = ['paintings.ejs', 'movements.ejs', 'painting-detail.ejs'];
      
      templates.forEach(templateFile => {
        const template = fs.readFileSync(`./views/${templateFile}`, 'utf-8');
        const html = ejs.render(template, getMockDataForTemplate(templateFile), {
          filename: `./views/${templateFile}`,
          root: './views'
        });
        
        const dom = new JSDOM(html);
        const interactiveElements = dom.window.document.querySelectorAll('button, a, input, select, [role="button"]');
        
        interactiveElements.forEach(element => {
          const tagName = element.tagName.toLowerCase();
          const isNaturallyFocusable = ['button', 'a', 'input', 'select'].includes(tagName);
          const hasTabindex = element.hasAttribute('tabindex');
          
          expect(isNaturallyFocusable || hasTabindex).toBe(true);
        });
      });
    });
    
    test('les éléments cachés visuellement doivent avoir la classe sr-only', () => {
      const templates = ['paintings.ejs', 'movements.ejs', 'painting-detail.ejs'];
      
      templates.forEach(templateFile => {
        const template = fs.readFileSync(`./views/${templateFile}`, 'utf-8');
        const html = ejs.render(template, getMockDataForTemplate(templateFile), {
          filename: `./views/${templateFile}`,
          root: './views'
        });
        
        const dom = new JSDOM(html);
        const srOnlyElements = dom.window.document.querySelectorAll('.sr-only');
        
        // Vérifier que chaque élément sr-only a du contenu pertinent
        srOnlyElements.forEach(element => {
          expect(element.textContent.trim().length).toBeGreaterThan(0);
        });
      });
    });
  });
});

// Fonction helper pour les données mock
function getMockDataForTemplate(templateName) {
  const mockData = {
    'paintings.ejs': {
      paintings: [{ id: 1, title: 'Test', painter: 'Test', movement_id: 1, movement_name: 'Test', image_url: '/test.jpg', short_description: 'Test' }],
      movements: [{ id: 1, name: 'Test' }]
    },
    'movements.ejs': {
      movements: [{ id: 1, name: 'Test', description: 'Test' }]
    },
    'painting-detail.ejs': {
      painting: {
        id: 1,
        title: 'Test',
        painter: 'Test',
        painted_at: new Date(),
        movement_name: 'Test',
        image_url: '/test.jpg',
        short_description: 'Test',
        description_structured: { introduction: 'Test', composition: ['Test'], technique: ['Test'], interpretation: ['Test'] }
      }
    }
  };
  
  return mockData[templateName] || {};
}