BEGIN;

-- Insertion du mouvement
INSERT INTO "movement" ("name", "description")
VALUES (
  'Impressionnisme',
  'L''impressionnisme est un mouvement pictural né en France dans les années 1860-1870. 
  Les peintres impressionnistes cherchent à capturer les impressions fugitives, les effets de lumière 
  changeants et l''atmosphère plutôt que les détails précis. Ils utilisent des touches de couleur rapides 
  et visibles, travaillent souvent en plein air, et privilégient les scènes de la vie moderne et de la nature. 
  Les couleurs sont pures et juxtaposées plutôt que mélangées sur la palette.'
),
(
  'Post-impressionnisme',
  'Le Post-impressionnisme, mouvement artistique de la fin du XIXe siècle (à partir des années 1880), 
  émerge en réaction à l''Impressionnisme. Si les artistes post-impressionnistes reconnaissent l''héritage de 
  leurs prédécesseurs (l''utilisation de la couleur pure, le rôle de la lumière et le travail en extérieur), 
  ils cherchent à dépasser la simple capture de l''instant éphémère. Leur objectif est d''insuffler dans leurs 
  œuvres une expression émotionnelle et une vision personnelle du monde, allant au-delà de la fidélité visuelle. 
  Pour ce faire, ils réintroduisent souvent des éléments de structure, de composition ou de symbolisme plus 
  marqués. Visuellement, cela se traduit par une intensification et une exagération des couleurs, utilisées 
  non pas pour reproduire la réalité, mais pour créer un impact émotionnel fort. Le Post-impressionnisme est 
  donc un terme général décrivant ces diverses évolutions artistiques qui se sont développées suite à 
  l''Impressionnisme.'
),
(
  'Pointillisme',
  'Le Pointillisme est une technique picturale strictement scientifique et méthodique développée par 
  Georges Seurat et Paul Signac à partir de 1886. Également appelé Divisionnisme, il pousse la technique 
  impressionniste de la juxtaposition des couleurs à son paroxysme. Au lieu de touches hâtives, le Pointillisme 
  utilise uniquement de petits points ou de petites touches méthodiques de couleurs pures. L''effet de la 
  couleur souhaitée n''est pas obtenu par un mélange sur la palette, mais par le mélange optique de ces points 
  dans l''œil du spectateur à une certaine distance. Les artistes pointillistes s''appuyaient sur les théories 
  scientifiques de l''optique et de la couleur pour créer une luminosité maximale et une vibration contrôlée de 
  la couleur. '
),
(
  'Fauvisme',
  'Le Fauvisme est le premier grand mouvement d''avant-garde du XXe siècle, dont le pic se situe entre 1905 et 
  1907. Le terme, signifiant "bêtes sauvages", fut inventé par le critique Louis Vauxcelles en 1905 lors 
  du Salon d''Automne, choqué par l''audace et la violence des couleurs utilisées par ces peintres. 
  Le Fauvisme se caractérise par l''utilisation de la couleur de manière totalement arbitraire, pure, 
  violente et expressive, affranchie de toute fonction descriptive. La couleur est utilisée comme une 
  force émotionnelle et structurante propre, ne cherchant plus à imiter la nature. Un arbre pouvait être 
  peint en rouge vif, et un visage en vert. Le but n''était plus de représenter la réalité telle qu''on la voit, 
  mais d''exprimer une sensation forte, une énergie brute. Les formes sont simplifiées, les contours souvent 
  marqués.'
);

-- Insertion des tableaux
INSERT INTO "painting" ("title", "short_description", "long_description", "painter", "image_url", "painted_at", "movement_id")
VALUES 
(
  'Impression, soleil levant',
  'Vue du port du Havre au lever du soleil dans une atmosphère brumeuse grise et orangée',
  'Au premier plan, vous pouvez imaginer la surface de l''eau dans des tons majoritairement froids, 
  des bleus-verts, avec deux silhouettes de barques, la plus proche étant plus distincte. La seule source de 
  chaleur visuelle vient du soleil, un disque rouge-orangé, qui se reflète dans le clapot de l''eau avec des 
  traits du même orange. L''arrière-plan est noyé dans une brume bleutée et grise, où se dessinent les formes 
  indistinctes du port industriel : des mâts de grands voiliers, des grues de docks et des cheminées d''usines. 
  Ces formes sont suggérées par des lignes verticales, créant un effet de profondeur. La composition est très 
  horizontale. L''image est divisée en trois parties : le tiers supérieur est le ciel, traité en touches 
  horizontales, et les deux tiers inférieurs sont occupés par le port brumeux et la mer. Tout est très esquissé 
  et flou, suggérant un instant fugitif, avec des silhouettes de bateaux qui se fondent dans l''atmosphère 
  brumeuse. Seul le disque plat du soleil levant se détache nettement par sa couleur chaude sur un fond de tons 
  froids. Fait intéressant : bien qu''il semble très lumineux avec sa couleur orange, le soleil a la même 
  luminosité que le ciel qui l''entoure.',
  'Claude Monet',
  '/images/Claude_Monet,_Impression,_soleil_levant.webp',
  '1872-11-13',
  1
),
(
  'La Promenade ou La Femme à l''ombrelle',
  'Portrait en plein air de Camille Monet et son fils Jean sur une colline ensoleillée et venteuse',
  'Cette scène capture un moment familial en plein air dans une lumière jaune éclatante de fin d''après-midi estival. 
  Au centre de la composition, se dresse la 
  figure élancée de Camille Monet, l''épouse du peintre, vêtue d''une longue robe blanche qui capte de 
  manière éclatante la lumière solaire.
   Elle se protège du soleil à l''aide d''une ombrelle verte, légèrement inclinée. Son visage, tourné vers le spectateur, 
   est cependant maintenu dans l''ombre portée de l''accessoire. À sa gauche, 
   légèrement en retrait, se trouve leur fils Jean, petit garçon portant également des vêtements clairs et un 
   chapeau. La scène est peinte en contre-plongée, comme si le peintre se trouvait en contrebas de la colline, 
   ce qui donne une impression de grandeur et de mouvement ascendant à la composition. Le ciel occupe une large 
   partie de la toile, d''un bleu lumineux parsemé de nuages blancs qui semblent filer rapidement, suggérant 
   une journée venteuse. L''herbe de la colline est rendue par des touches rapides et variées de verts, 
   de jaunes et de touches plus sombres, créant une texture vivante et mouvementée. La robe blanche de Camille 
   capte toutes les nuances de lumière : des blancs éclatants, des reflets bleutés du ciel, des touches de rose 
   et de jaune doré du soleil. Le voile léger attaché à son chapeau flotte au vent, accentuant l''impression 
   de mouvement et de légèreté. L''ensemble dégage une sensation de spontanéité et de fraîcheur, 
   comme un instant suspendu lors d''une promenade estivale.',
  'Claude Monet',
  '/images/Claude_Monet,_La_Femme_a_lombrelle.webp',
  '1875-06-01',
  1
),
(
  'La Nuit étoilée',
  'Peinture d''un village provençal lors d''une nuit étoilée',
  'Un village endormi au creux d''une vallée, sous un ciel qui semble vivant, presque en mouvement. 
  C''est la nuit, mais une nuit extraordinaire, vibrante d''énergie.Le ciel occupe les deux tiers du tableau et 
  c''est là que se déploie toute la magie. Les étoiles ne sont pas de simples points lumineux - elles explosent 
  en spirales brillantes, entourées de halos jaunes et blancs qui pulsent comme des soleils miniatures. Le ciel 
  tout entier est traversé par d''immenses tourbillons bleus et blancs, des volutes qui s''enroulent sur 
  elles-mêmes comme des vagues cosmiques. À droite, un croissant de lune brille intensément, lui aussi 
  nimbé d''une aura lumineuse. Ces mouvements du ciel sont rendus par des coups de pinceau épais, en relief, 
  qu''on pourrait presque suivre du doigt. Au premier plan, à gauche, se dresse un cyprès sombre - un arbre 
  méditerranéen élancé qui s''élève comme une flamme noire vers le ciel. Il est si haut qu''il traverse presque 
  tout le tableau de bas en haut, tel un lien entre la terre et les étoiles. Sa forme ondulante répond aux 
  mouvements du ciel.En bas, le village repose paisiblement : de petites maisons aux toits pointus, un clocher 
  d''église qui s''élève vers le ciel. Tout est calme, baigné dans des tons bleus profonds avec quelques touches 
  de jaune aux fenêtres - des lumières rassurantes qui témoignent de la vie humaine. Derrière le village, des 
  collines douces s''étirent à l''horizon. Le contraste est saisissant : en bas, tout est immobile, silencieux, 
  endormi ; en haut, le ciel est une symphonie de mouvement et de lumière. C''est comme si Van Gogh nous 
  montrait deux mondes - le monde terrestre et tranquille des hommes, et l''univers infini, mystérieux et 
  tourmenté du cosmos. Les couleurs dominantes sont le bleu profond de la nuit et le jaune éclatant des astres, 
  avec des touches de blanc, de vert et de noir. Mais ces couleurs ne sont jamais plates - elles tourbillonnent, 
  se mélangent, créent une impression de profondeur et de mouvement perpétuel.',
  'Vincent van Gogh',
  '/images/Van_Gogh_-_Starry_Night_-_Google_Art_Project.webp',
  '1889-06-01',
  2
),
(
  'La Jeune Fille au crochet',
  'Portrait d''une jeune femme en plein travail de crochet à la lumière d''une fenêtre',
  'Ce tableau représente une jeune fille assise de profil, absorbée par son ouvrage de crochet près d''une 
  fenêtre.La palette de couleurs y est riche. Ses cheveux châtains sont rehaussés d''un grand nœud rouge-orangé 
  vif, une note de couleur pure qui contraste avec l''ensemble. Son visage présente des teintes chaudes 
  (roses, ocres) mêlées à des touches plus froides (vert, mauve), lui donnant un aspect irisé. Elle porte une blouse aux couleurs mélangées : noir profond, vert émeraude/turquoise et des tons clairs (beige, crème) pour le col.
  Le rideau derrière elle est d''un bleu-gris lumineux, presque argenté, créant une ambiance fraîche. À gauche, 
  des tons beiges, ocres et blancs côtoient des touches de bleu. À droite, des bandes verticales de vert olive 
  profond, turquoise et brun structurent l''espace. La lumière est douce, venant de la gauche par une fenêtre, 
  et les ombres ne sont jamais noires mais remplies de couleurs (verts profonds, bruns violacés, bleus sombres). 
  Le tableau est construit autour de lignes obliques qui apportent mouvement et profondeur. Les plis du rideau 
  bleu tombent en diagonale. L''inclinaison de la tête, du dos et du bras de la jeune fille sont dans la même 
  diagonale que celle du rideau. La courbe du bras du fauteuil est croisée. Les bandes verticales colorées à 
  droite créent une structure géométrique. La peinture est vibrante, on sent les coups de pinceau. L''atmosphère 
  est paisible et méditative. Le tableau célèbre le travail féminin, la concentration et la dignité, 
  rehaussée par la touche de gaieté du nœud rouge.',
  'Suzanne Valadon',
  '/images/Jeune_femme_faisant_du_crochet_Suzanne_Valadon_optimized.webp',
  '1892-01-01',
  2
),
(
  'Femmes bretonnes à la prière',
  'Le Pardon ou Les Bretonnes dans la prairie. Femmes bretonnes en costumes traditionnels se reposant dans une prairie',
  'Cette œuvre emblématique du synthétisme présente une composition audacieuse et radicalement 
  novatrice. La surface peinte est ramenée à un plan, sans ligne d''horizon, ni ciel traditionnel, 
  ni perspective. Au premier plan, on découvre un groupe de femmes bretonnes vêtues de costumes 
  traditionnels avec leurs coiffes blanches caractéristiques, assises ou agenouillées dans une 
  prairie d''un vert intense strié de larges bandes jaunes qui traversent la composition comme des 
  chemins lumineux. Les silhouettes sont délimitées par d''épais cernes noirs, inspirés des 
  estampes japonaises et des vitraux médiévaux, qui donnent l''impression que les figures sont 
  plaquées à même la toile. À l''arrière-plan, se dressent des cyprès élancés d''un jaune doré 
  éclatant, qui contrastent vivement avec les tons bleu-vert profonds des arbres et buissons 
  environnants. Le fond sur lequel se superposent les figures en aplat produit un effet 
  de dépouillement accentué. Dominant toute la composition, une vaste colline ondulante occupe 
  la moitié supérieure du tableau dans des tonalités rouge-orangé vibrantes, allant du rose au 
  rouge brique, créant une atmosphère presque irréelle. Les couleurs sont pures, posées en larges 
  aplats sans dégradés ni nuances, selon les principes du synthétisme développé par Bernard aux 
  côtés de Gauguin en 1888. L''ensemble dégage une puissance chromatique exceptionnelle où le vert 
  acide de la prairie dialogue avec l''orange flamboyant de la colline et le jaune doré des cyprès, 
  créant une harmonie visuelle à la fois audacieuse et contemplative.',
  'Emile Bernard',
  '/images/Emile_Bernard_-_Les_femmes_bretonnes_a_la_prière.webp',
  '1892-01-01',
  2
),
(
  'Cheval attaqué par un jaguar',
  'Cheval attaqué par un jaguar d''Henri Rousseau - Un cheval blanc se cabre dans une jungle luxuriante tandis qu''un jaguar tacheté bondit sur son dos',
  'Cette huile sur toile naïve représente un cheval blanc assailli par un jaguar, dans une jungle dont la 
  végétation envahissante semble participer à l''agression.Au centre de la composition, un cheval blanc se 
  cabre avec élégance, la crinière ondulante, dans une posture presque dansante malgré le danger. 
  Sur son dos, un jaguar aux taches fauves et noires s''agrippe fermement, créant une scène dramatique qui 
  évoque davantage une étreinte que le combat mortel annoncé. La jungle qui entoure cette scène est d''une 
  exubérance extraordinaire : des feuillages démesurés aux formes géométriques précises se superposent dans 
  tous les sens, créant un mur végétal impénétrable. Les feuilles de palmier géantes, peintes dans une gamme 
  infinie de verts allant du vert tendre au vert sombre presque noir, dominent la composition avec leurs 
  nervures soigneusement dessinées. Des touches de couleur ponctuent cette mer végétale : des fleurs rouges 
  écarlates à gauche, des fleurs blanches au centre, et une grande fleur orange éclatante à droite, apportant 
  des éclats lumineux dans cette symphonie de verts. Le ciel, à peine visible en haut de la toile, est d''un 
  bleu-gris doux et uniforme, créant un contraste avec la densité de la végétation. Rousseau s''est inspiré 
  des jardins botaniques et du musée zoologique de Paris, où il a esquissé de magnifiques plantes et des 
  animaux empaillés, ce qui explique le caractère à la fois précis et imaginaire de cette jungle fantasmée, 
  caractéristique de l''art naïf du Douanier Rousseau.',
  'Henri Rousseau',
  '/images/Henri_Rousseau_Cheval_attaque_par_un_jaguar.webp',
  '1910-01-01',
  4
);

COMMIT;